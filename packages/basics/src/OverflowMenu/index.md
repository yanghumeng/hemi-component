---
title: OverflowMenu 超出菜单
nav:
  path: /basics
group:
  title: 基础组件
  path: /basic
---

# OverflowMenu 超出菜单

## 代码演示

```tsx
import React, { useState } from 'react';
import { Button } from 'antd';
import { OverflowMenu } from '@hemi-component/basics';

export default () => {
  const [items, setItems] = useState(['button1', 'button2', 'button3', 'button4', 'button5']);
  function handleItemClick(item) {
    console.log(item);
  }
  return (
    <>
      <OverflowMenu items={items} onItemClick={handleItemClick}></OverflowMenu>
    </>
  );
};
```
