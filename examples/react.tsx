import React, { FC } from 'react';
import {
  usePreloadImages,
  PreloadImagesConfig
} from 'preload-images-minimal';

const images = [
  { alt: 'altA', src: 'srcA' },
  { alt: 'altB', src: 'srcB' },
];

const preloadConfig: PreloadImagesConfig = {
  images: images.map(({ src }) => ({ src })),
  mode: 'sequential',
};

const Example: FC = () => {
  const { imagesLoaded, allImagesLoaded } = usePreloadImages(preloadConfig);

  const containerStyle = {
    opacity: allImagesLoaded ? 1.0 : 0.0,
  };

  return (
    <div style={containerStyle}>
      {images.map(image => (
        <div key={image.src}>
          {imagesLoaded.includes(image.src) && (
            <img {...image} />
          )}
        </div>
      ))}
    </div>
  );
}

export default Example;
