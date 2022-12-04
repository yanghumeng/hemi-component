---
title: 获取路由参数 | parseParam
nav:
  path: /utils
group:
  title: 自定义方法
  path: /function
---

路由参数提取 parseParam(url: string) 这里将方法返回的对象转化为 json 格式了

```tsx
import React from 'react';
import { utils } from '@hemi-component/utils';
const { getUrlParams } = utils;
const Test = () => {
  return (
    <>
      <div>
        参数全部提取：{JSON.stringify(getUrlParams('http://xxx?param1=hemi&param2=component'))}
      </div>
      <div>
        参数param1提取：
        {JSON.stringify(getUrlParams('http://xxx?param1=hemi&param2=component', 'param1'))}
      </div>
    </>
  );
};
export default Test;
```

| 属性名 | 描述     | 类型       | 默认值   |
| ------ | -------- | ---------- | -------- |
| url    | 路由     | `'string'` |
| key    | 指定参数 | `'string'` |
