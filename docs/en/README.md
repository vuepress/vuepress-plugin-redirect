---
sidebarDepth: 3
---

# Introduction

VuePress has a built-in [i18n system](https://v1.vuepress.vuejs.org/en/guide/i18n.html), but you must provide a default language, otherwise you will only get a 404 if you try to access `/` directly. However, providing a default language often means a less friendly project structure (because the files in the default language are one level lower than others), and we sometimes want our website to keep `/` for a more intelligent redirection (e.g. determines that the language used by the user based on `navigator.language` and automatically redirects to the corresponding page). Vuepress-plugin-redirect is such a plugin that handles automatic redirections. Of course, its capacity is not limited to automatic redirecting of the language, because you can redirect any page to its subpages via a custom redirector.

## Usage

### Global Installation

```bash
npm install -g vuepress-plugin-redirect
# OR
yarn global add vuepress-plugin-redirect
```

### Local Installation

```bash
npm install vuepress-plugin-redirect
# OR
yarn add vuepress-plugin-redirect
```

### Add to `config.js`

```js
module.exports = {
  plugins: [
    ['redirect', {
      // provide i18n redirection
      // it will automatically redirect `/foo/bar/` to `/:locale/foo/bar/` if exists
      locales: true,
    }],
  ]
}
```
or
```js
module.exports = {
  plugins: {
    redirect: {
      redirectors: [
        // customize your redirectors
        {
          base: '/my-plugins/', // automatically redirect `/my-plugins/` to a subpage
          storage: true, // save the result of the last visit to `localStorage` for the next redirect
          alternative: [
            // provide an alternate list
            // if no page was matched, you will get a "404 not found"
            'mathjax', // equivalent to `/my-plugins/mathjax/`
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

See detailed configurations [here](./config.md).

