import { Button } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import styles from './index.less';

const MoreButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button className="more-button" onClick={onClick}>
      更多
    </Button>
  );
};

const OverflowMenu = ({ items, onItemClick }: { items: any; onItemClick: any }) => {
  const [visibleItems, setVisibleItems] = useState(items);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleResize = () => {
    let { offsetWidth: containerWidth } = (containerRef?.current || {}) as HTMLDivElement;
    const { offsetWidth: itemWidth } = (containerRef?.current?.querySelector('.menu-item') ||
      {}) as HTMLDivElement;
    const { offsetWidth: btnWidth } = (containerRef?.current?.querySelector('.more-button') ||
      {}) as HTMLDivElement;
    containerWidth += showMoreButton ? btnWidth : 0;
    const maxItems =
      Math.round(containerWidth / itemWidth) - 1 > 1
        ? Math.round(containerWidth / itemWidth) - 1
        : 1;
    if (maxItems < items.length) {
      setVisibleItems(items.slice(0, maxItems));
      setShowMoreButton(true);
    } else {
      setVisibleItems(items);
      setShowMoreButton(false);
    }
  };
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize, items]);

  const handleMoreClick = () => {
    setVisibleItems(items);
    setShowMoreButton(false);
  };

  return (
    <div className={styles['overflow-menu']} ref={containerRef}>
      {visibleItems?.map((item: any, index: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <Button key={index} className="menu-item" onClick={() => onItemClick(item)}>
          {item}
        </Button>
      ))}
      {showMoreButton && <MoreButton onClick={handleMoreClick} />}
    </div>
  );
};

export default OverflowMenu;
