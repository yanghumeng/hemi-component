---
title: JsonFormList 动态增加/删除表单
nav:
  path: /basics
group:
  title: 基础组件
  path: /basic
---

# JsonFormList 动态增加/删除表单

动态增加/删除表单组件

## 注意

- `customAdd`属性可以自定义添加项时的逻辑处理，具体用法可以参考示例
- `FormItemProps`中的`customRender`属性可以是用户自定义的组件，可以参考示例代码

## 代码演示

```tsx
import React from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import { JsonFormList } from '@hemi-component/basics';
export default () => {
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      xs: 24,
      sm: 4,
      md: 4,
    },
    wrapperCol: {
      xs: 24,
      sm: 20,
      md: 20,
    },
  };
  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  const initValues = [
    {
      type: 'input',
      name: 'start',
      label: '最小值',
      rules: [{ required: true, message: '字段必填' }],
    },
    {
      type: 'custom',
      name: 'yhkh',
      label: '用户银行卡',
      customRender: <InputNumber placeholder="请输入" style={{ width: '100%' }} />,
    },
  ];
  return (
    <>
      <Form
        form={form}
        labelWrap
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        {...formItemLayout}
        autoComplete="off"
      >
        <Form.Item label="默认项" colon={false}>
          <JsonFormList
            name="jsonlist"
            initValues={initValues}
            style={{ padding: '10px', paddingBottom: '0', backgroundColor: '#f5f5f5' }}
            layout={formItemLayout}
          ></JsonFormList>
        </Form.Item>
        <Form.Item label="自定义添加项" colon={false}>
          <JsonFormList
            name="jsonformlist"
            initValues={initValues}
            layout={formItemLayout}
            customAdd={(add) => {
              return add({ yhkh: '123' });
            }}
            itemNumber={1}
          ></JsonFormList>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
```

<API src="./index.tsx"></API>

### FormItemProps

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 组件类型`custom`或者空，当`type=custom`时为自定义组件，为空时默认 Input 组件 | `string` | 空 |
| name | Form.Item 的 name | `string` | `必选` |
| label | Form.Item 的标题 | `string` | `必选` |
| initValue | 初始值 | `string` | 空 |
| rules | 校验规则 | `{}[]` | 不校验 |
| customRender | 自定义 Form.Item 的组件 | `ReactNode` | 空 |
