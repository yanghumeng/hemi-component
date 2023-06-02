import React, { useEffect, useState } from 'react';

const ImageCropper = ({ x = 0, y = 0, width = 100, height = 100, src = '', ...ect }) => {
  const [croppedImageSrc, setCroppedImageSrc] = useState('');
  const [styleT, setStyleT] = useState({});
  const [image, setImage] = useState<HTMLElement>();

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = function () {
      setImage(img);
    };
  }, [src]);

  useEffect(() => {
    if (image) {
      setCroppedImageSrc(`${src}`);
      if (x && y && width && height) {
        image.style.objectFit = 'none';
        image.style.objectPosition = `-${x}px -${y}px`;
        image.style.width = `${width}px`;
        image.style.height = `${height}px`;
      }
    }
    if (width > height) {
      setStyleT({ width: '100%' });
    } else if (width < height) {
      setStyleT({ height: '100%' });
    } else {
      setStyleT({ height: '100%', width: '100%' });
    }
  }, [image, src, x, y, width, height]);

  return (
    <img
      src={croppedImageSrc}
      style={styleT}
      {...ect}
      alt=""
      ref={(ref) => (ref ? setImage(ref) : null)}
    />
  );
};

export default ImageCropper;
