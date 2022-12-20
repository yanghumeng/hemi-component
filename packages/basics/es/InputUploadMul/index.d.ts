import React from 'react';
import { UploadFile } from 'antd';
import { UploadProps } from 'antd/lib/upload';
export interface InputUploadProps extends UploadProps {
    /**输入框样式 */
    inputStyle?: React.CSSProperties;
    /** input上传自定义接口  */
    inputRequest: (param?: object) => Promise<any>;
    /** 图片样式 */
    imgStyle?: React.CSSProperties;
    /** 可控数量,默认是上传一个*/
    len?: number;
    /**图片回显 */
    fileList?: Array<UploadFile>;
    /**上传控件的显示标题 */
    title?: string | React.ReactNode;
    /**预览框的宽度 */
    modalWidth?: number;
}
export default function UploadPicture(props: InputUploadProps & UploadProps): JSX.Element;
