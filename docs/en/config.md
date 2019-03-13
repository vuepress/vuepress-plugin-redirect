# Configurations

## locales

- **type:** `boolean`
- **default:** `false`

Whether to provide i18n redirection.

## redirectors

- **type:** `Redirector[]`
- **default:** `[]`

A list of custom redirectors.

## redirector.base

- **type:** `string`
- **default:** `'/'`

Base URL to be redirected.

## redirector.storage

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

## redirector.alternative

- **type:** `string | string[] | ((rel: string) => string | string[])`
- **default:** `undefined`

An alternate list of redirects. A requested URL will be devided into two parts, `base` and `rel`, and `alternative` will be inserted between them. If it is a function, `rel` will be passed as a parameter. All the results obtained will be tried in sequence, and the first existing page will be taken for redirection.
