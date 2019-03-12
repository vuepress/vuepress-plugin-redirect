const { resolve } = require('path')
const { readFileSync, writeFileSync } = require('fs')

module.exports = (options, context) => ({
  name: 'vuepress-plugin-404-without-ssr',

  generated() {
    const _404Path = resolve(context.outDir, '404.html')
    const scriptRegex = new RegExp(`<script src="${context.base}[^"]*" defer></script>`, 'g')
    writeFileSync(
      _404Path,
      readFileSync(_404Path, 'utf8').replace(
        /<body>([\s\S]*)<\/body>/,
        (_, innerHTML) => `<body>
    <div id="app"></div>
    ${innerHTML.match(scriptRegex).join()}
  </body>`
      )
    )
  },
})
