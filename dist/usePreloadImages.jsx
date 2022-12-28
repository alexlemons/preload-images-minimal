import { useEffect, useState } from 'react';
import { preloadImages, } from './utils';
export function usePreloadImages(config) {
    const { images, mode } = config;
    const [imagesLoaded, setImagesLoaded] = useState([]);
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);
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
