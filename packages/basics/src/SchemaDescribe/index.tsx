import React, { ReactNode, useEffect, useState } from 'react';
import { Descriptions, DescriptionsProps, Input, Form, FormItemProps, Row, Col } from 'antd';
import styleScoped from './index.less';
import TextArea from 'antd/lib/input/TextArea';

interface DescribeItemProps extends FormItemProps {
  type?: string;
  customRender?: ReactNode;
  span?: number;
}
interface DescribeProps extends DescriptionsProps {
  itemList: DescribeItemProps[];
  extraComponents?: ReactNode;
  fillLine?: boolean;
  labelAlign?: 'right' | 'left';
}
const SchemaDescribe = (props: DescribeProps) => {
  const { itemList, extraComponents, column = 3, fillLine = false, labelAlign = 'left' } = props;

  const labelstyle = labelAlign == 'right' ? { justifyContent: 'flex-end', width: '120px' } : {};
  return (
    <div>
      <Row className={styleScoped['antrow']} style={props?.style}>
        <Col flex="auto">
          <Descriptions size="small" {...props} style={{}}>
            {itemList?.map((item, index) => {
              return (
                <Descriptions.Item
                  span={item?.span}
                  label={
                    item?.rules ? (
                      <>
                        <span className={styleScoped['itemrequired']}>* </span>
                        {item.label}
                      </>
                    ) : (
                      item.label
                    )
                  }
                  key={index}
                  className={styleScoped['antdescriptionsitem']}
                  labelStyle={{ ...labelstyle, ...props?.labelStyle }}
                >
                  <Form.Item
                    className={styleScoped['antformitem']}
                    name={item.name}
                    rules={item?.rules}
                  >
                    {item?.customRender ||
                      (item?.type == 'input' ? (
                        <Input placeholder={`请输入${item.label}`}></Input>
                      ) : (
                        <TextArea autoSize style={{ border: 0, padding: 0 }} />
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
