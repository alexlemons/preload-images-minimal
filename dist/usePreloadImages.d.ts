import { PreloadImagesConfig } from './preload-images';
export declare function usePreloadImages({ onImageLoad, ...config }: PreloadImagesConfig): {
    imagesLoaded: string[];
    complete: boolean;
};
