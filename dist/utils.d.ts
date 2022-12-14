export type PreloadImageConfig = {
    sizes?: string;
    src: string;
    srcset?: string;
};
export type Mode = 'concurrent' | 'sequential';
export type PreloadImagesConfig = {
    images: PreloadImageConfig[];
    mode: Mode;
    onImageLoad?: (src: string) => void;
};
export declare function preloadImage(config: PreloadImageConfig): Promise<void>;
export declare function preloadImages(config: PreloadImagesConfig): Promise<void>;
