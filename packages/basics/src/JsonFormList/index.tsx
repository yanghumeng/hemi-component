import { Form, Input, Button, Row, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';

const initRules = [{ required: true, message: '字段必填！' }];

interface FormItemProps {
  type: string;
  name: string;
  label: string;
  initValue: string;
  rules: {}[];
}

interface TypeProps {
  /**初始化list */
  initValues: FormItemProps[];
  /**表单项name */
  name: string;
  /**自定义添加文案 */
  title?: string;
}

const JsonFormList = (props: TypeProps) => {
  const { initValues = [], name, title } = props;

  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((field) => (
            <Row>
              <Col span={22}>
                {initValues.map((item, index) => (
                  <Form.Item
                    {...field}
                    label={item.label}
                    name={[field.name, item.name]}
                    rules={item.rules || initRules}
                    key={index}
                    initialValue={item.initValue}
                  >
                    {item.type === 'text' ? item.initValue : <Input />}
                  </Form.Item>
                ))}
              </Col>
              <Col span={2}>
                <MinusCircleOutlined
                  style={{
                    fontSize: '20px',
                    position: 'absolute',
                    bottom: '30px',
                    marginLeft: '10px',
                    color: 'red',
                  }}
                  onClick={() => remove(field.name)}
                />
              </Col>
            </Row>
          ))}
          <Row>
            <Col span={20} offset="2">
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                {title || '添加'}
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Form.List>
  );
};

export default JsonFormList;
