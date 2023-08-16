import { defineConfig } from 'dumi';
const path = require('path');
export default defineConfig({
  title: 'hemi-component',
  favicon:
    'data:image/png;base64,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',
  logo: 'data:image/png;base64,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',
  // base: '/',
  // publicPath: '/',
  outputPath: 'docs-dist',
  mode: 'site',
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
  ],
  // 引入被 external 库的 scripts
  // 区分 development 和 production，使用不同的产物
  scripts:
    process.env.NODE_ENV === 'development'
      ? [
          'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.development.js',
          'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.development.js',
        ]
      : [
          'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.production.min.js',
          'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.production.min.js',
        ],
  // 配置 external,表示哪些模块可以不被打包
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
  },
  alias: {
    '@basics@': path.resolve(__dirname, './packages/basics/src'),
  },
  // more config: https://d.umijs.org/config
});
