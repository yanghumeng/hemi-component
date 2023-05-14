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
const request = (params?: object | string): Promise<string> => {
  console.log('搜索', params);
};
export default () => {
  const [dataSource, setDataSource] = useState([]);
  const set = (key) => setDataSource(['12', '123', '1234']);

  return (
    <>
      <LenovoSearch
        dataSource={dataSource}
        req={request}
        keyWordsCallBack={(key) => set()}
      ></LenovoSearch>
    </>
  );
};
```
