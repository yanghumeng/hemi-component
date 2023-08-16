---
title: 属性优先级匹配 | paramMatching
nav:
  path: /utils
group:
  title: 自定义方法
  path: /function
---

# paramMatching 属性优先级匹配

属性优先级匹配

## 代码演示

```tsx
import React from 'react';
import { utils } from '@hemi-component/utils';
import { Input, Button, message } from 'antd';
const { copyCot } = utils;
const Test = () => {
  const arr = [
    { id: 'index/p1/p2', name: 'long url' },
    { id: 'index/p1', name: 'short url' },
  ];

  return (
    <>
      <div>
        测试数据：
        {`[
    { id: 'index/p1/p2', name: 'long url' },
    { id: 'index/p1', name: 'short url' },
  ]`}
        匹配数据：index/p1
      </div>
      <div>
        匹配结果：期望是name为short url的数据，
        <br />
        实际结果：
        {JSON.stringify(utils.paramMatching('index/p1', arr, 'id'))}
      </div>
    </>
  );
};
export default Test;
```

| 属性名 | 描述     | 类型       | 默认值   |
| ------ | -------- | ---------- | -------- |
| url    | 路由     | `'string'` |
| key    | 指定参数 | `'string'` |
