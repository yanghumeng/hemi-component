---
title: SchemaDescribe 描述
nav:
  path: /basics
group:
  title: 基础组件
  path: /basic
---

# SchemaDescribe 描述

- 对描述列表传入一个 Json 格式的数组初始化

## 注意

- `type`属性值为 input 值时表示为输入框，没有 `type` 属性时默认为文本
- 其他额外属性可以参考 [antdesign](https://4x-ant-design.antgroup.com/components/descriptions-cn) 官网的 Descriptions 组件 [Descriptions](https://4x-ant-design.antgroup.com/components/descriptions-cn/#API)API

## 代码演示

```tsx
import React, { useState, useEffect } from 'react';
import { Form, Button, InputNumber, Image, Select } from 'antd';
import { SchemaDescribe } from '@hemi-component/basics';
export default () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const itemList = [
    {
      name: 'first',
      label: '默认文本',
    },
    {
      name: 'first',
      label: '默认文本',
    },
    {
      name: 'first',
      label: '默认文本',
    },
    {
      name: 'last',
      label: '默认长文本长文本',
    },
  ];
  const customList = [
    {
      type: 'input',
      name: 'th',
      label: '输入框',
    },
    {
      name: 'th2',
      label: '自定义组件',
      rules: [{ required: true, message: '字段必填' }],
      customRender: <InputNumber placeholder="请输入" style={{ width: '100%' }} />,
    },
    {
      name: 'th2',
      label: '选择器',
      customRender: (
        <Select>
          <Select.Option value="1">选项1</Select.Option>
          <Select.Option value="2">选项2</Select.Option>
          <Select.Option value="3">选项3</Select.Option>
        </Select>
      ),
    },
  ];
  useEffect(() => {
    form.setFieldsValue({
      first: '默认文本显示',
      last: '这是一个很长的文本，为了验证最后这是一个很长的文本，为了验证最后一个元素是否独占剩余空间这是一个很长的文本，为了验证最后一个元素是否独占剩余空间一个元素是否独占剩余空间',
    });
  }, []);
  const onFinish = (value) => {
    console.log(value);
  };
  return (
    <>
      <Form form={form} size="small" onFinish={onFinish}>
        <h2>有额外组件</h2>
        <SchemaDescribe
          itemList={itemList}
          extraComponents={
            <Button type="link" onClick={() => setVisible(true)}>
              查看图片
            </Button>
          }
        />
        <br />
        <h2>无额外组件</h2>
        <SchemaDescribe itemList={itemList} />
        <br />

        <h2>有边框</h2>
        <SchemaDescribe bordered itemList={itemList} />
        <br />

        <h2>标题字右对齐</h2>
        <SchemaDescribe labelAlign="right" itemList={itemList} />
        <br />
        <h2>自定义组件</h2>
        <SchemaDescribe labelAlign="right" itemList={customList} />
        <br />
        <h2>最后一个元素充满剩余空间</h2>
        <SchemaDescribe fillLine={true} itemList={itemList} />
      </Form>
      <Image
        width={200}
        style={{ display: 'none' }}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        preview={{
          visible,
          src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
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

### DescribeProps --继承 antdesign 的描述组件其他属性可参考 antd 官网

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| style | 整个组件样式 | `CSSProperties` | `{}` |
| itemList | 描述列表的项数组 | [DescribeItemProps](./schema-describe#describeitemprops)[] | `[]` |
| extraComponents | 额外组件 | `ReactNode` | 空 |
| fillLine | 表示最后一个元素是否充满剩余空间 | `boolean` | `false` |
| labelAlign | 表示 lebal 对齐方式 | `left `或` right` | `left` |

### DescribeItemProps

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 列表项的类型,默认是文本显示，`type`指定为 input 时时输入框 | `input`或不传 | 空 |
| customRender | 表单的自定义组件 | `ReactNode` | 空 |
| span | 跨列 | `number` | 1 |
