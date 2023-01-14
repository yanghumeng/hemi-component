---
title: InputUploadMul 剪切板上传图片(支持多张)
nav:
  path: /basics
group:
  title: 上传组件
  path: /upload
---

# InputUploadMul 剪切板上传图片(支持多张)

- `req`关键词是必填,返回一个 `promise`，具体下列参考例子

### 注意:

- `fileList`是回显图片列表，res 值是图片的结果数据，格式：
  ```json
  fileList={[
            {
              url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              res: "结果数据",
            }
          ]}
  ```
- 接口对接的格式：判断图片上传成功的是如下格式：

  ```json
  //根据res属性的f值是否大于0来判断是否上传成功，大于0则将对象res返回，反之则提示失败
    res: { "f": "大于0", "m": "信息", "d": "数据", "e": "其他信息" }
  ```

## 代码演示

```tsx
import React from 'react';
import { InputUploadMul } from '@hemi-component/basics';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

const request = (params?: object): Promise<string> => {
  return axios.post('https://xxx.com/upload', params, {
    'Content-type': 'multipart/form-data',
  });
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
        <InputUploadMul req={request} callback={onChange} />
      </Form.Item>
      <Form.Item label="上传多张" name="mul">
        <InputUploadMul
          len={2}
          fileList={[
            {
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              res: { f: '1', m: '信息', d: '数据', e: '其他信息' },
            },
          ]}
          inputStyle={{ width: '500px' }}
          req={request}
          callback={onChange}
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
