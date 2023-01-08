---
title: 复制 | copyCot
nav:
  path: /utils
group:
  title: 自定义方法
  path: /function
---

# copyCot 复制

一键复制

## 代码演示

```tsx
import React from 'react';
import { utils } from '@hemi-component/utils';
import { Input, Button, message } from 'antd';
const { copyCot } = utils;
const Test = () => {
  const copy = () => {
    if (copyCot('这是复制的内容')) {
      message.success('复制成功');
    } else {
      message.error('复制失败');
    }
  };
  return (
    <>
      <div style={{ display: 'flex' }}>
        <Input placeholder="Ctrl+V粘贴看看" />
        <Button onClick={() => copy()}>一键复制</Button>
      </div>
    </>
  );
};
export default Test;
```
