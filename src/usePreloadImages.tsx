import { useEffect, useState } from 'react';
import { 
  preloadImages,
  PreloadImagesConfig,
} from './utils';

export function usePreloadImages(config: PreloadImagesConfig) {
  const { images, mode } = config;
  const [imagesLoaded, setImagesLoaded] = useState<string[]>([]);
  const [allImagesLoaded, setAllImagesLoaded] = useState<boolean>(false);

  useEffect(() => {
    async function preload() {
      setAllImagesLoaded(false);
      await preloadImages({
        images, 
        mode,
        onImageLoad: src => setImagesLoaded(srcs => [...srcs, src]),
      });
      setAllImagesLoaded(true);
    }
    preload();
  }, [images]);

  return {
    imagesLoaded,
    allImagesLoaded,
  };
}