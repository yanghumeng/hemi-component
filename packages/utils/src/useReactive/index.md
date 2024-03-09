---
title: 数据响应式 | useReactive
nav:
  path: /utils
group:
  title: 自定义hook
  path: /hook
---

#### useReactive

数据响应式的操作体验，定义数据状态不需要写 useState，直接修改属性即可刷新视图

```tsx
import React, { useState } from 'react';
import { useReactive } from '@hemi-component/utils';
const Test = () => {
  const state = useReactive({
    count: 0,
    user: { name: 'hemi' },
    obj: { obj2: { obj3: [1, 2, 3] } },
  });
  const [count, setCount] = useState(0);

  const handleClick = () => {
    state.count += 1;
  };
  const handleUseStateClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <button onClick={handleClick}>Increase</button>
      <button onClick={handleUseStateClick}>useState Increase</button>
      <p>Count: {state.count}</p>
      <p>useState Count: {count}</p>
      <p style={{ marginTop: 20 }}> state.user.name: {state.user.name}</p>
      <input onChange={(e) => (state.user.name = e.target.value)} />
      <p style={{ marginTop: 20 }}> state.user.name: {state.obj.obj2.obj3[1]}</p>
      <input onChange={(e) => (state.obj.obj2.obj3[1] = e.target.value)} />
    </div>
  );
};
export default Test;
```

| 属性         | 说明           | 类型                | 默认值 |
| :----------- | :------------- | :------------------ | :----- |
| initialState | 当前的数据对象 | Record<string, any> | 必传   |
