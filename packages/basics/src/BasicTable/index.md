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
import { Select } from 'antd';
import { BasicTable } from '@hemi-component/basics';

const { Option } = Select;
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
      renderSearchItem: () => {
        // 自定义搜索fromItem
        return (
          <Select>
            <Option value="1">s</Option>
            <Option value="2">2</Option>
          </Select>
        );
      },
    },
    {
      title: '用户id',
      dataIndex: 'userId',
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
      request={async (params, sorter) => {
        console.log(params, sorter);
        await sleep(2);
        return Promise.resolve({ total: 100, data: [{}, {}, {}, {}, {}, {}] });
      }}
      tableProps={{
        columns,
        bordered: true,
        paginationProps: { pageSizeOptions: ['2', '10'], size: 'small' },
      }}
    />
  );
};

export default Demo;
```
