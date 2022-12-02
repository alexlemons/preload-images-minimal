import { useState } from 'react';
import { preloadImages, } from './utils';
export function usePreloadImages(images, mode) {
    const [haveLoaded, setHaveLoaded] = useState([]);
    const [allLoaded, setAllLoaded] = useState(false);
    const preload = async () => {
        await preloadImages({
            images,
            mode,
            haveLoaded: setHaveLoaded,
        });
        setAllLoaded(true);
    };
    return {
        preload,
        haveLoaded,
        allLoaded,
    };
}
