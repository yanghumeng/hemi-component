import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import styles from './index.less';

const MoreButton = () => {
  return <Button className="more-button">更多</Button>;
};

const OverflowMenu = ({ menuItems, onItemClick }: { menuItems: any; onItemClick: any }) => {
  const [visibleItems, setVisibleItems] = useState(menuItems);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [items, setMoreItem] = useState<MenuProps['items']>([]);
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
    if (maxItems < menuItems.length) {
      setVisibleItems(menuItems.slice(0, maxItems));
      setMoreItem(initItems(menuItems.slice(maxItems)));
      setShowMoreButton(true);
    } else {
      setVisibleItems(items);
      setShowMoreButton(false);
    }
  };

  const initItems = (data: string[]) => {
    const newData = data.map((item, index) => {
      let obj = { key: '', label: <></> };
      obj.key = index + '';
      obj.label = (
        <Button key={index} className="menu-item" onClick={() => onItemClick(item)}>
          {item}
        </Button>
      );
      return obj;
    });
    console.log(newData);
    return newData;
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles['overflow-menu']} ref={containerRef}>
      {visibleItems?.map((item: any, index: number) => (
        <Button key={index} className="menu-item" onClick={() => onItemClick(item)}>
          {item}
        </Button>
      ))}
      {showMoreButton && (
        <Dropdown menu={{ items }} placement="top" arrow trigger={['click']}>
          <Button className="more-button">更多</Button>
        </Dropdown>
      )}
    </div>
  );
};

export default OverflowMenu;
