export type PreloadImageConfig = {
    sizes?: string;
    src: string;
    srcset?: string;
};
type Mode = 'concurrent' | 'sequential' | 'batch';
type OnImageLoad = (src: string) => void;
export type PreloadImagesConfig = {
    batchSize?: number;
    images: PreloadImageConfig[];
    mode: Mode;
    onImageLoad?: OnImageLoad;
};
export declare function preloadImage(config: PreloadImageConfig): Promise<void>;
export declare function preloadImages(config: PreloadImagesConfig): Promise<void>;
export {};
