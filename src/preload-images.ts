export type PreloadImageConfig = {
  sizes?: string;
  src: string;
  srcset?: string;
}

type Mode = 'concurrent' | 'sequential' | 'batch';

type OnImageLoad = (src: string) => void;

export type PreloadImagesConfig = {
  batchSize?: number;
  images: PreloadImageConfig[];
  mode: Mode;
  onImageLoad?: OnImageLoad;
};

export async function preloadImage(
  config: PreloadImageConfig,
) {
  try {
    const image = new Image();
    Object.assign(image, config);
    await image.decode();
  } catch (err) {
    console.error('Image preload error:', err)
  }
}

async function concurrentPreload(
  images: PreloadImageConfig[],
  onImageLoad?: OnImageLoad,
) {
  await Promise.all(
    images.map(async image => {
      await preloadImage(image);
      onImageLoad?.(image.src);
    })
  );
}

async function sequentialPreload(
  images: PreloadImageConfig[],
  onImageLoad?: OnImageLoad,
) {
  for (const image of images) {
    await preloadImage(image);
    onImageLoad?.(image.src);
  }
}

async function batchPreload(
  images: PreloadImageConfig[],
  onImageLoad?: OnImageLoad,
  batchSize = 5,
) {
  const batches = [];

  for (let i = 0; i < images.length; i+= batchSize) {
    batches.push(images.slice(i, i + batchSize));
  }

  for (const batch of batches) {
    await concurrentPreload(batch, onImageLoad);
  }
}

export async function preloadImages(
  config: PreloadImagesConfig,
) {
  const {
    batchSize,
    images,
    mode,
    onImageLoad,
  } = config;

  if (mode === 'concurrent') {
    return concurrentPreload(images, onImageLoad);
  }
  if (mode === 'sequential') {
    return sequentialPreload(images, onImageLoad);
  }
  if (mode === 'batch') {
    return batchPreload(images, onImageLoad, batchSize);
  }
}
