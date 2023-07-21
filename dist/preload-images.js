export async function preloadImage(config) {
    try {
        const image = new Image();
        Object.assign(image, config);
        await image.decode();
    }
    catch (err) {
        console.error('Image preload error:', err);
    }
}
async function concurrentPreload(images, onImageLoad) {
    await Promise.all(images.map(async (image) => {
        await preloadImage(image);
        onImageLoad?.(image.src);
    }));
}
async function sequentialPreload(images, onImageLoad) {
    for (const image of images) {
        await preloadImage(image);
        onImageLoad?.(image.src);
    }
}
async function batchPreload(images, onImageLoad, batchSize = 5) {
    const batches = [];
    for (let i = 0; i < images.length; i += batchSize) {
        batches.push(images.slice(i, i + batchSize));
    }
    for (const batch of batches) {
        await concurrentPreload(batch, onImageLoad);
    }
}
export async function preloadImages(config) {
    const { batchSize, images, mode, onImageLoad, } = config;
    if (mode === 'concurrent') {
        return concurrentPreload(images, onImageLoad);
    }
    if (mode === 'sequential') {
        return sequentialPreload(images, onImageLoad);
    }
    if (mode === 'batch') {
        return batchPreload(images, onImageLoad, batchSize);
    }
}
