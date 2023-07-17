import { useEffect, useState } from 'react';
import { 
  preloadImages,
  PreloadImagesConfig,
} from './preload-images';

export function usePreloadImages({ onImageLoad, ...config }: PreloadImagesConfig) {
  const [imagesLoaded, setImagesLoaded] = useState<string[]>([]);
  const [complete, setComplete] = useState<boolean>(false);

  useEffect(() => {
    async function preload() {
      setComplete(false);
      await preloadImages({
        ...config,
        onImageLoad: (src) => {
          setImagesLoaded(srcs => [
            ...srcs.filter(f => f !== src),
            src,
          ]);
          onImageLoad?.(src);
        },
      });
      setComplete(true);
    }

    preload();
  }, [config.images]);

  return {
    imagesLoaded,
    complete,
  };
}