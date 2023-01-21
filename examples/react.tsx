import React, { FC } from 'react';
import { usePreloadImages } from 'preload-images-minimal';

const images = [{ src: 'srcA' }, { src: 'srcB' }];
const preloadConfig = { images, mode: 'sequential' };

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
