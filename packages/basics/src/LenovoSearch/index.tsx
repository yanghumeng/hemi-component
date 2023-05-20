import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, List } from 'antd';
import useOnBlur from '../../hooks/useOnBlur';

function SearchBox() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [isShowList, setIsShowList] = useState(false);
  const blurRef = useRef(null);

  const handleKeyWordSearch = (value?: React.SetStateAction<string>) => {
    alert(value);
  };

  const handleItemSearch = (value: React.SetStateAction<string>) => {
    setKeyword(value);
    handleKeyWordSearch(value);
  };

  useOnBlur(blurRef, {
    outside: () => {
      isShowList && setIsShowList(false);
    },
    inside: () => {
      results.length > 0 && !isShowList && setIsShowList(true);
    },
  });

  const handleKeyDown = (event: { key: string; preventDefault: () => void }) => {
    if (event.key === 'ArrowUp') {
      selectedIdx >= 0 && setSelectedIdx(selectedIdx - 1);
      event.preventDefault();
    } else if (event.key === 'ArrowDown') {
      selectedIdx == results.length - 1 ? setSelectedIdx(-1) : setSelectedIdx(selectedIdx + 1);
      event.preventDefault();
    } else if (event.key === 'Enter') {
      if (selectedIdx !== -1) {
        setKeyword(results[selectedIdx]);
      }
      setIsShowList(false);
    }
  };
  useEffect(() => {
    if (!isShowList) {
      setSelectedIdx(-1);
    }
  }, [isShowList]);
  useEffect(() => {
    console.log(keyword);
    if (keyword.length > 0) {
      setResults(['1', '2', ' 3']);
      setIsShowList(true);
    } else {
      setIsShowList(false);
      setResults([]);
    }
  }, [keyword]);
  useEffect(() => {
    if (results.length == 0) setIsShowList(false);
  }, [results]);

  return (
    <>
      <div style={{ display: 'flex', width: '100%' }}>
        <div ref={blurRef}>
          <Input
            placeholder="请输入搜索关键词"
            allowClear
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            onKeyDown={handleKeyDown}
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          />
          {isShowList && (
            <List
              bordered
              dataSource={results}
              renderItem={(item, index) => (
                <List.Item
                  onClick={() => handleItemSearch(item)}
                  style={{ backgroundColor: index === selectedIdx ? '#f0f0f0' : 'transparent' }}
                >
                  {item}
                </List.Item>
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
