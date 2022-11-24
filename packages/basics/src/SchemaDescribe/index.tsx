import React, { ReactNode } from 'react';
import { Descriptions, DescriptionsProps, Input, Form, FormItemProps, Row, Col } from 'antd';
import styleScoped from './index.less';

interface DescribeItem extends FormItemProps {
  type?: string;
  customRender?: any;
}
interface DescribeProps extends DescriptionsProps {
  itemList: DescribeItem[];
  extra?: ReactNode;
}
const SchemaDescribe = (props: DescribeProps) => {
  const { itemList, extra } = props;
  return (
    <div>
      <Row className={styleScoped['antrow']} style={props?.style}>
        <Col flex="auto">
          <Descriptions size="small" title={props?.title} column={props?.column}>
            {itemList.map((item, index) => {
              return (
                <Descriptions.Item key={index}>
                  <Form.Item
                    className={styleScoped['antformitem']}
                    name={item.name}
                    label={item.label}
                    rules={item?.rules}
                  >
                    {item?.customRender || (
                      <Input
                        bordered={item?.type == 'text' ? false : true}
                        readOnly={item?.type == 'text' ? true : false}
                      ></Input>
                    )}
                  </Form.Item>
                </Descriptions.Item>
              );
            })}
          </Descriptions>
        </Col>
        {extra && (
          <Col flex="100px" style={{ textAlign: 'end' }}>
            {extra}
          </Col>
        )}
      </Row>
    </div>
  );
};

export default SchemaDescribe;
