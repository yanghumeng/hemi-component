// UseTable
import React, { useEffect, useState } from 'react';
import { Card, FormInstance, Table, TableProps } from 'antd';
import SearchForm from '../SearchForm';
import './index.less';

/**
 * @params {()=>Promise.resolve/Promise.reject} request 异步请求
 * @params {TableTypes} tableProps table属性
 * @params {clickEvent} onClickNewBtn 新增按钮事件
 * @params {boolean} showNewBtn 展示新增按钮
 * @params {boolean} disableNewBtn 禁用新增按钮
 * @params {false | SearchTypes} search 禁用新增按钮
 */
interface tableProps extends TableProps<any> {
  formRef?: FormInstance;
  rowSelection?: {
    selectedList?: Array<any>;
    onChange?: (selectedRowKeys: Array<any>, selectedRows: Array<any>) => void;
  };
  request: (params?: any, sorter?: any) => Promise<any>;
  isSearch?: boolean;
  pagination?: any;
  expressionAt?: any;
  toolBarRender?: React.ReactNode[];
}

const BasicTable = (props: tableProps) => {
  const { request, pagination, expressionAt, toolBarRender, isSearch = true } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [sorter, setSorter] = useState({});
  const [params, setParams] = useState({ current: 1, pageSize: 50 });
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const getData = () => {
    setLoading(true);
    request(params, sorter)
      .then((res: any) => {
        setTotal(res?.total || 0);
        setData(res?.data || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // 分页默认逻辑，可修改
  const paginationProps = {
    // showQuickJumper: true,
    showSizeChanger: true,
    total,
    showTotal: () => `共${total}条记录`,
    ...params,
  };
  const handleChangeTable = (pagination: any, _: any, sorter: any) => {
    setParams({ current: pagination.current, pageSize: pagination.pageSize });
    setSorter(sorter);
  };
  const handleSearch = (value: any) => {
    let temp = { ...params, ...value };
    Object.keys(temp).forEach((item) => {
      if (!temp[item]) delete temp[item];
    });
    setParams(temp);
  };
  useEffect(() => {
    setSelectedRowKeys(props?.rowSelection?.selectedList || []);
  }, []);

  useEffect(() => {
    getData();
  }, [params]);
  const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
    props?.rowSelection?.onChange?.(newSelectedRowKeys, selectedRows);
  };
  const rowSelectionS = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <Card>
      {isSearch && (
        <SearchForm
          formRef={props?.formRef}
          getData={handleSearch}
          columns={expressionAt?.columns}
        />
      )}
      {toolBarRender}
      <Table
        rowKey={props?.rowKey}
        loading={loading}
        rowSelection={props?.rowSelection && rowSelectionS}
        /* 通过新申明将默认项覆盖 */
        style={{ marginTop: 20 }}
        dataSource={data}
        pagination={{ ...paginationProps, ...pagination }}
        /* 放最后方便对上面的props覆盖 */
        {...expressionAt}
        onChange={handleChangeTable}
      />
    </Card>
  );
};

// 添加默认值
// BasicTable.defaultProps = {
//   showNewBtn: true,
//   disableNewBtn: false,
//   search: true,
// };

export default BasicTable;
