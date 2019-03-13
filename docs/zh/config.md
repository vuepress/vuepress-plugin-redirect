# 配置

## locales

- **类型:** `boolean`
- **默认值:** `false`

是否提供多语言重定向功能。

## redirectors

- **类型:** `Redirector[]`
- **默认值:** `[]`

自定义的重定向器列表。

## redirector.base

- **类型:** `string`
- **默认值:** `'/'`

要进行重定向的根地址。

## redirector.storage

- **类型:** `boolean | string | Storage`
- **默认值:** `false`

决定重定向的结果被以何种方式存储。如果设为 `string`，则对应 `localStorage` 的键值。如果是对象，则必须包含下面两个方法：

- `get(redirector: Redirector): string`
- `set(value: string, redirector: Redirector): void`

下面提供一个简单的 `storage` 对象以供大家参考：

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

- **类型:** `string | string[] | ((rel: string) => string | string[])`
- **默认值:** `undefined`

重定向的备选列表。被请求的网址将被分为 `base` 和 `rel` 两个部分，`alternative` 将插入它们之间。如果是一个函数，将传入 `rel` 作为参数。得到的所有结果将被一一尝试，取第一个存在的页面进行重定向。
