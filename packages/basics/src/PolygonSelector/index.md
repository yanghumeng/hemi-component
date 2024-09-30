---
title: PolygonSelector 标注组件
nav:
  path: /basics
group:
  title: 基础组件
  path: /basic
---

```tsx
import React, { useState } from 'react'; // import { // SelectTransferModal, // } from '../../../../src';
import { PolygonSelector } from '@hemi-component/basics';
import { Button } from 'antd';

export default () => {
  const [points, setPoints] = useState<any>([]);
  const [action, setAction] = useState<any>('mark');
  const imgUrl = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
  return (
    <>
      <button onClick={() => setAction('mark')}>mark</button>
      <button onClick={() => setAction('menu')}>menu</button>
      <div style={{ width: '800px', height: '500px', background: '#000' }}>
        <PolygonSelector
          polygons={points}
          onChange={(value) => {
            console.log(value);
            setPoints(value);
          }}
          imageSrc={imgUrl}
          actionType={action}
          shapes={[
            {
              type: 'line',
              points: [
                [10, 10],
                [100, 100],
              ],
              color: '#FF0000',
              direction: 'clockwise',
            },
            {
              type: 'line',
              points: [
                [50, 150],
                [200, 150],
              ],
              color: '#0000FF',
            }, // 这条线不会有箭头
            {
              type: 'polygon',
              points: [
                [50, 50],
                [100, 50],
                [100, 100],
                [50, 100],
              ],
              color: '#00FF00',
            },
          ]}
        />
      </div>
    </>
  );
};
```
