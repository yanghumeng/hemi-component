---
title: LenovoSearch 超出菜单
nav:
  path: /basics
group:
  title: 基础组件
  path: /basic
---

# LenovoSearch 超出菜单

## 代码演示

```tsx
import React, { useState } from 'react';
import { Button, Tag } from 'antd';
import { LenovoSearch } from '@hemi-component/basics';

export default () => {
  const [items, setItems] = useState([
    "{ name: 'button1' }",
    "{ name: 'button2' }",
    "{ name: 'button3' }",
  ]);
  return (
    <div>
      <LenovoSearch />
    </div>
  );
};
```

<API src='./index.tsx'></API>
