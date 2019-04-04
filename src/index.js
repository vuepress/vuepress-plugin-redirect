const { resolve } = require('path')
const stringify = require('@shigma/stringify-object')

module.exports = (options, context) => ({
  name: 'vuepress-plugin-redirect',

  // workaround SSR mismatch in 404.html
  plugins: ['dehydrate'],

  async clientDynamicModules () {
    return {
      name: 'redirect-options.js',
      content: `export default ${stringify(options)}`
    }
  },

  enhanceAppFiles: resolve(__dirname, 'enhanceApp.js'),
})
