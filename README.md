lv:unknown

# 0.1.0-alpha.0 => 0.1.0-alpha.1

lv:alpha

# 0.1.0 => 0.1.1

lv:patch

# 0.1.0 => 0.2.0

lv:minor

# 切换 alpha/stable

#在组件库最新版本上（对应版本号位置）升一级,alpha(测试)stable(正式) lv:patch:change-alpha # 0.1.0 => 0.1.1-alpha.0 lv:patch:change-stable # 0.1.1-alpha.0 => 0.1.1 lv:minor:change-alpha # 0.1.0 => 0.2.0-alpha.0 lv:minor:change-stable # 0.2.0-alpha.0 => 0.2.0

## 文档

- 组件库说明文档：https://yanghumeng.github.io/hemi-component/

## 自动化部署

- 部署触发是在 push 到 test-docs 或 release-docs 分支时执行

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
