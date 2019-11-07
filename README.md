# [vuepress-plugin-redirect](https://vuepress.github.io/plugins/redirect/)

> Migrated to [vuepress-community](https://github.com/vuepress/vuepress-community)

[![npm](https://img.shields.io/npm/v/vuepress-plugin-redirect.svg)](https://www.npmjs.com/package/vuepress-plugin-redirect)

A [VuePress](https://vuepress.vuejs.org/) plugin that handles redirection.

## Introduction

VuePress has a built-in [i18n system](https://v1.vuepress.vuejs.org/en/guide/i18n.html), but you must provide a default language, otherwise you will only get a 404 if you try to access `/` directly. However, providing a default language often means a less friendly project structure (because the files in the default language are one level lower than others), and we sometimes want our website to keep `/` for a more intelligent redirection (e.g. determines that the language used by the user based on `navigator.language` and automatically redirects to the corresponding page). Vuepress-plugin-redirect is such a plugin that handles automatic redirections. Of course, its capacity is not limited to automatic redirecting of the language, because you can redirect any page to its subpages via a custom redirector.

## Options

### locales

- **type:** `boolean`
- **default:** `false`

Whether to provide i18n redirection.

### redirectors

- **type:** `Redirector[]`
- **default:** `[]`

A list of custom redirectors.

### redirector.base

- **type:** `string`
- **default:** `'/'`

Base URL to be redirected.

### redirector.storage

- **type:** `boolean | string | Storage`
- **default:** `false`

Decide how the results of the redirect are stored. If set to `string`, it corresponds to the key of `localStorage`. If it is an object, you must include the following two methods:

- `get(redirector: Redirector): string`
- `set(value: string, redirector: Redirector): void`

A simple `storage` object is provided below for your reference:

```js
const storage = {
  get({ base }) {
    if (typeof localStorage === 'undefined') return null
    return localStorage.getItem('redirect:' + base)
  },
  set(value, { base }) {
    if (typeof localStorage === 'undefined') return
    localStorage.setItem('redirect:' + base, value)
  },
}
```

### redirector.alternative

- **type:** `string | string[] | ((rel: string) => string | string[])`
- **default:** `undefined`

An alternate list of redirects. A requested URL will be devided into two parts, `base` and `rel`, and `alternative` will be inserted between them. If it is a function, `rel` will be passed as a parameter. All the results obtained will be tried in sequence, and the first existing page will be taken for redirection.

## Contribution

Contribution Welcome!
