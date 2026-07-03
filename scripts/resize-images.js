import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = process.argv[2] || './input';
const outputDir = process.argv[3] || './output';

// Supported image extensions
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.gif'];

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function resizeImages() {
  if (!fs.existsSync(inputDir)) {
    console.error(`Error: Input directory "${inputDir}" does not exist.`);
    console.log(`Please create it and place your images inside, or pass paths: node scripts/resize-images.js [input_dir] [output_dir]`);
    process.exit(1);
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return SUPPORTED_EXTENSIONS.includes(ext);
  });

  if (files.length === 0) {
    console.log(`No supported images found in "${inputDir}".`);
    console.log(`Supported extensions: ${SUPPORTED_EXTENSIONS.join(', ')}`);
    return;
  }

  console.log(`Found ${files.length} images in "${inputDir}". Starting processing...\n`);

  let totalOriginalSize = 0;
  let totalResizedSize = 0;
  const widths = [480, 960, 1600];

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const stats = fs.statSync(inputPath);
    totalOriginalSize += stats.size;

    const extname = path.extname(file);
    const basename = path.basename(file, extname);

    console.log(`Processing ${file} (${formatBytes(stats.size)}):`);

    for (const width of widths) {
      const outputFilename = `${basename}-${width}w.webp`;
      const outputPath = path.join(outputDir, outputFilename);

      try {
        await sharp(inputPath)
          .resize({ width, fit: 'inside', withoutEnlargement: false })
          .webp({ quality: 80 })
          .toFile(outputPath);

        const outStats = fs.statSync(outputPath);
        totalResizedSize += outStats.size;
        console.log(`  -> Generated ${outputFilename} (${formatBytes(outStats.size)})`);
      } catch (err) {
        console.error(`  Error generating ${width}w version for ${file}:`, err.message);
      }
    }
    console.log('');
  }

  console.log(`=========================================`);
  console.log(`Processing complete!`);
  console.log(`Original total size: ${formatBytes(totalOriginalSize)}`);
  console.log(`Resized total size:  ${formatBytes(totalResizedSize)}`);
  console.log(`=========================================`);
}

resizeImages().catch(err => {
  console.error("An unexpected error occurred:", err);
});
