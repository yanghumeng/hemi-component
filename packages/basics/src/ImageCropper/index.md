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
  const [data, setData] = useState([
    { x: 30, y: 4.51, width: 48, height: 70.53 },
    { x: 0, y: 100, width: 252, height: 1225 },
  ]);
  const imgUrl =
    '"http://10.40.88.180:9900/moss/image/v1/fusion/storage/a3YtZnVzaW9uLzRjNjc2NGJhNDQ5YzAwMDAwNDAwMDY0NWVkYjdfMTY4ODYyMzA5My1iMGQ4YjYwYS05ZDhmLTQxZjctOGZmMi1mZjYzZjM4OTVkODQ="';
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
        <ImageCropper x={10} y={10} width={10} height={50} src={imgUrl} />
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
        <ImageCropper x={10} y={10} width={50} height={100} src={imgUrl} />
      </div>
      图片超出div大小，从坐标x:10,y:10,截取高度375px，宽度200px
      <div
        style={{
          height: '240px',
          width: '240px',
          background: '#000',
        }}
        ref={ref}
      >
        <ImageCropper x={10} y={10} width={200} height={400} src={imgUrl} pRef={ref} />
      </div>
      图片超出div大小，从坐标x:10,y:10,截取宽度375px，高度200px
      <div
        style={{
          height: '240px',
          width: '240px',
          background: '#000',
          position: 'relative',
        }}
        ref={ref2}
      >
        <ImageCropper x={10} y={10} width={400} height={200} src={imgUrl} pRef={ref2} />
      </div>
      测试列表数据
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data.map((item) => {
          return (
            <div
              style={{
                height: '240px',
                width: '340px',
                background: '#000',
                position: 'relative',
              }}
              ref={ref3}
            >
              <ImageCropper
                x={item.x}
                y={item.y}
                width={item.width}
                height={item.height}
                src={imgUrl}
                pRef={ref3}
              />
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
