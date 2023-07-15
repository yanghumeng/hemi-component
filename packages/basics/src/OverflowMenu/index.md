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
import { Button, Tag } from 'antd';
import { OverflowMenu } from '@hemi-component/basics';

export default () => {
  const [items, setItems] = useState([
    { name: 'button1' },
    { name: 'button2' },
    { name: 'button3' },
    { name: 'button4' },
    { name: 'button5' },
  ]);
  function handleItemClick(item) {
    console.log(item);
  }
  return (
    <div>
      <OverflowMenu
        tags={items}
        renderTag={(item) => {
          return <Tag>{item.name}</Tag>;
        }}
      ></OverflowMenu>
      <h3>父级div宽度不够完全显示时</h3>
      <div style={{ width: '200px' }}>
        <OverflowMenu
          tags={items}
          onItemClick={handleItemClick}
          renderTag={(item) => {
            return <Tag color="#2db7f5">{item.name}</Tag>;
          }}
          moreClick={(value) => {
            console.log(value);
          }}
        ></OverflowMenu>
      </div>
    </div>
  );
};
```

<API src='./index.tsx'></API>
