export type PreloadImageConfig = {
  alt: string;
  sizes?: string;
  src: string;
  srcset?: string;
}

export type Mode = 'concurrent' | 'sequential';

export type PreloadImagesConfig = {
  images: PreloadImageConfig[];
  loaded?: (src: string) => void;
  mode: Mode;
};

export async function preloadImage(
  config: PreloadImageConfig,
) {
  const image = new Image();
  Object.assign(image, config);

  try {
    await image.decode();
  } catch (err) {
    console.error('Image preload error:', err)
  }
}

export async function preloadImages(
  config: PreloadImagesConfig,
) {
  const { images, mode, loaded } = config;

  if (mode === 'concurrent') {
    await Promise.all(
      images.map(async image => { 
        await preloadImage(image);
        loaded?.(image.src);
      })
    );
  }
  if (mode === 'sequential') {
    for (const image of images) {
      await preloadImage(image);
      loaded?.(image.src);
    }
  }
}
