const { resolve } = require('path')
const stringify = require('stringify-object')

module.exports = (options, context) => ({
  // workaround SSR mismatch in 404.html
  plugins: [require('./404-without-ssr')],

  async clientDynamicModules () {
    return {
      name: 'redirect-options.js',
      content: `export default ${stringify(options)}`
    }
  },

  enhanceAppFiles: resolve(__dirname, 'enhanceApp.js'),
})
