export type PreloadImageConfig = {
  alt: string;
  sizes?: string;
  src: string;
  srcset?: string;
}

export type Mode = 'concurrent' | 'sequential';

export type PreloadImagesConfig = {
  images: PreloadImageConfig[];
  haveLoaded?: (srcs: string[]) => void;
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
  const { images, mode, haveLoaded } = config;
  let _haveLoaded: string[] = [];

  if (mode === 'concurrent') {
    await Promise.all(
      images.map(async image => { 
        await preloadImage(image);
        _haveLoaded = [..._haveLoaded, image.src];
        haveLoaded?.(_haveLoaded);
      })
    );
  }
  if (mode === 'sequential') {
    for (const image of images) {
      await preloadImage(image);
      _haveLoaded = [..._haveLoaded, image.src];
      haveLoaded?.(_haveLoaded);
    }
  }
}
