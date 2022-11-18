---
title: TextEllipsis 文本省略
group:
  path: /basic
nav:
  title: 基础组件
  path: /basics
  order: 2
---

# TextEllipsis 多行文本省略

多行文本省略

- 默认：自动检测浏览器是否支持 css3 的文本省略号，使用 css 来实现多行溢出显示省略号；不使用 css，可以设置`useCss`属性为`false`

## 代码演示

```tsx
import React, { useState } from 'react';
import { TextEllipsis } from '@hemi-component/basics';

export default () => {
  const [line, setLine] = useState(1);
  const onChange = (value: number) => {
    setLine(value);
  };
  return (
    <>
      <h2>不使用css3：</h2>
      <div
        style={{
          height: '100px',
          width: `200px`,
          overflow: `hidden`,
          fontSize: 12,
        }}
      >
        <TextEllipsis
          useCss={false}
          value="这是一个长文本这是一个长文本这是一个长文本这是一个长文本这是一个长文本这是一个长文本这是一个长文本"
        />
      </div>
      <hr />
      <h2>使用css3：</h2>
      <h3>显示省略号时：</h3>
      <TextEllipsis
        style={{ width: `200px`, fontSize: 12 }}
        line={2}
        value="这是一个长文本这是一个长文本这是一个长文本这是一个长文本这是一个长文本"
      />
      <h3>无显示省略号时：</h3>
      <TextEllipsis
        style={{ width: `200px`, fontSize: 12 }}
        line={2}
        value="这是一个长文本这是一个长文本这是一个长文本"
      />
    </>
  );
};
```

## API

| 属性名       | 描述                    | 类型            | 默认值 |
| ------------ | ----------------------- | --------------- | ------ |
| value        | 值                      | `string`        | 空     |
| useCss       | 是否使用 CSS 实现省略号 | `boolean`       | `true` |
| line         | 显示的行数              | `number`        | `1`    |
| showTooltip  | 是否展示文字提示        | `boolean`       | `true` |
| tooltipProps | 文字提示样式            | `TooltipProps`  | `{}`   |
| style        | 外部样式                | `CSSProperties` | `{}`   |
