---
title: JsonFormList 动态增加/删除表单
group:
  path: /basic
nav:
  title: 基础组件
  path: /basics
  order: 2
---

# JsonFormList 动态增加/删除表单

动态增加/删除表单组件

## 代码演示

```tsx
import React from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import { JsonFormList } from '@hemi-component/basics';
export default () => {
  const [form] = Form.useForm();
  const areas = [
    { label: 'Beijing', value: 'Beijing' },
    { label: 'Shanghai', value: 'Shanghai' },
  ];
  const formItemLayoutWithOutLabel = {
    labelCol: {
      xs: 24,
      sm: 8,
      md: 8,
      lg: 8,
    },
    wrapperCol: {
      xs: 24,
      sm: 16,
      md: 16,
      lg: 16,
    },
  };
  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  const handleChange = () => {
    //form.setFieldsValue({ sights: [] });
  };

  const initValues = [
    { type: 'input', name: 'start', label: '最小值' },
    {
      type: 'custom',
      name: 'end',
      label: '用户银行卡号',
      initValue: '',
      customRender: <InputNumber placeholder="请输入" style={{ width: '100%' }} />,
      rules: [{ required: true, message: '字段必填' }],
    },
  ];
  return (
    <>
      <Form
        form={form}
        labelWrap
        name="dynamic_form_nest_item"
        initialValues={{ jsonformlist: [{}] }}
        onFinish={onFinish}
        {...formItemLayoutWithOutLabel}
        autoComplete="off"
      >
        <JsonFormList
          name="jsonformlist"
          initValues={initValues}
          style={{ marginBottom: '10px' }}
        ></JsonFormList>
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
| customRender | 自定义组件 | `ReactNode` | 空 |
