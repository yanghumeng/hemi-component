// SearchForm
import React, { useState } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

const FormItem = Form.Item;

const SearchForm = (props: any) => {
  const [paramExpand, setParamExpand] = useState(false);
  const { getData, columns, linenum = 2 } = props;
  const [form] = props?.formRef || Form.useForm();
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const setExpand = (expand: any) => {
    setParamExpand(expand);
  };

  const handleSearch = (value?: any) => {
    form.validateFields().then((values: any) => {
      getData({ ...values, ...value });
    });
  };

  // 查询重置
  const handleFormReset = () => {
    form.resetFields();
    handleSearch({ current: 1 });
  };

  // 渲染search表单项
  const renderFormItem = () => {
    return (
      <>
        {columns
          ?.filter((item: any) => !item?.hideSearch)
          ?.map((item: any, index: number) => {
            const { hideSearch = false } = item;
            if (item?.renderSearchItem) {
              return (
                <Col md={6} sm={24} key={index}>
                  <FormItem label={item?.searchTitle || item?.title} name={item?.dataIndex}>
                    {(item?.searchIndex || item?.dataIndex) && item?.renderSearchItem()}
                  </FormItem>
                </Col>
              );
            }
            return (
              hideSearch || (
                <Col md={6} sm={24} key={index}>
                  <FormItem label={item?.searchTitle || item?.title} name={item?.dataIndex}>
                    {(item?.searchIndex || item?.dataIndex) && (
                      <Input placeholder={item?.placeholder || '请输入'} autoComplete="off" />
                    )}
                  </FormItem>
                </Col>
              )
            );
          })}
      </>
    );
  };

  return (
    <Form form={form} {...formItemLayout} onFinish={handleSearch}>
      <Row gutter={6}>
        {/* 展开前默认取n项，展开后显示全部。通过children进行dom渲染 */}
        {paramExpand
          ? renderFormItem()?.props?.children.map((item: any) => item)
          : renderFormItem()
              ?.props?.children?.slice(0, linenum * 4 - 1)
              ?.map((item: any) => item)}
        <Col
          md={columns.length <= linenum * 4 - 1 || paramExpand ? 24 - (columns.length % 4) * 6 : 6}
          sm={24}
        >
          <div style={{ display: 'flex', justifyContent: 'end', lineHeight: '40px' }}>
            {renderFormItem()?.props?.children.length > linenum * 4 - 1 && (
              <a
                style={{ marginRight: '20px' }}
                onClick={() => {
                  setExpand(!paramExpand);
                }}
              >
                {paramExpand ? <CaretUpOutlined /> : <CaretDownOutlined />}
                {paramExpand ? '收起' : '展开'}
              </a>
            )}
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8, marginRight: 8 }} onClick={handleFormReset}>
              重置
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;
