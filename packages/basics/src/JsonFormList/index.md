---
title: JsonFormList 动态增加/删除表单
group:
  title: 基础组件
  path: /basic
nav:
  title: 组件库
  path: /basics
  order: 2
---

# JsonFormList

表单组件

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
      customRender: <InputNumber style={{ width: '100%' }} />,
      rules: [{ required: false }],
    },
  ];
  return (
    <>
      <Form
        form={form}
        labelWrap
        name="dynamic_form_nest_item"
        initialValues={{ jsonformlist: [{ start: '10' }] }}
        onFinish={onFinish}
        {...formItemLayoutWithOutLabel}
        autoComplete="off"
      >
        <JsonFormList name="jsonformlist" initValues={initValues}></JsonFormList>
        <Form.Item>
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
