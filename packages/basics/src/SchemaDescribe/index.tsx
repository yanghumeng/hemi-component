import React, { ReactNode, useEffect, useState } from 'react';
import { Descriptions, DescriptionsProps, Input, Form, FormItemProps, Row, Col } from 'antd';
import styleScoped from './index.less';

interface DescribeItemProps extends FormItemProps {
  type?: string;
  customRender?: ReactNode;
  span?: number;
}
interface DescribeProps extends DescriptionsProps {
  itemList: DescribeItemProps[];
  extraComponents?: ReactNode;
  fillLine?: boolean;
}
const SchemaDescribe = (props: DescribeProps) => {
  const { itemList, extraComponents, column = 3, fillLine = false } = props;

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
                        <Input bordered={false} readOnly={true}></Input>
                      ))}
                  </Form.Item>
                </Descriptions.Item>
              );
            })}
            {itemList.length % parseInt(column + '') != 0 && fillLine && <div />}
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
