import type { ReactNode } from 'react';
import React, { useCallback, useState } from 'react';
import { AutoComplete, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './index.less';
export interface ILenovoSearchProps {
  dataSource: string[];
  placeHolder?: string;
  suffix?: ReactNode | HTMLElement | boolean;
  renderOption?: (title: string) => ReactNode | HTMLElement;
  req: (param?: object | string) => void;
  keyWordsCallBack: (value: string) => void;
}
export default function LenovoSearch(props: ILenovoSearchProps) {
  const {
    dataSource,
    placeHolder,
    suffix: suffixProps,
    renderOption,
    req,
    keyWordsCallBack,
  } = props;
  const [inputValue, setInputValue] = useState('');
  const [searchLoading] = useState(false);
  const handleSearch = (value: React.SetStateAction<string>) => {
    setInputValue(value);
    req?.(value);
  };
  const suffix = suffixProps ? (
    suffixProps
  ) : (
    <Button
      type="primary"
      icon={<SearchOutlined />}
      onClick={() => handleSearch(inputValue)}
      loading={searchLoading}
    >
      搜索
    </Button>
  );
  const handleChange = useCallback(
    (e: any) => {
      const keywords = e.target.value;
      setInputValue(keywords);
      keyWordsCallBack?.(inputValue);
    },
    [inputValue, keyWordsCallBack],
  );

  const renderItem = (title: string) => {
    // 自定义联想条目的渲染内容
    return (
      renderOption?.(title) || (
        <div style={{ color: '#fff' }}>
          <span>
            <SearchOutlined />
            {` ${title}`}
          </span>
        </div>
      )
    );
  };
  const renderOptions = (data: any) => {
    let res = [];
    res = data.map((item: string) => {
      const obj: any = {};
      obj.label = renderItem(item);
      obj.value = item;
      return obj;
    });
    return res;
  };
  return (
    <div className="box">
      <div className="box-content">
        <AutoComplete
          style={{ width: '100%' }}
          options={renderOptions(dataSource)}
          onSelect={handleSearch}
        >
          <Input.Search
            placeholder={placeHolder || '请输入关键字'}
            className="box-content-input"
            enterButton={suffix}
            onChange={handleChange}
            onPressEnter={(e: any) => handleSearch(e.target.value)}
          />
        </AutoComplete>
      </div>
    </div>
  );
}
