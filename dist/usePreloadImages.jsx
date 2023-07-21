import { useEffect, useState } from 'react';
import { preloadImages, } from './preload-images';
export function usePreloadImages({ onImageLoad, ...config }) {
    const [imagesLoaded, setImagesLoaded] = useState([]);
    const [complete, setComplete] = useState(false);
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
