import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export interface IRect {
  x: number;
  y: number;
  w: number;
  h: number;
  color?: string;
  context?: string;
}
export interface ILineProps {
  /** 宽度 */
  width?: number;
  /** 颜色 */
  color?: string;
  /** 设置虚线 */
  mode?: 'dashed';
}

export interface IProps {
  /** 框选坐标以及大小数据 */
  rects?: IRect[];
  /** 图片地址 */
  imageUrl: string;
  /** 组件宽度 */
  width?: number;
  /** 组件高度 */
  height?: number;
  /** 线框属性 */
  lineStyle?: ILineProps;
}

const ImageSelector: React.FC<IProps> = (props: IProps) => {
  const { lineStyle, rects = [], imageUrl, width, height } = props;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rectsTrans, setRectsTrans] = useState<any>([]);

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl;
    const resRects: any = [];

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!containerRef.current) return;
      const imgWidth = image.width;
      const imgHeight = image.height;
      //   const parentElement = canvasRef.current?.parentNode;
      // 计算位移，使图片居中展示
      const container = containerRef.current;
      const parentElement = container?.parentNode;
      const parentHeight =
        parentElement instanceof HTMLElement ? parentElement.getBoundingClientRect().height : null;
      const parentWidth =
        parentElement instanceof HTMLElement ? parentElement.getBoundingClientRect().width : null;

      // 确定最终展示区域的尺寸
      const finalWidth = width || parentWidth || imgWidth;
      const finalHeight = height || parentHeight || imgHeight;

      const scale = Math.min(finalWidth / imgWidth, finalHeight / imgHeight);
      const displayWidth = imgWidth * scale;
      const displayHeight = imgHeight * scale;
      const offsetX = (finalWidth - displayWidth) / 2;
      const offsetY = (finalHeight - displayHeight) / 2;

      container.style.backgroundImage = `url(${imageUrl})`;
      container.style.backgroundSize = 'contain';
      container.style.backgroundPosition = 'center';
      container.style.backgroundRepeat = 'no-repeat';
      container.style.width = `${finalWidth}px`;
      container.style.height = `${finalHeight}px`;
      rects?.map((rect) => {
        const { x, y, w, h, color, context } = rect;
        const scaledX = x * scale + offsetX;
        const scaledY = y * scale + offsetY;
        let drawTextX = 0;
        let drawTextY = 0;
        if (ctx) {
          ctx.font = '16px Arial';
          const textMetrics = ctx.measureText(context || '');
          const textWidth = textMetrics.width;
          const textHeight =
            textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
          const rectWidth = textWidth;
          const rectHeight = textHeight + 6;
          console.log(rectHeight, scaledY, rectWidth, scaledX, drawTextX);
          if (rectHeight > scaledY) {
            if (rectWidth > scaledX) {
              drawTextX += w * scale;
            } else {
              drawTextX -= rectWidth;
            }
          } else {
            drawTextY -= rectHeight;
          }
          resRects.push(
            <div
              style={{
                position: 'absolute',
                left: `${scaledX}px`,
                top: `${scaledY}px`,
                height: `${h * scale}px`,
                width: `${w * scale}px`,
                border: `${lineStyle?.width || 2}px ${lineStyle?.mode || 'solid'} ${
                  color || lineStyle?.color || 'red'
                }`,
              }}
            >
              {context && (
                <div
                  style={{
                    position: 'absolute',
                    left: `${drawTextX}px`,
                    top: `${drawTextY}px`,
                    lineHeight: 'normal',
                    color: `${color || lineStyle?.color || 'red'}`,
                    width: 'max-content',
                  }}
                >
                  {context}
                </div>
              )}
            </div>,
          );
        }
      });
      setRectsTrans([...resRects]);
    };
  }, [height, imageUrl, lineStyle, rects, width]);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {rectsTrans.map((rectsTran: any) => rectsTran)}
    </div>
  );
};

export default ImageSelector;
