## 文档

- 组件库说明文档：https://yanghumeng.github.io/hemi-component/

## 使用组方法

### 基础包

- npm install @hemi-component/basics
- yarn add @hemi-component/basics

### 工具包

- 主要是一些工具函数
- npm install @hemi-component/utils
- yarn add @hemi-component/utils

## 使用按需打包，需要使用 `babel-plugin-import`

```js
// umi config ，参考https://umijs.org/config/
{
 extraBabelPlugins: [
      [
        'import',
        { libraryName: '@hemi-component/basics', libraryDirectory: 'es', camel2DashComponentName: false },
        '@hemi-component/basics'
      ],
    ],
  }
```

## 样式不生效

如果样式不生效，可以配置`extraBabelIncludes`

```js
  // umi config参考https://v3.umijs.org/zh-CN/config#extrababelincludes
  {
     extraBabelIncludes: [
      '@dm-component-next/basics'
    ],
  }
```
