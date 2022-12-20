export default {
  // more father 4 config: https://github.com/umijs/father-next/blob/master/docs/config.md
  cjs: 'rollup',
  esm: {
    type: 'babel',
    importLibToEs: true,
  },
  cssModules: true,
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./'],
        extensions: ['.js', '.jsx', '.tsx'],
        alias: {
          '@basics@': '@dm-component-next/basics/es',
        },
      },
    ],
  ],
  pkgs: ['utils', 'basics'],
};
