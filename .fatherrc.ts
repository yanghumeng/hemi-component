import builtins from 'builtin-modules';
import commonjs from '@rollup/plugin-commonjs';
export default {
  // more father 4 config: https://github.com/umijs/father-next/blob/master/docs/config.md
  // extraExternals: builtins,
  // cssModules: true,
  cjs: { transformer: 'babel' },
  esm: {
    transformer: 'babel',
    // importLibToEs: true,
  },
  // typescriptOpts: {
  //   // https://github.com/ezolenko/rollup-plugin-typescript2/issues/201
  //   typescript: require('ttypescript'),
  //   tsconfigDefaults: {
  //     compilerOptions: {
  //       // Generate declaration files by default
  //       declaration: true,
  //       plugins: [
  //         { transform: 'typescript-transform-paths' },
  //         { transform: 'typescript-transform-paths', afterDeclarations: true },
  //       ],
  //     },
  //   },
  // },
  // nodeResolveOpts: {
  //   browser: true,
  //   modulesOnly: true,
  // },
  // extraRollupPlugins: [
  //   commonjs({
  //     include: /node_modules/,
  //   }),
  // ],
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
