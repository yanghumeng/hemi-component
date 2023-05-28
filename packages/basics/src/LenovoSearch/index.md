---
title: LenovoSearch 联想搜索框
nav:
  path: /basics
group:
  title: 基础组件
  path: /basic
---

# LenovoSearch 联想搜索框

## 代码演示

```tsx
import React, { useState, useCallBack } from 'react';
import { Button } from 'antd';
import { LenovoSearch } from '@hemi-component/basics';
export default () => {
  const [recommendData, setRecommendData] = useState<string[]>();
  const [value, setValue] = useState<string>('有默认值');
  const searchRquest = (params?: object | string) => {
    console.log('搜索', params);
  };
  const recommendedRequest = (value: string) => {
    value.length > 0 ? setRecommendData(['第一条']) : setRecommendData([]);
  };
  return (
    <div className="searchbox">
      <Button onClick={() => setValue('修改后的默认值')}>修改默认值</Button>
      <div style={{ display: 'flex' }}>
        <LenovoSearch
          optionList={recommendData}
          searchCallback={(value) => searchRquest(value)}
          onChange={(value) => recommendedRequest(value)}
        ></LenovoSearch>

        <LenovoSearch
          optionList={recommendData}
          searchCallback={(value) => searchRquest(value)}
          onChange={(value) => {
            recommendedRequest(value);
            console.log(value);
          }}
          value={value}
        ></LenovoSearch>
      </div>
    </div>
  );
};
```
