import { useEffect, useState } from 'react';
import { preloadImages, } from './utils';
export function usePreloadImages(config) {
    const [imagesLoaded, setImagesLoaded] = useState([]);
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);
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
