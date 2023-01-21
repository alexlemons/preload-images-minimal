import { preloadImage, preloadImages } from "../utils";

describe('utils', () => {
  let srcSpy: jest.SpyInstance;
  let mockDecode: jest.Mock<Promise<void>>;
  let mockDecodeStartTime: number[] = [];
  let mockOnImageLoad: jest.Mock;
  let onImageLoadTime: number[] = [];

  beforeAll(() => {
    srcSpy = jest.spyOn(global.Image.prototype, 'src', 'set');
    mockDecode = jest.fn(async () => {
      mockDecodeStartTime.push(performance.now());
      return new Promise(resolve => setTimeout(resolve, 100));
    });
    Object.defineProperty(global.Image.prototype, 'decode', {
      configurable: true,
      value: mockDecode,
    })
    mockOnImageLoad = jest.fn();
  });

  afterEach(() => {    
    jest.clearAllMocks();
    mockDecodeStartTime = [];
    onImageLoadTime = [];
  });

  describe('preloadImage', () => {
    it('should load image', async () => {
      const image = { src: 'imgA' };
      await preloadImage(image);
      expect(srcSpy).toHaveBeenCalledWith(image.src);
      expect(mockDecode).toHaveBeenCalled();
    });
  });
  
  describe('preloadImages', () => {
    describe('concurrent mode', () => {
      it('should load images', async () => {
        const images = [
          { src: 'imgA' },
          { src: 'imgB' },
        ];
        await preloadImages({ images, mode: 'concurrent' });
        expect(srcSpy).toHaveBeenNthCalledWith(1, images[0].src);
        expect(srcSpy).toHaveBeenNthCalledWith(2, images[1].src);
        expect(mockDecode).toHaveBeenCalledTimes(2);
      });

      it('should call onImageLoad', async () => {
        const images = [{ src: 'imgA' }];
        await preloadImages({
          images,
          mode: 'concurrent',
          onImageLoad: mockOnImageLoad,
        });
        expect(mockOnImageLoad).toHaveBeenCalledWith(images[0].src);
      });

      it('should load concurrently', async () => {
        const images = [
          { src: 'imgA' },
          { src: 'imgB' },
        ];
        await preloadImages({
          images,
          mode: 'concurrent',
          onImageLoad: () => onImageLoadTime.push(performance.now()),
        });
        expect(mockDecodeStartTime[1]).toBeLessThan(onImageLoadTime[0]);
      });
    });

    describe('sequential mode', () => {
      it('should load images', async () => {
        const images = [
          { src: 'imgA' },
          { src: 'imgB' },
        ];
        await preloadImages({ images, mode: 'sequential' });
        expect(srcSpy).toHaveBeenNthCalledWith(1, images[0].src);
        expect(srcSpy).toHaveBeenNthCalledWith(2, images[1].src);
        expect(mockDecode).toHaveBeenCalledTimes(2);
      });

      it('should call onImageLoad', async () => {
        const images = [{ src: 'imgA' }];
        await preloadImages({
          images,
          mode: 'sequential',
          onImageLoad: mockOnImageLoad,
        });
        expect(mockOnImageLoad).toHaveBeenCalledWith(images[0].src);
      });

      it('should load sequentially', async () => {
        const images = [
          { src: 'imgA' },
          { src: 'imgB' },
        ];
        await preloadImages({
          images,
          mode: 'sequential',
          onImageLoad: () => onImageLoadTime.push(performance.now()),
        });
        expect(mockDecodeStartTime[1]).toBeGreaterThan(onImageLoadTime[0]);
      });
    });

    describe('batch mode', () => {
      it('should load images', async () => {
        const images = [
          { src: 'imgA' },
          { src: 'imgB' },
          { src: 'imgC' },
          { src: 'imgD' },
        ];
        await preloadImages({ batchSize: 2, images, mode: 'batch' });
        expect(srcSpy).toHaveBeenNthCalledWith(1, images[0].src);
        expect(srcSpy).toHaveBeenNthCalledWith(3, images[2].src);
        expect(mockDecode).toHaveBeenCalledTimes(4);
      });

      it('should call onImageLoad', async () => {
        const images = [
          { src: 'imgA' },
          { src: 'imgB' },
          { src: 'imgC' },
          { src: 'imgD' },
        ];
        await preloadImages({
          batchSize: 2,
          images,
          mode: 'batch',
          onImageLoad: mockOnImageLoad,
        });
        expect(mockOnImageLoad).toHaveBeenNthCalledWith(1, images[0].src);
        expect(mockOnImageLoad).toHaveBeenNthCalledWith(3, images[2].src);
      });

      it('should load in batches', async () => {
        const images = [
          { src: 'imgA' },
          { src: 'imgB' },
          { src: 'imgC' },
          { src: 'imgD' },
        ];
        await preloadImages({
          batchSize: 2,
          images,
          mode: 'batch',
          onImageLoad: () => onImageLoadTime.push(performance.now()),
        });
        expect(mockDecodeStartTime[1]).toBeLessThan(onImageLoadTime[0]);
        expect(mockDecodeStartTime[2]).toBeGreaterThan(onImageLoadTime[1]);
      });
    });
  });
});