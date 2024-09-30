import React, { useRef, useState, useEffect } from 'react';

enum POSITION_TYPE {
  STAY_INSIDE = 'STAY_INSIDE',
  STAY_OUTSIDE = 'STAY_OUTSIDE',
  ENTER = 'ENTER',
  EXIT = 'EXIT',
  CROSS = 'CROSS',
  FORWARD = 'FORWARD',
  BACKWARD = 'BACKWARD',
}

interface Point {
  x: number;
  y: number;
}
export interface IShape {
  type: 'line' | 'polygon';
  points: [number, number][];
  color?: string;
  direction?: POSITION_TYPE;
}

interface PolygonSelectorProps {
  polygons: Point[][];
  onChange: (polygons: Point[][]) => void;
  imageSrc?: string;
  fillColor?: string;
  actionType: 'mark' | 'menu';
  shapes?: IShape[];
}

const PolygonSelector: React.FC<PolygonSelectorProps> = ({
  polygons,
  onChange,
  imageSrc,
  fillColor = 'rgba(255, 0, 0, 0.3)',
  actionType,
  shapes,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentPolygon, setCurrentPolygon] = useState<Point[]>([]);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState<Point | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState(1);
  const [selectedPolygons, setSelectedPolygons] = useState<number[]>([]);
  const [contextMenuPosition, setContextMenuPosition] = useState<Point | null>(null);

  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setCanvasSize({ width, height });
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        setImage(img);
        if (containerRef.current) {
          const { width, height } = containerRef.current.getBoundingClientRect();
          const scaleX = width / img.width;
          const scaleY = height / img.height;
          const scale = Math.min(scaleX, scaleY);
          setImageScale(scale);
          const x = (width - img.width * scale) / 2;
          const y = (height - img.height * scale) / 2;
          setImageOffset({ x, y });
          setCanvasSize({ width, height });
        }
      };
    }
  }, [imageSrc]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvasSize.width;
      canvas.height = canvasSize.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (image) {
          ctx.drawImage(
            image,
            imageOffset.x,
            imageOffset.y,
            image.width * imageScale,
            image.height * imageScale,
          );
        }

        ctx.lineWidth = 2;

        polygons.forEach((polygon, index) => {
          ctx.beginPath();
          polygon.forEach((point, pointIndex) => {
            if (pointIndex === 0) {
              ctx.moveTo(
                point.x * imageScale + imageOffset.x,
                point.y * imageScale + imageOffset.y,
              );
            } else {
              ctx.lineTo(
                point.x * imageScale + imageOffset.x,
                point.y * imageScale + imageOffset.y,
              );
            }
          });
          ctx.closePath();
          ctx.strokeStyle = selectedPolygons.includes(index) ? 'blue' : 'red';
          ctx.stroke();
          ctx.fillStyle = selectedPolygons.includes(index) ? 'rgba(0, 0, 255, 0.3)' : fillColor;
          ctx.fill();
        });
        shapes?.forEach((shape) => {
          ctx.beginPath();
          ctx.strokeStyle = shape.color || '#00FF00'; // 默认使用绿色
          ctx.lineWidth = 2;

          shape.points.forEach((point, index) => {
            if (index === 0) {
              ctx.moveTo(point[0], point[1]);
            } else {
              ctx.lineTo(point[0], point[1]);
            }
          });

          if (shape.type === 'polygon') {
            ctx.closePath();
          }

          ctx.stroke();

          // 如果是线条且有方向，绘制箭头
          if (shape.type === 'line' && shape.direction && shape.points.length >= 2) {
            const [startX, startY] = shape.points[0];
            const [endX, endY] = shape.points[shape.points.length - 1];
            const midX = (startX + endX) / 2;
            const midY = (startY + endY) / 2;

            // 计算线的角度
            const angle = Math.atan2(endY - startY, endX - startX);

            // 计算垂直于线的方向
            const perpAngle =
              angle + (shape.direction === POSITION_TYPE.FORWARD ? Math.PI / 2 : -Math.PI / 2);

            // 箭头大小
            const arrowLength = 20; // 增加箭头长度
            const arrowWidth = 10; // 箭头宽度

            // 计算箭头的点
            const arrowX = midX + Math.cos(perpAngle) * arrowLength;
            const arrowY = midY + Math.sin(perpAngle) * arrowLength;

            // 绘制箭头
            ctx.beginPath();
            ctx.moveTo(midX, midY);
            ctx.lineTo(arrowX, arrowY);
            ctx.stroke();

            // 绘制箭头的两个边
            ctx.beginPath();
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(
              arrowX - Math.cos(perpAngle - Math.PI / 6) * arrowWidth,
              arrowY - Math.sin(perpAngle - Math.PI / 6) * arrowWidth,
            );
            ctx.lineTo(
              arrowX - Math.cos(perpAngle + Math.PI / 6) * arrowWidth,
              arrowY - Math.sin(perpAngle + Math.PI / 6) * arrowWidth,
            );
            ctx.closePath();
            ctx.fillStyle = shape.color || '#00FF00';
            ctx.fill();
          }
        });

        if (actionType === 'mark' && currentPolygon.length > 0) {
          ctx.beginPath();
          currentPolygon.forEach((point, index) => {
            if (index === 0) {
              ctx.moveTo(
                point.x * imageScale + imageOffset.x,
                point.y * imageScale + imageOffset.y,
              );
            } else {
              ctx.lineTo(
                point.x * imageScale + imageOffset.x,
                point.y * imageScale + imageOffset.y,
              );
            }
          });
          if (mousePosition) {
            ctx.lineTo(
              mousePosition.x * imageScale + imageOffset.x,
              mousePosition.y * imageScale + imageOffset.y,
            );
            ctx.lineTo(
              currentPolygon[0].x * imageScale + imageOffset.x,
              currentPolygon[0].y * imageScale + imageOffset.y,
            );
          }
          ctx.strokeStyle = 'red';
          ctx.stroke();
        }
      }
    }
  }, [
    polygons,
    currentPolygon,
    canvasSize,
    mousePosition,
    image,
    fillColor,
    imageOffset,
    imageScale,
    actionType,
    selectedPolygons,
    shapes,
  ]);

  const getRelativeCoordinates = (e: React.MouseEvent<HTMLCanvasElement>): Point => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect && image) {
      const x = (e.clientX - rect.left - imageOffset.x) / imageScale;
      const y = (e.clientY - rect.top - imageOffset.y) / imageScale;
      return { x, y };
    }
    return { x: 0, y: 0 };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // Only respond to left mouse button clicks
    if (e.button !== 0) return;

    const coords = getRelativeCoordinates(e);

    if (actionType === 'mark') {
      setCurrentPolygon([...currentPolygon, coords]);
    } else if (actionType === 'menu') {
      const clickedPolygonIndex = getClickedPolygonIndex(coords);
      if (clickedPolygonIndex !== -1) {
        setSelectedPolygons((prev) =>
          prev.includes(clickedPolygonIndex)
            ? prev.filter((index) => index !== clickedPolygonIndex)
            : [...prev, clickedPolygonIndex],
        );
      } else {
        setSelectedPolygons([]);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (actionType === 'mark') {
      const coords = getRelativeCoordinates(e);
      setMousePosition(coords);
    }
  };

  const handleDoubleClick = () => {
    if (actionType === 'mark' && currentPolygon.length > 2) {
      onChange([...polygons, currentPolygon]);
      setCurrentPolygon([]);
      setMousePosition(null);
    }
  };

  const getClickedPolygonIndex = (coords: Point): number => {
    return polygons.findIndex((polygon) => {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return false;

      ctx.beginPath();
      polygon.forEach((point, index) => {
        const x = point.x * imageScale + imageOffset.x;
        const y = point.y * imageScale + imageOffset.y;
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.closePath();
      return ctx.isPointInPath(
        coords.x * imageScale + imageOffset.x,
        coords.y * imageScale + imageOffset.y,
      );
    });
  };

  const handleRightClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (actionType === 'menu') {
      const coords = getRelativeCoordinates(e);
      const clickedPolygonIndex = getClickedPolygonIndex(coords);
      if (clickedPolygonIndex !== -1) {
        setSelectedPolygons((prev) =>
          prev.includes(clickedPolygonIndex) ? prev : [...prev, clickedPolygonIndex],
        );
        // Set the context menu position to the mouse position
        setContextMenuPosition({ x: e.clientX, y: e.clientY });
      } else {
        setSelectedPolygons([]);
        setContextMenuPosition(null);
      }
    }
  };

  const handleDeleteSelected = () => {
    const newPolygons = polygons.filter((_, index) => !selectedPolygons.includes(index));
    onChange(newPolygons);
    setSelectedPolygons([]);
    setContextMenuPosition(null);
  };

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{ display: 'block', width: '100%', height: '100%' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleRightClick}
      />
      {contextMenuPosition && (
        <div
          style={{
            position: 'fixed', // Change to fixed positioning
            top: contextMenuPosition.y,
            left: contextMenuPosition.x,
            background: 'white',
            border: '1px solid black',
            padding: '5px',
            zIndex: 1000,
          }}
        >
          <button onClick={handleDeleteSelected}>Delete Selected</button>
        </div>
      )}
    </div>
  );
};

export default PolygonSelector;
