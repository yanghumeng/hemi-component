import React from 'react';
interface FormItemProps {
    type?: string;
    name: string;
    label: string;
    initValue?: string;
    rules?: {}[];
    customRender?: React.ReactNode;
}
interface TypeProps {
    /**初始化表单项，默认值[] */
    initValues: FormItemProps[];
    /**formlist表单项的name */
    name: string;
    /**自定义添加按钮标题 */
    title?: string;
    /**外层样式 */
    style?: React.CSSProperties;
    /**自定义添加项,接收一个函数参数，返回这个函数，函数用法与`FormList`的add函数一致 */
    customAdd?: (param: any) => React.MouseEventHandler;
    /**布局 */
    layout?: object;
    /**保留的项数 */
    itemNumber?: number;
}
declare const JsonFormList: (props: TypeProps) => JSX.Element;
export default JsonFormList;
