---
title: 大写金额 | digitUppercase
nav:
  path: /utils
group:
  title: 自定义方法
  path: /function
---

# digitUppercase 描述

## 代码演示

```tsx
import React, { useState } from 'react';
import { utils } from '@hemi-component/utils';
const { digitUppercase } = utils;
export default () => {
  return (
    <>
      数字：
      <div>123456：{digitUppercase(123456)}</div>
      <div>123456.02：{digitUppercase(123456.02)}</div>
      字符串：
      <div>123456：{digitUppercase('123456')}</div>
      <div>123456.02：{digitUppercase('123456.02')}</div>
      负数：
      <div>-123456：{digitUppercase(-123456)}</div>
      <div>-123456.02：{digitUppercase(-123456.02)}</div>
    </>
  );
};
```

| 属性名 | 描述 | 类型     | 默认值   |
| ------ | ---- | -------- | -------- |
| num    | 数字 | `number` |
