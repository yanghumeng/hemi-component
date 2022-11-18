---
title: 剪切板上传图片(支持多张) | InputUploadMul
nav:
  path: /basics
group:
  title: 上传组件
  path: /upload
---

## 剪切板上传图片(支持多张) | InputUploadMul

Demo:

- `inputRequest`关键词是必填,返回一个 promise，具体下列参考例子

注意:

- `fileList`是回显图片列表，status 值必填（最好为 success），res 值是图片的唯一标识值，格式：
  ```json
  fileList={[
            {
              url: "https://dm-img-test.duomai.com/20220909174300_m6ke0676so.jpg",
              res: "图片标识",
              status: "success",
            }
          ]}
  ```

```tsx
import React from 'react';
import { InputUploadMul } from '@hemi-component/basics';
import { Form, Input, Button } from 'antd';

const request = (params?: object): Promise<string> => {
  return new Promise((resolve,reject)=>{return resolve()})
};
const onChange = (res: any) => {
  console.log(res);
};

export default () => {
  const onSubmit = () => {
    form.validateFields().then((res) => {
      console.log(res);
    });
  };
  const [form] = Form.useForm();
  return (
    <Form name="basic" form={form} autoComplete="off" onFinish={onSubmit}>
      <Form.Item label="上传一张" name="one">
        <InputUploadMul inputRequest={request} onChange={onChange} />
      </Form.Item>
      <Form.Item label="上传2张" name="mul">
        <InputUploadMul
          multiple={true}
          len={2}
          fileList={[
            {
              url: 'https://dm-img-test.duomai.com/20220909174300_m6ke0676so.jpg',
              res: '图片标识',
              status: 'success',
            },
          ]}
          inputStyle={{ width: '500px' }}
          inputRequest={request}
          onChange={onChange}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
```

<API src='./index.tsx'></API>
