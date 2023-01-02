---
title: DraggableModal 移动弹窗
nav:
  path: /basics
group:
  title: 基础组件
  path: /basic
---

```tsx
import React, { useState } from 'react'; // import { // SelectTransferModal, // } from '../../../../src';
import { DraggableModal } from '@hemi-component/basics';
import { Button } from 'antd';

export default () => {
  const [visible, setVisible] = useState(false);
  const [visibleM, setVisibleM] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        固定弹窗
      </Button>
      <Button
        onClick={() => {
          setVisibleM(true);
        }}
      >
        移动弹窗
      </Button>
      <DraggableModal
        title="固定弹窗"
        open={visible}
        onCancel={() => setVisible(false)}
      ></DraggableModal>
      <DraggableModal
        title="移动弹窗"
        draggable={true}
        open={visibleM}
        onCancel={() => setVisibleM(false)}
      ></DraggableModal>
    </>
  );
};
```
