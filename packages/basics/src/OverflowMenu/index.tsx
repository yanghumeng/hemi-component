import { Button } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/server';

const PREFIX = 'OverflowMenu';
export interface ItagProps {
  /** 必传key */
  key: string;
  [key: string]: any;
}
export interface TagGeneratorProps {
  /** 菜单项 */
  tags: ItagProps[];
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
  const [visibleTags, setVisibleTags] = useState<ItagProps[]>(tags);
  const [hiddleTags, setHiddleTags] = useState<ItagProps[]>([]);

  useEffect(() => {
    if (divRef.current && tags?.length > 0) {
      adjustVisibleTags();
      window.addEventListener('resize', adjustVisibleTags);
    }
    return () => {
      window.removeEventListener('resize', adjustVisibleTags);
    };
  }, [divRef.current, tags]);

  useEffect(() => {
    setVisibleTags(tags);
  }, [tags]);

  const moreComWidth = () => {
    const moreStr = ReactDOM.renderToStaticMarkup(
      renderMore ? renderMore(hiddleTags) : <Button>更多</Button>,
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
      const hiddleTagsT = tags.filter(
        (item) => updatedVisibleTags.findIndex((itemV) => item.key === itemV.key) === -1,
      );
      setHiddleTags(hiddleTagsT);
      setShowAllTags(i < tags?.length);
    }
  };
  return (
    <div className={PREFIX} ref={divRef} style={{ width: '100%' }}>
      {visibleTags?.map((tag: ItagProps, index: number) => (
        <React.Fragment key={index}>{renderTag(tag)}</React.Fragment>
      ))}

      <div style={{ display: 'inline-block' }}>
        {showAllTags ? (
          renderMore ? (
            renderMore(hiddleTags)
          ) : (
            <Button onClick={() => moreClick?.(hiddleTags)}>更多</Button>
          )
        ) : null}
      </div>
    </div>
  );
};

export default TagGenerator;
