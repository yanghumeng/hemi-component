import React, { ReactNode } from 'react';
import { Descriptions, DescriptionsProps, Input, Form, FormItemProps, Row, Col } from 'antd';
import styleScoped from './index.less';

interface DescribeItemProps extends FormItemProps {
  type?: string;
  customRender?: ReactNode;
}
interface DescribeProps extends DescriptionsProps {
  itemList?: DescribeItemProps[];
  extraComponents?: ReactNode;
}
const SchemaDescribe = (props: DescribeProps) => {
  const { itemList, extraComponents } = props;
  return (
    <div>
      <Row className={styleScoped['antrow']} style={props?.style}>
        <Col flex="auto">
          <Descriptions size="small" {...props} style={{}}>
            {itemList?.map((item, index) => {
              return (
                <Descriptions.Item key={index}>
                  <Form.Item
                    className={styleScoped['antformitem']}
                    name={item.name}
                    label={item.label}
                    rules={item?.rules}
                  >
                    {item?.customRender ||
                      (item?.type == 'text' ? (
                        <Input bordered={false} readOnly={true}></Input>
                      ) : (
                        <Input placeholder={`请输入${item.label}`}></Input>
                      ))}
                  </Form.Item>
                </Descriptions.Item>
              );
            })}
          </Descriptions>
        </Col>
        {extraComponents && (
          <Col flex="100px" style={{ textAlign: 'end' }}>
            {extraComponents}
          </Col>
        )}
      </Row>
    </div>
  );
};

export default SchemaDescribe;
