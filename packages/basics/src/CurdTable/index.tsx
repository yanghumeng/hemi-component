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
  /**
   * @description 超出指定行数出现更多
   * @default 2
   */
  linenum?: number;
  /**
   * @description Form实例
   */
  formRef?: FormInstance;
  /**
   * @description 多选操作
   */
  rowSelection?: {
    selectedList?: Array<any>;
    onChange?: (selectedRowKeys: Array<any>, selectedRows: Array<any>) => void;
  };
  /**
   * @description 请求地址
   */
  request: (params?: any, sorter?: any) => Promise<any>;
  /**
   * @description 是否展示筛选栏
   * @default true
   */
  isSearch?: boolean;
  /**
   * @description 分页配置
   */
  pagination?: any;
  /**
   * @description 表格配置
   */
  expressionAt?: any;
  /**
   * @description 工具栏
   */
  toolBarRender?: React.ReactNode[];
}

const CurdTable = (props: tableProps) => {
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
          linenum={props?.linenum}
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
        columns={expressionAt.columns.filter((item: any) => !item?.hideTable)}
        onChange={handleChangeTable}
      />
    </Card>
  );
};

export default CurdTable;
