import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cssUrl = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600;700&display=swap";

// Use a modern browser user agent to ensure we get optimized woff2 formats from Google Fonts API
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const outputDir = path.join(__dirname, '../public/fonts');

async function downloadFile(url, destPath) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
}

async function run() {
  console.log("Creating fonts directory if it doesn't exist...");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Fetching CSS from Google Fonts...`);
  const response = await fetch(cssUrl, {
    headers: {
      'User-Agent': USER_AGENT
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Google Fonts CSS: ${response.statusText}`);
  }

  const cssText = await response.text();
  console.log("Fetched CSS successfully.");

  // Parse font-face declarations
  // Each font-face declaration looks something like:
  /* latin */
  // @font-face {
  //   font-family: 'Cormorant Garamond';
  //   font-style: italic;
  //   font-weight: 300;
  //   font-display: swap;
  //   src: url(https://fonts.gstatic.com/s/cormorantgaramond/v16/coM8qyUdIwgG_Bv-Uf31Q33V-bS_R8U.woff2) format('woff2');
  //   unicode-range: U+0000-00FF, ...;
  // }
  
  // We want to find the latin font-faces specifically, or parse all of them.
  // Let's split by '@font-face' and process.
  const blocks = cssText.split('@font-face');
  const fontFaces = [];

  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i];
    
    // Determine the subset (e.g. /* latin */ above the block)
    const prevText = blocks[i-1];
    const subsetMatch = prevText.match(/\/\*\s*([a-z0-9-]+)\s*\*\/\s*$/i);
    const subset = subsetMatch ? subsetMatch[1] : 'unknown';

    // We only need 'latin' subset for our project to avoid downloading hundreds of files for cyrillic, greek, vietnamese, etc.
    if (subset !== 'latin') {
      continue;
    }

    const familyMatch = block.match(/font-family:\s*['"]?([^'"]+)['"]?;/);
    const styleMatch = block.match(/font-style:\s*([^;]+);/);
    const weightMatch = block.match(/font-weight:\s*([^;]+);/);
    const urlMatch = block.match(/src:\s*url\(([^)]+)\)\s*format\(['"]woff2['"]\)/);

    if (familyMatch && styleMatch && weightMatch && urlMatch) {
      const family = familyMatch[1].trim();
      const style = styleMatch[1].trim();
      const weight = weightMatch[1].trim();
      const url = urlMatch[1].trim();

      fontFaces.push({ family, style, weight, url });
    }
  }

  console.log(`Found ${fontFaces.length} latin font-face blocks. Downloading...`);

  const localFontDeclarations = [];

  for (const fontFace of fontFaces) {
    const { family, style, weight, url } = fontFace;
    const sanitizedFamily = family.toLowerCase().replace(/\s+/g, '-');
    const filename = `${sanitizedFamily}-${style}-${weight}.woff2`;
    const destPath = path.join(outputDir, filename);

    console.log(`Downloading ${family} (${style}, ${weight}) -> ${filename}...`);
    try {
      await downloadFile(url, destPath);
      console.log(`  Saved.`);
      
      localFontDeclarations.push({
        family,
        style,
        weight,
        filename
      });
    } catch (err) {
      console.error(`  Error downloading ${filename}:`, err);
    }
  }

  console.log("\nDownload complete!");
  console.log("\nHere are the @font-face rules you should add to src/index.css:\n");

  const cssRules = localFontDeclarations.map(font => {
    return `@font-face {
  font-family: '${font.family}';
  font-style: ${font.style};
  font-weight: ${font.weight};
  font-display: swap;
  src: url('/fonts/${font.filename}') format('woff2');
}`;
  }).join('\n\n');

  console.log(cssRules);

  // Let's write these to a file so they're easy to copy or read later
  fs.writeFileSync(path.join(__dirname, '../public/fonts/font-faces.css'), cssRules);
}

run().catch(err => {
  console.error("An error occurred during font download:", err);
});
