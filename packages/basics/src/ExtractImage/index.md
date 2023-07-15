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
import React, { useRef } from 'react';
import { ExtractImage } from '@hemi-component/basics';
import { Form, Input, Button } from 'antd';

export default () => {
  const ref = useRef();
  const ref2 = useRef();
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
          height: '240px',
          width: '240px',
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ExtractImage x={10} y={10} width={50} height={100} src={imgUrl} />
      </div>
      图片超出div大小，从坐标x:10,y:10,截取高度375px，宽度200px
      <div
        style={{
          height: '240px',
          width: '240px',
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        ref={ref}
      >
        <ExtractImage x={10} y={10} width={200} height={375} src={imgUrl} pRef={ref} />
      </div>
      图片超出div大小，从坐标x:10,y:10,截取宽度375px，高度200px
      <div
        style={{
          height: '240px',
          width: '240px',
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        ref={ref2}
      >
        <ExtractImage x={10} y={10} width={375} height={200} src={imgUrl} pRef={ref2} />
      </div>
    </>
  );
};
```

<API src='./index.tsx'></API>
