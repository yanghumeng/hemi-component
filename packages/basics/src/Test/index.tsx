import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'antd';

interface Point {
  x: number;
  y: number;
}

const DrawingTool: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [tool, setTool] = useState<'select' | 'none'>('none');
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [imageIndex, setImageIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const images = ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png']; // 替换为实际的图片路径

  useEffect(() => {
    const image = new Image();
    image.src = images[imageIndex];
    image.onload = () => {
      setImageSize({ width: image.width, height: image.height });
      fitImageToCanvas(image.width, image.height);
    };
  }, [imageIndex]);

  const fitImageToCanvas = (imageWidth: number, imageHeight: number) => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const widthRatio = containerWidth / imageWidth;
    const heightRatio = containerHeight / imageHeight;

    const newScale = Math.min(widthRatio, heightRatio);

    const scaledWidth = imageWidth * newScale;
    const scaledHeight = imageHeight * newScale;

    const newOffsetX = (containerWidth - scaledWidth) / 2;
    const newOffsetY = (containerHeight - scaledHeight) / 2;

    setScale(newScale);
    setOffset({ x: newOffsetX, y: newOffsetY });
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const image = new Image();
    image.src = images[imageIndex];
    image.onload = () => {
      canvas.width = containerRef.current?.clientWidth || 800;
      canvas.height = containerRef.current?.clientHeight || 600;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(offset.x, offset.y);
      ctx.scale(scale, scale);
      ctx.drawImage(image, 0, 0);

      points.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5 / scale, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
      });

      ctx.restore();
    };
  };

  useEffect(() => {
    drawCanvas();
  }, [points, scale, offset, imageIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preventDefault = (e: WheelEvent) => {
      e.preventDefault();
    };

    container.addEventListener('wheel', preventDefault, { passive: false });

    return () => {
      container.removeEventListener('wheel', preventDefault);
    };
  }, []);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool !== 'select') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - offset.x) / scale;
    const y = (e.clientY - rect.top - offset.y) / scale;

    const clampedX = Math.max(0, Math.min(x, imageSize.width));
    const clampedY = Math.max(0, Math.min(y, imageSize.height));

    setPoints([...points, { x: clampedX, y: clampedY }]);
  };

  const handleUndo = () => {
    setPoints(points.slice(0, -1));
  };

  const handleReset = () => {
    setPoints([]);
    fitImageToCanvas(imageSize.width, imageSize.height);
  };

  const handleSave = () => {
    const scaledPoints = points.map((point) => ({
      x: Math.round(point.x),
      y: Math.round(point.y),
    }));
    const data = JSON.stringify({ points: scaledPoints }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'points.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoom = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.1, Math.min(5, scale * zoom));

    const newOffsetX = mouseX - (mouseX - offset.x) * (newScale / scale);
    const newOffsetY = mouseY - (mouseY - offset.y) * (newScale / scale);

    setScale(newScale);
    setOffset({ x: newOffsetX, y: newOffsetY });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool === 'select') return;

    const startX = e.clientX;
    const startY = e.clientY;
    const startOffset = { ...offset };

    const handleMouseMove = (e: MouseEvent) => {
      setOffset({
        x: startOffset.x + e.clientX - startX,
        y: startOffset.y + e.clientY - startY,
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => setTool(tool === 'select' ? 'none' : 'select')}>
          {tool === 'select' ? '取消选择' : '选择'}
        </Button>
        <Button onClick={handleUndo}>撤销</Button>
        <Button onClick={handleReset}>重置</Button>
        <Button onClick={handleSave}>保存</Button>
      </div>
      <div
        ref={containerRef}
        style={{ flex: 1, overflow: 'hidden', background: '#000' }}
        onWheel={handleWheel}
      >
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onMouseDown={handleMouseDown}
          style={{ cursor: tool === 'select' ? 'crosshair' : 'move' }}
        />
      </div>
      <div style={{ display: 'flex', padding: '10px' }}>
        <div style={{ flex: 1 }}></div>
        <div style={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              style={{
                width: '50px',
                height: '50px',
                margin: '0 5px',
                cursor: 'pointer',
                border: index === imageIndex ? '2px solid blue' : 'none',
              }}
              onClick={() => setImageIndex(index)}
            />
          ))}
        </div>
        <div style={{ flex: 1 }}></div>
      </div>
    </div>
  );
};

export default DrawingTool;
