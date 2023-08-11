import { Button } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/server';

interface TagGeneratorProps {
  /** 菜单项 */
  tags: any[];
  /**自定义渲染项 */
  renderTag: (tag: any) => React.ReactElement;
  /**自定义渲染更多按钮样式 */
  renderMore?: (tag: any) => React.ReactElement;
  /**点击更多函数 */
  moreClick?: (tag: any) => void;
}

const TagGenerator: React.FC<TagGeneratorProps> = ({ tags, renderMore, renderTag, moreClick }) => {
  const divRef = useRef<any>(null);
  const [showAllTags, setShowAllTags] = useState(false);
  const [visibleTags, setVisibleTags] = useState<any[]>(tags);

  useEffect(() => {
    if (divRef.current && tags?.length > 0) {
      adjustVisibleTags();
      window.addEventListener('resize', adjustVisibleTags);
    }
    return () => {
      window.removeEventListener('resize', adjustVisibleTags);
    };
  }, [divRef.current, tags]);
  const moreComWidth = () => {
    const moreStr = ReactDOM.renderToStaticMarkup(
      renderMore ? renderMore(visibleTags) : <Button>更多</Button>,
    );
    const tempMore = document.createElement('div');
    tempMore.style.display = 'inline-block';
    tempMore.style.visibility = 'hidden';
    tempMore.innerHTML = moreStr;
    document.body.appendChild(tempMore);
    const tempMoreWidth = tempMore.getBoundingClientRect().width;
    document.body.removeChild(tempMore);
    return tempMoreWidth;
  };
  const adjustVisibleTags = () => {
    if (divRef.current) {
      const divWidth = divRef.current.offsetWidth;
      const moreWidth = moreComWidth();
      let totalWidth = moreWidth;
      let updatedVisibleTags: any[] = [];
      let i = 0;
      for (i = 0; i < tags?.length; i++) {
        const tagStr = ReactDOM.renderToStaticMarkup(renderTag(tags[i]));
        const tempDiv = document.createElement('div');
        tempDiv.style.display = 'inline-block';
        tempDiv.style.visibility = 'hidden';
        tempDiv.innerHTML = tagStr;
        document.body.appendChild(tempDiv);
        const tempDivWidth = tempDiv.getBoundingClientRect().width;
        if (totalWidth + tempDivWidth > divWidth) {
          break;
        }
        updatedVisibleTags.push(tags[i]);
        totalWidth += tempDivWidth;
        document.body.removeChild(tempDiv);
      }
      setVisibleTags(updatedVisibleTags);
      setShowAllTags(i < tags?.length);
    }
  };
  return (
    <div ref={divRef} style={{ width: '100%' }}>
      {visibleTags?.map((tag, index) => (
        <React.Fragment key={index}>{renderTag(tag)}</React.Fragment>
      ))}

      <div style={{ display: 'inline-block' }}>
        {showAllTags ? (
          renderMore ? (
            renderMore(visibleTags)
          ) : (
            <Button onClick={() => moreClick?.(visibleTags)}>更多</Button>
          )
        ) : null}
      </div>
    </div>
  );
};

export default TagGenerator;
