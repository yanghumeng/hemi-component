import React, { useState, useEffect, useRef } from 'react';

interface ImageCropperProps {
  /** x坐标 */
  x?: number;
  /** y坐标 */
  y?: number;
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /** 图片地址 */
  imageUrl: string;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  imageUrl = '',
}) => {
  const [croppedImage, setCroppedImage] = useState<string>('');
  const pRef = useRef<HTMLElement>(null);
  const [scale, setScale] = useState(1);
  const [sWidth, setSWidth] = useState(width);
  const [sHeight, setSHeight] = useState(height);

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl;
    image.setAttribute('crossOrigin', 'Anonymous');
    image.onload = () => {
      const imgWidth = image.width;
      const imgHeight = image.height;
      if (pRef?.current) {
        const parentElement = pRef?.current?.parentNode || {};
        const parentHeight =
          parentElement instanceof HTMLElement
            ? parentElement.getBoundingClientRect().height
            : height;
        const parentWidth =
          parentElement instanceof HTMLElement
            ? parentElement.getBoundingClientRect().width
            : width;
        if (!height && !width) {
          height = imgHeight;
          width = imgWidth;
        }

        const init = height > width ? parentHeight / height : parentWidth / width;
        if (height > width) {
          init * width > parentWidth
            ? setScale((parentWidth / (init * width)) * init)
            : setScale(init);
        } else if (height <= width) {
          init * height > parentHeight
            ? setScale((parentHeight / (init * height)) * init)
            : setScale(init);
        }
      }
      setSWidth(width);
      setSHeight(height);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (ctx) {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image, x, y, width, height, 0, 0, width, height);
        setCroppedImage(canvas.toDataURL());
      }
    };
  }, [x, y, width, height, imageUrl]);

  return (
    <div ref={pRef} style={{ width: sWidth * scale, height: sHeight * scale }}>
      <img
        src={croppedImage}
        alt="cropped"
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default ImageCropper;
