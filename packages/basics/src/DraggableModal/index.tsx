import React, { useState } from 'react';
import { Modal, ModalProps } from 'antd';
const clamp = (value: number, [min, max]: [number, number]): number => {
  return Math.min(Math.max(value, min), max);
};
interface DraggableModalProps extends ModalProps {
  draggable: boolean;
}
const DraggableModal: React.FC<React.PropsWithChildren<DraggableModalProps>> = ({
  wrapClassName,
  open,
  draggable = false,
  ...restProps
}) => {
  const [simpleClass, setSimpleClass] = useState(Math.random().toString(36).substring(2));

  // 鼠标按下时的坐标
  const startXY = React.useRef<[number, number]>([0, 0]);
  // 上次移动的距离总和
  const prevPosition = React.useRef<[number, number]>([0, 0]);
  const dragging = React.useRef<boolean>(false);

  const bounds = React.useRef({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  const modalContentRef = React.useRef(null);

  const handleDown = (e: MouseEvent) => {
    e.preventDefault();
    const [prevX, prevY] = prevPosition.current;
    let [x, y] = prevPosition.current;
    dragging.current = true;
    x = e.clientX - prevX;
    y = e.clientY - prevY;
    startXY.current = [x, y];
  };

  const handleMove = (e: MouseEvent) => {
    if (!dragging.current || e.button !== 0) return;

    const [startX, startY] = startXY.current;
    let [x, y] = prevPosition.current;
    x = e.clientX - startX;
    y = e.clientY - startY;

    // 禁止拖动到窗口外
    const { top, right, bottom, left } = bounds.current;
    x = clamp(x, [-left, right]);
    y = clamp(y, [-top, bottom]);

    prevPosition.current = [x, y];
    // @ts-ignore
    modalContentRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleUp = (e: MouseEvent) => {
    dragging.current = false;
  };

  React.useEffect(() => {
    if (simpleClass && open && draggable) {
      const container: any = document.getElementsByClassName(simpleClass)[0];
      const header = container.getElementsByClassName('ant-modal-header')[0];
      const modal = container.getElementsByClassName('ant-modal-content')[0];
      modalContentRef.current = modal;
      header.style.cursor = 'all-scroll';

      // 计算bounds
      const { clientWidth, clientHeight } = document.documentElement;
      const { top, bottom, left, right } = modal.getBoundingClientRect();
      if (bounds.current.top === 0) {
        bounds.current = {
          left,
          right: clientWidth - right - 1,
          top,
          bottom: clientHeight - bottom - 1,
        };
      }
      // 鼠标按下
      header.addEventListener('mousedown', handleDown);
      // 鼠标移动
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleUp);
      return () => {
        header.removeEventListener('mousedown', handleDown);
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleUp);
      };
    }
  }, [open]);

  const wrapModalClassName = wrapClassName ? `${wrapClassName} ${simpleClass}` : `${simpleClass}`;
  return <Modal title="" open={open} {...restProps} wrapClassName={wrapModalClassName} />;
};
export default DraggableModal;
