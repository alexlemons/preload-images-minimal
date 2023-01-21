import { useEffect, useState } from 'react';
import { 
  preloadImages,
  PreloadImagesConfig,
} from './utils';

export function usePreloadImages(config: PreloadImagesConfig) {
  const [imagesLoaded, setImagesLoaded] = useState<string[]>([]);
  const [allImagesLoaded, setAllImagesLoaded] = useState<boolean>(false);

  useEffect(() => {
    async function preload() {
      setAllImagesLoaded(false);
      await preloadImages({
        ...config,
        onImageLoad: (src) => {
          setImagesLoaded(srcs => [
            ...srcs.filter(f => f !== src),
            src,
          ]);
          config.onImageLoad?.(src);
        },
      });
      setAllImagesLoaded(true);
    }
    preload();
  }, [config.images]);

  return {
    imagesLoaded,
    allImagesLoaded,
  };
}