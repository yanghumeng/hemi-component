---
title: Describe 描述
group:
  path: /basic
nav:
  title: 基础组件
  path: /basics
  order: 2
---

```tsx
import React, { useState, useEffect } from 'react';
import { Form, Button, InputNumber, Image } from 'antd';
import { Describe } from '@hemi-component/basics';
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
      type: 'text',
      name: 'sen',
      label: '第二个',
    },
    {
      type: 'text',
      name: 'th',
      label: '第三个',
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
        <Describe
          style={{ background: '#eee' }}
          itemList={itemList}
          column={2}
          extra={
            <Button type="link" onClick={() => setVisible(true)}>
              查看图片
            </Button>
          }
        />
        <div>当无额外组件</div>
        <Describe style={{ background: '#eee' }} itemList={itemList} column={2} />
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
