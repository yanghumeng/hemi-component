import React, { useRef, useState, useEffect, HTMLProps, Fragment } from 'react';
import { Tooltip, TooltipProps } from 'antd';

const getTextLength = (str: string) => {
  let realLength = 0;
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) realLength += 1;
    else realLength += 2;
  }
  return realLength;
};
const codeSlice = (str: string, num: number) => {
  let realLength = 0;
  let code = '';
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1;
    } else {
      realLength += 2;
    }
    if (realLength < num) {
      code += str[i];
    } else {
      return code;
    }
  }
  return code;
};
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
const TextEllipsis = ({
  value,
  style = {},
  useCss = true,
  line = 1,
  showTooltip = true,
  tooltipProps = {},
}: IProp) => {
  const parentEle = useRef<HTMLDivElement>(null);
  const [text, setText] = useState(value);
  const [visible, setVisible] = useState(false);
  const [isUseCss, setIsUseCss] = useState(true);

  const delay = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 0);
    });
  };

  const getHeightInfo = () => {
    const { clientHeight, scrollHeight } = (parentEle.current || {}) as HTMLDivElement;
    return { clientHeight, scrollHeight };
  };

  // 二分法取
  const adjustValue = async () => {
    if (text.length === 0) return;
    const { clientHeight, scrollHeight } = getHeightInfo();
    if (isUseCss) {
      if (clientHeight < scrollHeight) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      return;
    }
    if (clientHeight >= scrollHeight) {
      setVisible(true);
      return;
    }
    let start = 0;
    let end = getTextLength(text) - 1;
    while (start <= end) {
      const mid = ~~((start + end) / 2);
      const textSlice = codeSlice(text, mid);
      setText(textSlice);
      await delay(); // 等待渲染完成再判断
      const { clientHeight, scrollHeight } = getHeightInfo();
      if (clientHeight < scrollHeight) {
        setText(textSlice.slice(0, -1));
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
    setVisible(true);
  };

  useEffect(() => {
    setText(value);
    adjustValue();
  }, [value]);
  useEffect(() => {
    if (!!((useCss && window.CSS && window.CSS.supports) || false)) {
      let supportsFlex = CSS.supports('display', '-webkit-box');
      supportsFlex ? (useCss = true) : (useCss = false);
      setIsUseCss(useCss);
    } else {
      setIsUseCss(false);
    }
  }, []);

  const styleByCss: React.CSSProperties = {
    ...style,
    display: '-webkit-box',
    WebkitLineClamp: line,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };
  const Style: any = {
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    wordBreak: 'break-all',
    alignItems: 'center',
    ...style,
    visibility: visible ? '' : 'hidden',
  };

  const isExceed = value.length > text.length;

  const components = {
    Tooltip,
    Fragment,
  };

  const AutoTooltip = components[isExceed && showTooltip ? 'Tooltip' : 'Fragment'];

  return (
    <div ref={parentEle} style={isUseCss ? styleByCss : Style}>
      {isUseCss ? (
        <Tooltip title={visible && showTooltip ? value : ''}>{value}</Tooltip>
      ) : (
        <AutoTooltip
          {...(isExceed && showTooltip ? { title: value, ...tooltipProps } : ({} as any))}
        >
          {text}
          {isExceed && '...'}
        </AutoTooltip>
      )}
    </div>
  );
};

export default TextEllipsis;
