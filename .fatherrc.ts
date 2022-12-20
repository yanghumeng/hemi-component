import builtins from 'builtin-modules';
export default {
  // more father 4 config: https://github.com/umijs/father-next/blob/master/docs/config.md
  extraExternals: builtins,
  cssModules: true,
  cjs: { type: 'babel' },
  esm: {
    type: 'babel',
    importLibToEs: true,
  },
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
          '@basics@': '@hemi-component/basics/es',
        },
      },
    ],
  ],
};
