import React, { useEffect, useState } from 'react';

export interface IImageCropperProps {
  /** x坐标 */
  x: number;
  /** y坐标 */
  y: number;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 图片地址 */
  src: string;
  /** ref参数 */
  pRef?: React.RefObject<HTMLDivElement>;
}

const ImageCropper = (props: IImageCropperProps) => {
  const { x = 0, y = 0, width = 100, height = 100, src = '', pRef, ...ect } = props;
  const [croppedImageSrc, setCroppedImageSrc] = useState('');
  const [styleT, setStyleT] = useState({});
  const [image, setImage] = useState<HTMLElement>();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (pRef?.current) {
      const { offsetHeight, offsetWidth } = (pRef?.current || {}) as HTMLDivElement;
      if (height > width && height > offsetHeight) {
        setScale(offsetHeight / height);
      } else if (height < width && width > offsetWidth) {
        setScale(offsetWidth / width);
      } else {
        console.log(offsetWidth / width);
        setScale(offsetWidth / width);
      }
    }
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
      } else {
        setStyleT({ height: '100%', width: '100%' });
      }
    }
  }, [image, src, x, y, width, height]);

  return (
    <img
      src={croppedImageSrc}
      style={{ ...styleT, transform: `scale(${scale})` }}
      {...ect}
      alt=""
      ref={(ref) => (ref ? setImage(ref) : null)}
    />
  );
};

export default ImageCropper;
