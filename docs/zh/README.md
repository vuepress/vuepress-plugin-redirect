---
sidebarDepth: 3
---

# 介绍

VuePress 内置了[多语言系统](https://v1.vuepress.vuejs.org/zh/guide/i18n.html)，但你必须提供一个默认语言，否则直接访问 `/` 将只能得到 404。然而，提供默认语言往往又意味着不那么友好的项目结构（因为默认语言下的文件会比其他语言低一级），我们有时也希望网站保留 `/` 用于更加智能地重定向（比如根据 `navigator.language` 判断用户所使用的语言自动定向到相关页面）。vuepress-plugin-redirect 就是这样一个自动重定向的插件。当然，它所能做的事情不止是自动匹配语言，你可以通过定制你的重定向器实现任何页面到子页面的重定向。

## 用法

### 全局安装

```bash
npm install -g vuepress-plugin-redirect
# 或者
yarn global add vuepress-plugin-redirect
```

### 局部安装

```bash
npm install vuepress-plugin-redirect
# 或者
yarn add vuepress-plugin-redirect
```

### 添加到 `config.js`

```js
module.exports = {
  plugins: [
    ['redirect', {
      // 提供多语言重定向功能
      // 它会自动从 `/foo/bar/` 定向到 `/:locale/foo/bar/`，如果对应的页面存在
      locales: true,
    }],
  ]
}
```
或者
```js
module.exports = {
  plugins: {
    redirect: {
      redirectors: [
        // 定制化重定向
        {
          base: '/my-plugins/', // 将 `/my-plugins/` 自动重定向到某个子页面
          storage: true, // 保存最后一次访问的结果到 `localStorage`，供下次重定向使用
          alternative: [
            // 提供一个备选列表，如果都找不到就只能 404 Not Found 喽
            'mathjax', // 相当于 `/my-plugins/mathjax/`
            'migrate',
            'pangu',
            'redirect',
            'serve',
          ]
        },
      ],
    },
  }
}
```

在[这里](./config.md)可以查看详细的配置。
