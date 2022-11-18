import React from 'react';
import InputUploadMul from '../index';
import { Form, Input, Button, Checkbox } from 'antd';
import { uRequest } from '@dm-component-next/utils';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
// mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const request = (params?: any): Promise<any> => {
  return uRequest('newgate/newcps/backend/file/upload', {
    prefix: 'http://cps-api.sk8s.cn/',
    method: 'POST',
    data: params,
  });
};

const TestInputUploadMul = (props: any) => {
  const onSubmit = () => {
    form.validateFields().then((res) => {
      console.log(res);
    });
  };
  const [form] = Form.useForm();
  return (
    <Form name="basic" form={form} autoComplete="off" onFinish={onSubmit}>
      <Form.Item label="上传一张" name="one">
        <InputUploadMul
          open={false}
          len={3}
          uploadLink="http://cps-api.sk8s.cn/newgate/newcps/backend/file/upload"
          inputRequest={request}
          onChange={props.onChange}
          fileList={props?.fileList}
        />
      </Form.Item>
    </Form>
  );
};
jest.mock('schema-page', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@dm-component-next/utils', () => ({
  __esModule: true,
  default: jest.fn(),
  request: jest.fn(async () => ({
    data: {
      f: 1,
      m: '',
    },
  })),
  uRequest: jest.fn(async () => ({
    data: {
      f: 1,
      m: '',
    },
  })),
  utilsRequest: jest.fn(),
  getGlobalVariable: jest.fn(() => ({
    BUSINESS_API_REQUESET: jest.fn(async () => ({
      data: {
        f: 1,
        m: '',
      },
    })),
  })),
}));
describe('InputUploadMul render', () => {
  render(<TestInputUploadMul />);
  test('显示', () => {
    expect(screen.getByText('上传一张')).toBeInTheDocument();
    expect(screen.getByText('图片上传')).toBeInTheDocument();
  });
});
describe('上传', () => {
  test('上传图片回调', () => {
    const onChange = jest.fn((data) => {
      return data;
    });
    render(<TestInputUploadMul onChange={onChange} fileList={[]} />);
    waitFor(() => {
      expect(onChange).toBeCalled();
      expect(onChange?.mock?.calls?.[0]?.length).toBe(1);
    });
  });
  test('图片回显回调', () => {
    const onChange = jest.fn((data) => {
      return data;
    });
    render(
      <InputUploadMul
        multiple={true}
        len={3}
        inputStyle={{ width: '500px' }}
        open={false}
        fileList={[
          {
            url: 'https://dm-img-test.duomai.com/20220909174300_m6ke0676so.jpg',
            res: '20220909174300_m6ke0676so.jpg',
          },
          {
            url: 'https://dm-img-test.duomai.com/20220909174300_m6ke0676so.jpg',
            res: '20220909174300_m6ke0676so.jpg',
          },
        ]}
        inputRequest={request}
        onChange={onChange}
      />,
    );
    waitFor(() => {
      expect(onChange).toBeCalled();
      expect(onChange?.mock?.calls?.[1][0]?.length).toBe(2);
      expect(onChange?.mock?.calls?.[1][0][0]?.res).toBe(
        '20220909174300_m6ke0676so.jpg',
      );
    });
  });
});
