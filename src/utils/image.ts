export interface ResponsiveImage {
  src: string;
  srcSet: string;
}

/**
 * Builds responsive image URL and srcSet for CF R2 photos_webpg path.
 * Properly encodes the filename parameter.
 * @param missing480w - Set to true if the image doesn't have a -480w.webp variant (e.g., thumb08)
 */
export function getResponsiveImage(folder: string, filename: string, missing480w = false): ResponsiveImage {
  const encodedFilename = encodeURIComponent(filename);
  const base = `https://media.qasim.live/photos_webpg/${folder ? folder + '/' : ''}${encodedFilename}`;
  
  if (missing480w) {
    return {
      src: `${base}-960w.webp`,
      srcSet: `${base}-960w.webp 960w, ${base}-1600w.webp 1600w`,
    };
  }
  
  return {
    src: `${base}-960w.webp`,
    srcSet: `${base}-480w.webp 480w, ${base}-960w.webp 960w, ${base}-1600w.webp 1600w`,
  };
}
