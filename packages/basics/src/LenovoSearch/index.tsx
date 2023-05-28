import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, List, message } from 'antd';
import useOnBlur from '../../hooks/useOnBlur';
import './index.less';
interface ISearchBoxProps {
  optionList: string[];
  searchCallback: (value: string) => void;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
  value?: string;
}

function SearchBox({ optionList, searchCallback, onChange, style, value }: ISearchBoxProps) {
  const [keyword, setKeyword] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [isShowList, setIsShowList] = useState(false);
  const blurRef = useRef<HTMLDivElement>(null);
  const [firstRender, setFirstRender] = useState(true);
  const [listWidth, setListWidth] = useState<string | number>('auto');
  const handleKeyWordSearch = (value?: string) => {
    if (value) {
      searchCallback(value);
    } else {
      message.warning({
        content: '请输入关键字',
      });
    }
  };

  const handleItemSearch = (value: string) => {
    setKeyword(value);
    handleKeyWordSearch(value);
    setIsShowList(false);
  };

  useOnBlur(blurRef, {
    outside: () => {
      isShowList && setIsShowList(false);
    },
    inside: () => {
      setFirstRender(false);
      optionList.length > 0 && !isShowList && setIsShowList(true);
    },
  });

  const handleKeyDown = (event: { key: string; preventDefault: () => void }) => {
    if (event.key === 'ArrowUp') {
      selectedIdx >= 0 && isShowList && setSelectedIdx(selectedIdx - 1);
      event.preventDefault();
    } else if (event.key === 'ArrowDown') {
      selectedIdx == optionList.length - 1
        ? setSelectedIdx(-1)
        : isShowList && setSelectedIdx(selectedIdx + 1);
      event.preventDefault();
    } else if (event.key === 'Enter') {
      if (selectedIdx !== -1) {
        setKeyword(optionList[selectedIdx]);
      }
      handleKeyWordSearch(selectedIdx !== -1 ? optionList[selectedIdx] : value);
      setIsShowList(false);
    }
  };
  useEffect(() => {
    onChange(keyword);
  }, [keyword]);

  useEffect(() => {
    optionList?.length != 0 ? !firstRender && setIsShowList(true) : setIsShowList(false);
  }, [optionList]);
  useEffect(() => {
    if (isShowList) {
      const { offsetWidth: itemWidth } = (blurRef?.current?.querySelector('.inpstyle') ||
        {}) as HTMLDivElement;
      setListWidth(itemWidth);
    } else {
      setSelectedIdx(-1);
    }
  }, [isShowList]);

  useEffect(() => {
    value && setKeyword(value);
  }, [value]);

  return (
    <>
      <div style={{ display: 'flex', ...style }}>
        <div ref={blurRef}>
          <Input
            key={value}
            className="inpstyle"
            placeholder="请输入搜索关键词"
            allowClear
            value={keyword}
            onChange={(event) => {
              setKeyword(event.target.value);
            }}
            onKeyDown={handleKeyDown}
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          />
          {isShowList && (
            <List
              className="liststyle"
              bordered
              dataSource={optionList}
              style={{ width: listWidth }}
              renderItem={(item, index) => (
                <List.Item onClick={() => handleItemSearch(item)}>{item}</List.Item>
              )}
            />
          )}
        </div>
        <Button
          type="primary"
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          onClick={() => handleKeyWordSearch(keyword)}
        >
          搜索
        </Button>
      </div>
    </>
  );
}

export default SearchBox;
