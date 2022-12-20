import React from 'react';
import { FormInstance, TableProps } from 'antd';
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
declare const CurdTable: (props: tableProps) => JSX.Element;
export default CurdTable;
