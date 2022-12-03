export async function preloadImage(config) {
    const image = new Image();
    Object.assign(image, config);
    try {
        await image.decode();
    }
    catch (err) {
        console.error('Image preload error:', err);
    }
}
export async function preloadImages(config) {
    const { images, mode, onImageLoad } = config;
    if (mode === 'concurrent') {
        await Promise.all(images.map(async (image) => {
            await preloadImage(image);
            onImageLoad?.(image.src);
        }));
    }
    if (mode === 'sequential') {
        for (const image of images) {
            await preloadImage(image);
            onImageLoad?.(image.src);
        }
    }
}
