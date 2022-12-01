---
title: useSyncState 同步useState
nav:
  path: /utils
group:
  title: 自定义hook
  path: /hooks
---

# useSyncState|同步 useState

## 代码演示

```tsx
import React, { useState } from 'react';
import { useSyncState } from '@hemi-component/utils';
export default () => {
  const [data, setData] = useSyncState(0);
  const [dataT, setDataT] = useState(0);
  const handleAdd = () => {
    let temp = data;
    setData(++temp, (data) => setDataT(data));
  };
  return (
    <div>
      <div>{data}</div>
      <div>{dataT}</div>
      <button onClick={handleAdd}>add</button>
    </div>
  );
};
```
