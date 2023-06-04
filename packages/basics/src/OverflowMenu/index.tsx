import { Button, Dropdown } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import styles from './index.less';

export interface IRenderOptionItem {
  key: string | number;
  label: React.ReactElement;
}

export interface IOverflowMenuProps {
  /** 菜单项 */
  menuItems: string[] | IRenderOptionItem[];
  /**点击事件 */
  onItemClick: any;
  /**自定义渲染项 */
  renderOption?: (item: string | IRenderOptionItem) => React.ReactElement;
}
const OverflowMenu = (props: IOverflowMenuProps) => {
  const { menuItems, onItemClick, renderOption } = props;
  const [visibleItems, setVisibleItems] = useState<IRenderOptionItem[]>([]);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [items, setMoreItem] = useState<IRenderOptionItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
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
      setVisibleItems(iniData(menuItems).slice(0, maxItems));
      setMoreItem(iniData(menuItems).slice(maxItems));
      setShowMoreButton(true);
    } else {
      setVisibleItems(iniData(menuItems));
      setShowMoreButton(false);
    }
  };
  const iniData = (data: string[] | IRenderOptionItem[]) => {
    return data.map((item, index) => {
      if (typeof item === 'string') {
        let obj: IRenderOptionItem = {
          key: '',
          label: <></>,
        };
        obj.key = index;
        obj.label = renderOption ? (
          renderOption(item)
        ) : (
          <Button key={index} className="menu-item" onClick={() => onItemClick(item)}>
            {item}
          </Button>
        );
        return obj;
      } else {
        return item;
      }
    });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [containerRef?.current?.querySelector('.menu-item')]);

  return (
    <div className={styles['overflow-menu']} ref={containerRef}>
      {visibleItems.map((item: IRenderOptionItem) => {
        return item.label;
      })}
      {showMoreButton && (
        <Dropdown menu={{ items }} placement="top" arrow trigger={['click']}>
          <Button className="more-button">更多</Button>
        </Dropdown>
      )}
    </div>
  );
};

export default OverflowMenu;
