import { PreloadImageConfig, Mode } from './utils';
export declare function usePreloadImages(images: PreloadImageConfig[], mode: Mode): {
    preload: () => Promise<void>;
    haveLoaded: string[];
    allLoaded: boolean;
};
