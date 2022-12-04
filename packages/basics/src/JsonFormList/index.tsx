import { Form, Input, Button, Row, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';

interface FormItemProps {
  type?: string;
  name: string;
  label: string;
  initValue?: string;
  rules?: {}[];
  customRender?: React.ReactNode;
}

interface TypeProps {
  /**初始化表单项，默认值[] */
  initValues: FormItemProps[];
  /**formlist表单项的name */
  name: string;
  /**自定义添加按钮标题 */
  title?: string;
  /**外层样式 */
  style?: React.CSSProperties;
  /**自定义添加项,接收一个函数参数，返回这个函数，函数用法与`FormList`的add函数一致 */
  customAdd?: (param: any) => React.MouseEventHandler;
  /**布局 */
  layout?: object;
  /**保留的项数 */
  itemNumber?: number;
}

const JsonFormList = (props: TypeProps) => {
  const { initValues = [], name, title, style = {}, layout = {}, itemNumber = 0 } = props;

  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((field, index) => (
            <div style={style}>
              <Row key={field.key} wrap={false}>
                <Col flex="auto">
                  {initValues.map((item, index) => (
                    <Form.Item
                      {...field}
                      label={item.label}
                      name={[field.name, item.name]}
                      rules={item?.rules}
                      key={index}
                      initialValue={item.initValue}
                      {...layout}
                    >
                      {item.type == 'custom' ? (
                        item.customRender
                      ) : (
                        <Input placeholder={`请输入${item.label}`} />
                      )}
                    </Form.Item>
                  ))}
                </Col>
                <Col flex="40px">
                  {index + 1 > itemNumber ? (
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
                  ) : null}
                </Col>
              </Row>
            </div>
          ))}

          <Row>
            <Button
              type="dashed"
              onClick={(props?.customAdd && (() => props.customAdd?.(add))) || (() => add())}
              block
              icon={<PlusOutlined />}
            >
              {title || '添加'}
            </Button>
          </Row>
        </>
      )}
    </Form.List>
  );
};

export default JsonFormList;
