---
title: ImageCropper 图片截取
nav:
  path: /basics
group:
  title: 图片组件
  path: /basic
---

# ImageCropper 图片截取组件

- 根据 x,y,width,height 把范围内的图片截取出来

## 代码演示

```tsx
import React, { useRef, useState } from 'react';
import { ImageCropper } from '@hemi-component/basics';
import { Form, Input, Button } from 'antd';

export default () => {
  const ref = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const [data, setData] = useState([{ x: 30, y: 4.51, width: 650, height: 600.53 }]);
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
        <ImageCropper x={10} y={10} width={100} height={50} imageUrl={imgUrl} />
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
        <ImageCropper x={10} y={10} width={50} height={100} imageUrl={imgUrl} />
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
      >
        <ImageCropper x={10} y={10} width={200} height={400} imageUrl={imgUrl} />
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
      >
        <ImageCropper x={10} y={10} width={400} height={200} imageUrl={imgUrl} />
      </div>
      测试列表数据
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data.map((item) => {
          return (
            <div
              style={{
                height: '240px',
                width: '440px',
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ImageCropper imageUrl={imgUrl} />
            </div>
          );
        })}
        <Button
          onClick={() =>
            setData([
              { x: 85, y: 23.51, width: 148, height: 701.53 },
              { x: 300, y: 80.51, width: 408, height: 110.53 },
            ])
          }
        >
          切换
        </Button>
      </div>
    </>
  );
};
```

<API src='./index.tsx'></API>
