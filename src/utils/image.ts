export interface ResponsiveImage {
  src: string;
  srcSet: string;
}

/**
 * Builds responsive image URL and srcSet for CF R2 photos_webpg path.
 * Properly encodes the filename parameter.
 */
export function getResponsiveImage(folder: string, filename: string): ResponsiveImage {
  const encodedFilename = encodeURIComponent(filename);
  const base = `https://media.qasim.live/photos_webpg/${folder ? folder + '/' : ''}${encodedFilename}`;
  return {
    src: `${base}-960w.webp`,
    srcSet: `${base}-480w.webp 480w, ${base}-960w.webp 960w, ${base}-1600w.webp 1600w`,
  };
}
