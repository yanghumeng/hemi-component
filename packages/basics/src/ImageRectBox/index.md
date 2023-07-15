---
title: ImageRectBox 图片框选
nav:
  path: /basics
group:
  title: 图片组件
  path: /basic
---

# ImageRectBox 图片区域框选组件

- 根据 x,y,width,height 把范围内的图片截取出来
- 图片，从坐标{ x: 10, y: 10, w: 100, h: 50 } { x: 100, y: 100, w: 100, h: 50 }截取

## 代码演示

```tsx
import React, { useRef } from 'react';
import { ImageRectBox } from '@hemi-component/basics';
import { Form, Input, Button } from 'antd';

export default () => {
  const ref = useRef();
  const ref2 = useRef();
  const rects = [
    { x: 10, y: 10, w: 100, h: 50 },
    { x: 100, y: 100, w: 100, h: 50 },
  ];
  const circles = [
    { x: 100, y: 100, radius: 20 },
    { x: 250, y: 300, radius: 50 },
  ];
  const imgUrl = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
  return (
    <>
      原始图片
      <div>
        <img src={imgUrl} width={100} />
      </div>
      截取
      <div>
        <ImageRectBox rects={rects} imageUrl={imgUrl} width={500} height={300} />
      </div>
      设置线条属性
      <div>
        <ImageRectBox
          rects={rects}
          imageUrl={imgUrl}
          width={500}
          height={300}
          lineStyle={{ width: 2, color: '#2db7f5', mode: 'dashed' }}
        />
      </div>
      设置线框现状圆形
      <div>
        <ImageRectBox
          type="circle"
          circles={circles}
          imageUrl={imgUrl}
          width={500}
          height={300}
          lineStyle={{ width: 2, color: '#2db7f5', mode: 'dashed' }}
        />
      </div>
    </>
  );
};
```

<API src='./index.tsx'></API>
