import manifest from "./image-manifest.json";

export type ImageMeta = {
  src: string;
  width: number;
  height: number;
  alt: string;
  section: string;
  blurDataURL: string;
};

export const images = manifest as Record<string, ImageMeta>;

/** Look up a processed image by its key (throws in dev if missing). */
export function img(name: keyof typeof manifest | string): ImageMeta {
  const meta = images[name as string];
  if (!meta) {
    throw new Error(`No processed image named "${name}" in image-manifest.json`);
  }
  return meta;
}
