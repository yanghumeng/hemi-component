---
hero:
  title: hemi-component
  desc: 面向于满足快速开发业务的层面，灵活高效
  actions:
    - text: 开始
      link: /basics
features:
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png
    title: monorepo
    desc: lerna+dumi+pnpm
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png
    title: 规范性
    desc: git-cz + husky
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png
    title: 需求
    desc: 可按需引入
footer: Open-source MIT Licensed | Copyright © 2020<br />Powered by [dumi](https://d.umijs.org)
---

## 1.介绍

这是一个基于 react 的面向业务型的组件库

## 2.安装

### 注意

需要安装 less-loader，因为项目保留了 less npm 安装

```js
npm install less-loader
```

yarn 安装 yarn add less-loader

### 基础包

```js
- npm install @hemi-component/basics
- yarn add @hemi-component/basics
```

### 工具包

```js
- 主要是一些工具函数
- npm install @hemi-component/utils
- yarn add @hemi-component/utils
```

## 3. 使用按需打包，需要使用 `babel-plugin-import`

```js
// umi config ，参考https://umijs.org/config/
{
 ...,
 extraBabelPlugins: [
      [
        'import',
        { libraryName: '@hemi-component/basics', libraryDirectory: 'es', camel2DashComponentName: false },
        '@hemi-component/basics'
      ],
    ],
  }
```

## 4. 样式生效

如果样式不生效，可以配置`extraBabelIncludes`

```js
  // umi config参考https://v3.umijs.org/zh-CN/config#extrababelincludes
  {
     extraBabelIncludes: [
      '@hemi-component/basics'
    ],
  }
```
