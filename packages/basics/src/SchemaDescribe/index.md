---
title: SchemaDescribe 描述
group:
  path: /basic
nav:
  title: 基础组件
  path: /basics
  order: 2
---

# SchemaDescribe 描述

- 对描述列表传入一个 Json 格式的数组初始化

## 注意

- `type`属性值为 text 值时表示为纯文本展示，没有 `type` 属性时默认为 input 组件
- 其他额外属性可以参考 [antdesign](https://4x-ant-design.antgroup.com/components/descriptions-cn) 官网的 Descriptions 组件 [Descriptions](https://4x-ant-design.antgroup.com/components/descriptions-cn/#API)API

## 代码演示

```tsx
import React, { useState, useEffect } from 'react';
import { Form, Button, InputNumber, Image } from 'antd';
import { SchemaDescribe } from '@hemi-component/basics';
export default () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const itemList = [
    {
      type: 'text',
      name: 'first',
      label: '第一个',
    },
    {
      name: 'th',
      label: '默认输入框',
    },
    {
      name: 'th',
      label: '自定义组件',
      rules: [{ required: true, message: '字段必填' }],
      customRender: <InputNumber placeholder="请输入" style={{ width: '100%' }} />,
    },
  ];
  useEffect(() => {
    form.setFieldsValue({ first: '0' });
  }, []);
  const onFinish = (value) => {
    console.log(value);
  };
  return (
    <>
      <Form form={form} size="small" onFinish={onFinish}>
        <div>当有额外组件</div>
        <SchemaDescribe
          style={{ background: '#eee' }}
          itemList={itemList}
          column={2}
          extraComponents={
            <Button type="link" onClick={() => setVisible(true)}>
              查看图片
            </Button>
          }
        />
        <div>当无额外组件</div>
        <SchemaDescribe style={{ background: '#eee' }} itemList={itemList} column={2} />
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Image
        width={200}
        style={{ display: 'none' }}
        src="https://dm-img-test.duomai.com/20220909174300_m6ke0676so.jpg"
        preview={{
          visible,
          src: 'https://dm-img-test.duomai.com/20220909174300_m6ke0676so.jpg',
          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
      />
    </>
  );
};
```

## API

### DescribeProps

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| style | 整个组件样式 | `CSSProperties` | `{}` |
| itemList | 描述列表的项数组 | [DescribeItemProps](./schema-describe#describeitemprops)[] | `[]` |
| extraComponents | 额外组件 | `ReactNode` | 空 |

### DescribeItemProps

| 属性名       | 描述             | 类型         | 默认值 |
| ------------ | ---------------- | ------------ | ------ |
| type         | 列表项的类型     | `text`或不传 | 空     |
| customRender | 表单的自定义组件 | `ReactNode`  | 空     |
