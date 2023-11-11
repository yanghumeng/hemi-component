---
title: OverflowMenu 超出菜单
nav:
  path: /basics
group:
  title: 基础组件
  path: /basic
---

# OverflowMenu 超出菜单
- 渲染项和超出的数据渲染样式都可以自定义更加灵活
- ItagProps的参数key必须传

## 代码演示
### 默认自动计算宽度是否可以全部展示
```tsx
import React, { useState } from 'react';
import { Button, Tag } from 'antd';
import { OverflowMenu } from '@hemi-component/basics';

export default () => {
  const [items, setItems] = useState([
    {key:'1', name: 'button1' },
    {key:'2', name: 'button2' },
    {key:'3', name: 'button3' },
    {key:'4', name: 'button4' },
    {key:'5', name: 'button5' },
  ]);

  return (
    <div>
      <OverflowMenu
        tags={items}
        renderTag={(item) => {
          return <Tag>{item.name}</Tag>;
        }}
      ></OverflowMenu>
      <h3>父级div宽度不够完全显示时</h3>
      <div style={{ width: '200px' }}>
        <OverflowMenu
          tags={items}
          renderTag={(item) => {
            return <Tag color="#2db7f5">{item.name}</Tag>;
          }}
          moreClick={(value) => {
            console.log(value);
          }}
        ></OverflowMenu>
      </div>
    </div>
  );
};
```
### 自定义渲染更多按钮使用Dropdown组件

```tsx
import React, { useState } from 'react';
import { Tag,Dropdown,Menu } from 'antd';
import { OverflowMenu } from '@hemi-component/basics';

export default () => {
  const [items, setItems] = useState([
    {key:'1', name: 'button1' },
    {key:'2', name: 'button2' },
    {key:'3', name: 'button3' },
    {key:'4', name: 'button4' },
    {key:'5', name: 'button5' },
  ]);

  return (
    <div>
      <div style={{ width: '200px' }}>
        <OverflowMenu
          tags={items}
          renderTag={(item) => {
            return <Tag color="#2db7f5">{item.name}</Tag>;
          }}
          renderMore={(value) => {
            const arr=value.map((item,index)=>{return {key:index,label:item.name}})
            const menu = (
  <Menu  items={arr}></Menu>
);
            
            return(<Dropdown overlay={menu}>
              <a>Hover me</a>
            </Dropdown>)
          }}
        ></OverflowMenu>
      </div>
    </div>
  );
};
```
<API src='./index.tsx'></API>
