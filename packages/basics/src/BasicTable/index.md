---
title: BasicTable 表格
nav:
  path: /basics
group:
  title: 基础组件
  path: /basic
---

## BasicTable 表格

- 包含了自动分页的表格（支持后端分页）

```tsx
import React, { useState } from 'react';
import { Select, DatePicker } from 'antd';
import { BasicTable } from '@hemi-component/basics';

const { Option } = Select;
const { RangePicker } = DatePicker;
async function sleep(n) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, n * 1000),
  );
}
const Demo = (props) => {
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      searchIndex: '自定义字段',
      searchTitle: '自定义头',
      hideTable: true,
      renderSearchItem: () => {
        // 自定义搜索fromItem
        return (
          <Select>
            <Option value="1">选项1</Option>
            <Option value="2">选项2</Option>
          </Select>
        );
      },
    },
    {
      title: '用户',
      dataIndex: 'userName',
      hideTable: true,
    },
    {
      title: '日期',
      dataIndex: 'date',
      renderSearchItem: () => {
        // 自定义搜索fromItem
        return <RangePicker />;
      },
      render: (val) => {
        return <span>起始日期：{val}</span>;
      },
    },
    {
      title: '公司名称',
      dataIndex: 'tenantChineseName',
    },
    {
      title: '用户名',
      dataIndex: 'userName',
    },
  ];

  return (
    <BasicTable
      linenum={2}
      rowKey="id"
      request={async (params, sorter) => {
        console.log(params);
        await sleep(1);
        return Promise.resolve({
          total: 100,
          data: [
            { id: 0, tenantChineseName: 'XXXXXX', userName: '张三1', date: '2022-1-2' },
            { id: 1, tenantChineseName: 'XXXXXX', userName: '张三2', date: '2022-1-2' },
            { id: 2, tenantChineseName: 'XXXXXX', userName: '张三3', date: '2022-1-2' },
            { id: 3, tenantChineseName: 'XXXXXX', userName: '张三4', date: '2022-1-2' },
            { id: 4, tenantChineseName: 'XXXXXX', userName: '张三5', date: '2022-1-2' },
            { id: 5, tenantChineseName: 'XXXXXX', userName: '张三6', date: '2022-1-2' },
          ],
        });
      }}
      rowSelection={{
        onChange: (newSelectedRowKeys: React.Key[], selectedRows: any) => {
          console.log('selectedRowKeys changed: ', newSelectedRowKeys, selectedRows);
        },
      }}
      pagination={{ size: 'small' }}
      expressionAt={{
        columns,
        bordered: true,
      }}
    />
  );
};

export default Demo;
```

<API src='./index.tsx'></API>
