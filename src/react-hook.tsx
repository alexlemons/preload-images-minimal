import { useState } from 'react';
import { 
  PreloadImageConfig,
  Mode, 
  preloadImages,
} from './utils';

export function usePreloadImages(
  images: PreloadImageConfig[],
  mode: Mode,
) {
  const [haveLoaded, setHaveLoaded] = useState<string[]>([]);
  const [allLoaded, setAllLoaded] = useState<boolean>(false);

  const preload = async () => {
    await preloadImages({
      images, 
      mode,
      haveLoaded: setHaveLoaded,
    });
    setAllLoaded(true);
  }

  return {
    preload,
    haveLoaded,
    allLoaded,
  };
}