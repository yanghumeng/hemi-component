// UseTable
import React, { useEffect, useState } from 'react';
import { Card, Table } from 'antd';
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
const BasicTable = (props: any) => {
  const { request, tableProps, showNewBtn, search } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [sorter, setSorter] = useState({});
  const [params, setParams] = useState({ current: 1, pageSize: 50 });
  const [total, setTotal] = useState(0);

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
    getData();
  }, [params]);

  return (
    <Card>
      {search && <SearchForm getData={handleSearch} columns={tableProps?.columns} />}
      {showNewBtn}
      <Table
        rowKey={(record) => record.id}
        loading={loading}
        /* 通过新申明将默认项覆盖 */
        pagination={{ ...paginationProps, ...tableProps?.paginationProps }}
        style={{ marginTop: 20 }}
        dataSource={data}
        /* 放最后方便对上面的props覆盖 */
        {...tableProps}
        onChange={handleChangeTable}
      />
    </Card>
  );
};

// 添加默认值
BasicTable.defaultProps = {
  showNewBtn: true,
  disableNewBtn: false,
  search: true,
};

export default BasicTable;
