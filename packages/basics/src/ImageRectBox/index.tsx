import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface IRect {
  x: number;
  y: number;
  w: number;
  h: number;
  color?: string;
}
export interface ICircle {
  x: number;
  y: number;
  radius: number;
  color?: string;
}

export interface ILineProps {
  /** 宽度 */
  width?: number;
  /** 颜色 */
  color?: string;
  /** 设置虚线 */
  mode?: 'dashed';
  /** 虚线数据 */
  dashLine?: number[];
}

export interface IProps {
  /** 框选坐标以及大小数据 */
  rects?: IRect[];
  /** 圆形框选坐标以及半径 */
  circles?: ICircle[];
  /** 图片地址 */
  imageUrl: string;
  /** 组件宽度 */
  width?: number;
  /** 组件高度 */
  height?: number;
  /** 线框属性 */
  lineStyle?: ILineProps;
  /** 线框类型 rect：矩形（默认）；circle：圆形 */
  type?: 'rect' | 'circle';
}

const ImageRectBox: React.FC<IProps> = (props: IProps) => {
  const { lineStyle, type = 'rect', rects = [], circles = [], imageUrl, width, height } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const drawCircleStroke = (ctx: any, x: number, y: number, radius: number) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
  };

  const loadImageAndDraw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      const imgWidth = image.width;
      const imgHeight = image.height;
      const parentElement = canvasRef.current?.parentNode;
      const parentHeight =
        parentElement instanceof HTMLElement ? parentElement.getBoundingClientRect().height : null;
      const parentWidth =
        parentElement instanceof HTMLElement ? parentElement.getBoundingClientRect().width : null;
      // 确定最终展示区域的尺寸
      const finalWidth = width || parentWidth || imgWidth;
      const finalHeight = height || parentHeight || imgHeight;

      // 根据实际尺寸缩放比例，保持图片比例并完整展示
      const ratio = Math.min(finalWidth / imgWidth, finalHeight / imgHeight);
      const displayWidth = imgWidth * ratio;
      const displayHeight = imgHeight * ratio;
      canvas.width = finalWidth;
      canvas.height = finalHeight;

      // 计算位移，使图片居中展示
      const offsetX = (finalWidth - displayWidth) / 2;
      const offsetY = (finalHeight - displayHeight) / 2;

      // 绘制图片
      ctx.drawImage(image, offsetX, offsetY, displayWidth, displayHeight);

      lineStyle?.mode === 'dashed' && ctx.setLineDash(lineStyle?.dashLine ?? [5, 5]);
      ctx.lineWidth = lineStyle?.width || 1;

      if (type === 'circle')
        circles?.forEach((rect) => {
          // 绘制线框
          ctx.strokeStyle = lineStyle?.color || 'red';
          const { x, y, radius, color } = rect;
          const scaledX = x * ratio + offsetX;
          const scaledY = y * ratio + offsetY;
          if (color) ctx.strokeStyle = color;
          drawCircleStroke(ctx, scaledX, scaledY, radius);
        });
      else
        rects?.forEach((rect) => {
          // 绘制线框
          ctx.strokeStyle = lineStyle?.color || 'red';
          const { x, y, w, h, color } = rect;
          const scaledX = x * ratio + offsetX;
          const scaledY = y * ratio + offsetY;
          const scaledW = w * ratio;
          const scaledH = h * ratio;
          if (color) ctx.strokeStyle = color;
          ctx.strokeRect(scaledX, scaledY, scaledW, scaledH);
        });
      setImageLoaded(true);
    };
  }, [circles, height, imageUrl, lineStyle, rects, type, width]);

  useEffect(() => {
    loadImageAndDraw();
  }, [loadImageAndDraw]);
  useEffect(() => {
    if (imageLoaded) {
      setImageLoaded(false); // 重设为未加载状态
    }
  }, [imageLoaded]);
  return (
    <React.Fragment>
      <canvas ref={canvasRef} />
    </React.Fragment>
  );
};

export default ImageRectBox;
