import React, { useEffect, useState } from 'react';

export interface IImageCropperProps {
  /** x坐标 */
  x?: number;
  /** y坐标 */
  y?: number;
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /** 图片地址 */
  src: string;
  /** ref参数 */
  pRef?: React.RefObject<HTMLDivElement>;
}

const ImageCropper = (props: IImageCropperProps) => {
  const { x = 0, y = 0, width = 0, height = 0, src = '', pRef, ...ect } = props;
  const [croppedImageSrc, setCroppedImageSrc] = useState('');
  const [image, setImage] = useState<HTMLElement>();
  const [scale, setScale] = useState(0);

  useEffect(() => {
    if (pRef?.current) {
      const { offsetHeight, offsetWidth } = pRef?.current || {};
      if (height || width)
        if (height > width) {
          if (offsetWidth > offsetHeight) setScale(offsetHeight / height);
          else setScale(offsetWidth / height);
        } else if (height <= width) {
          if (offsetHeight > offsetWidth) setScale(offsetWidth / width);
          else setScale(offsetHeight / width);
        }
    }
    const img = new Image();
    img.src = src;
    img.onload = function () {
      setImage(img);
    };
  }, [height, pRef, src, width]);

  useEffect(() => {
    if (image) {
      image.removeAttribute('style');
      setCroppedImageSrc(`${src}`);
      if (width && height) {
        image.style.display = 'none';
        image.style.objectFit = 'none';
        image.style.objectPosition = `-${x}px -${y}px`;
        image.style.width = `${width}px`;
        image.style.height = `${height}px`;
        if (pRef?.current) {
          pRef.current.style.position = 'relative';
          image.style.position = 'absolute';
          if (width > height) {
            image.style.top = '50%';
            image.style.transform = `translateY(-${(height / 2) * scale}px)  scale(${scale})`;
          } else {
            image.style.left = '50%';
            image.style.transform = `translateX(-${(width / 2) * scale}px)  scale(${scale})`;
          }
        }
        image.style.display = `block`;
      } else {
        image.style.objectFit = 'contain';
        image.style.objectPosition = '';
        image.style.width = '100%';
        image.style.height = '100%';
      }
      image.style.transformOrigin = 'top left';
      image.style.margin = '0 auto';
    }
  }, [image, src, x, y, width, height, pRef, scale]);

  return <img src={croppedImageSrc} {...ect} alt="" ref={(ref) => (ref ? setImage(ref) : null)} />;
};

export default ImageCropper;
