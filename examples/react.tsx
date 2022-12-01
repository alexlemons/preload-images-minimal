import React, { useEffect } from 'react';
import { usePreloadImages } from 'preload-images-minimal';

const images = [
  {
    alt: 'img A',
    src: 'https://imgA.jpg',
  },
  {
    alt: 'img B',
    src: 'https://imgB.jpg',
  },
];

const Example: React.FC = () => {
  const { preload, haveLoaded, allLoaded } = usePreloadImages(images, 'sequential');

  useEffect(() => {
    preload();
  }, []);

  const containerStyle = {
    opacity: allLoaded ? 1.0 : 0.0,
  };

  return (
    <div style={containerStyle}>
      {images.map(image => (
        <div key={image.src}>
          {haveLoaded.includes(image.src) && (
            <img
              {...image}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Example;
