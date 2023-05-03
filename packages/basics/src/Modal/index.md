---
title: Modal 弹出框
nav:
  path: /basics
group:
  title: 基础组件
  path: /basic
---

# Modal 弹出框

## 代码演示

```tsx
import React, { useState } from 'react';
import { Button } from 'antd';
import { Modal } from '@hemi-component/basics';

export default () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          console.log(true);
          setVisible(true);
        }}
      >
        open
      </Button>
      <Modal
        title="Modal"
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => {
          setVisible(false);
        }}
      >
        content
      </Modal>
    </>
  );
};
```
