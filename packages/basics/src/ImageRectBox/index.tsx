import React, { useEffect, useRef } from 'react';

export interface IRect {
  x: number;
  y: number;
  w: number;
  h: number;
}
export interface ICircle {
  x: number;
  y: number;
  radius: number;
}

export interface ILineProps {
  /**宽度 */
  width?: number;
  /**颜色 */
  color?: string;
  /**设置虚线 */
  mode?: 'dashed';
  /**虚线数据 */
  dashLine?: number[];
}

export interface Props {
  /**框选坐标以及大小数据 */
  rects?: IRect[];
  /**圆形框选坐标以及半径 */
  circles?: ICircle[];
  /**图片地址 */
  imageUrl: string;
  /**组件宽度 */
  width?: number;
  /**组件高度 */
  height?: number;
  /**线框属性 */
  lineStyle?: ILineProps;
  /**线框类型 rect：矩形（默认）；circle：圆形 */
  type?: 'rect' | 'circle';
}

const ImageRectBox: React.FC<Props> = ({
  rects = [],
  circles = [],
  imageUrl,
  width,
  height,
  ...etc
}) => {
  const { lineStyle, type = 'rect' } = etc;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawCircleStroke = (ctx: any, x: number, y: number, radius: number) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
  };
  useEffect(() => {
    const loadImageAndDraw = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');

      if (!canvas || !ctx) return;

      const image = new Image();
      image.src = imageUrl;

      image.onload = () => {
        const imgWidth = image.width;
        const imgHeight = image.height;

        // 确定最终展示区域的尺寸
        const finalWidth = width || imgWidth;
        const finalHeight = height || imgHeight;

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

        // 绘制红色线框
        ctx.strokeStyle = lineStyle?.color || 'red';
        lineStyle?.mode === 'dashed' && ctx.setLineDash(lineStyle?.dashLine ?? [5, 5]);
        ctx.lineWidth = lineStyle?.width || 1;

        if (type === 'circle')
          circles?.forEach((rect) => {
            const { x, y, radius } = rect;
            const scaledX = x * ratio + offsetX;
            const scaledY = y * ratio + offsetY;
            drawCircleStroke(ctx, scaledX, scaledY, radius);
          });
        else
          rects?.forEach((rect) => {
            const { x, y, w, h } = rect;
            const scaledX = x * ratio + offsetX;
            const scaledY = y * ratio + offsetY;
            const scaledW = w * ratio;
            const scaledH = h * ratio;
            ctx.strokeRect(scaledX, scaledY, scaledW, scaledH);
          });
      };
    };

    loadImageAndDraw();
  }, [rects, imageUrl, width, height]);

  return <canvas ref={canvasRef} />;
};

export default ImageRectBox;
