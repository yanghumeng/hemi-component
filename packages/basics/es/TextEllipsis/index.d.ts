import React, { HTMLProps } from 'react';
import { TooltipProps } from 'antd';
interface IProp extends HTMLProps<HTMLDivElement> {
    /** 文字 */
    value: string;
    /**是否使用CSS实现省略号，默认true */
    useCss?: boolean;
    /**显示的行数，在useCss为true是生效*/
    line?: number;
    /**是否展示文字提示 */
    showTooltip?: boolean;
    /**文字提示样式 */
    tooltipProps?: Omit<TooltipProps, 'title'>;
    /**外部样式 */
    style?: React.CSSProperties;
}
declare const TextEllipsis: ({ value, style, useCss, line, showTooltip, tooltipProps, }: IProp) => JSX.Element;
export default TextEllipsis;
