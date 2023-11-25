import React, { ReactNode } from 'react';
import { Descriptions, DescriptionsProps, Input, Form, FormItemProps, Row, Col } from 'antd';
import styleScoped from './index.less';
import TextArea from 'antd/lib/input/TextArea';
const PREFIX = 'SchemaDescribe';
export interface DescribeItemProps extends FormItemProps {
  type?: string;
  customRender?: ReactNode;
  span?: number;
}
export interface DescribeProps extends DescriptionsProps {
  itemList: DescribeItemProps[];
  extraComponents?: ReactNode;
  fillLine?: boolean;
  labelAlign?: 'right' | 'left';
}
const SchemaDescribe = (props: DescribeProps) => {
  const { itemList, extraComponents, column = 3, fillLine = false, labelAlign = 'left' } = props;

  const labelstyle = labelAlign == 'right' ? { justifyContent: 'flex-end', width: '120px' } : {};
  return (
    <div className={PREFIX}>
      <Row className={styleScoped['ant-row']} style={props?.style}>
        <Col flex="auto">
          <Descriptions size="small" {...props} style={{}}>
            {itemList?.map((item, index) => {
              return (
                <Descriptions.Item
                  span={item?.span}
                  label={
                    item?.rules ? (
                      <>
                        <span className={styleScoped['item-required']}>* </span>
                        {item.label}
                      </>
                    ) : (
                      item.label
                    )
                  }
                  key={index}
                  className={styleScoped['ant-descriptions-item']}
                  labelStyle={{ ...labelstyle, ...props?.labelStyle }}
                >
                  <Form.Item
                    className={styleScoped['ant-formitem']}
                    name={item.name}
                    rules={item?.rules}
                  >
                    {item?.customRender ||
                      (item?.type == 'input' ? (
                        <Input placeholder={`请输入${item.label}`}></Input>
                      ) : (
                        <TextArea autoSize style={{ border: 0, padding: 0, minHeight: 0 }} />
                      ))}
                  </Form.Item>
                </Descriptions.Item>
              );
            })}
            {itemList.length % parseInt(column + '') == 0 || fillLine ? '' : <div />}
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
