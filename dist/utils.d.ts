export type PreloadImageConfig = {
    alt: string;
    sizes?: string;
    src: string;
    srcset?: string;
};
export type Mode = 'concurrent' | 'sequential';
export type PreloadImagesConfig = {
    images: PreloadImageConfig[];
    haveLoaded?: (srcs: string[]) => void;
    mode: Mode;
};
export declare function preloadImage(config: PreloadImageConfig): Promise<void>;
export declare function preloadImages(config: PreloadImagesConfig): Promise<void>;
