---
title: ExtractImage 图片截取
nav:
  path: /basics
group:
  title: 图片组件
  path: /basic
---

# ExtractImage 图片截取组件

- 根据 x,y,width,height 把范围内的图片截取出来

## 代码演示

```tsx
import React from 'react';
import { ExtractImage } from '@hemi-component/basics';
import { Form, Input, Button } from 'antd';

export default () => {
  const imgUrl = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
  return (
    <>
      原始图片
      <div>
        <img src={imgUrl} width={100} />
      </div>
      图片，从坐标x:10,y:10,截取高度50px，宽度100px
      <div
        style={{
          height: '150px',
          width: '150px',
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ExtractImage x={10} y={10} width={100} height={50} src={imgUrl} />
      </div>
      图片，从坐标x:10,y:10,截取高度100px，宽度50px
      <div
        style={{
          height: '150px',
          width: '150px',
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ExtractImage x={10} y={10} width={50} height={100} src={imgUrl} />
      </div>
    </>
  );
};
```

<API src='./index.tsx'></API>
