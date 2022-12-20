import { ReactNode } from 'react';
import { DescriptionsProps, FormItemProps } from 'antd';
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
declare const SchemaDescribe: (props: DescribeProps) => JSX.Element;
export default SchemaDescribe;
