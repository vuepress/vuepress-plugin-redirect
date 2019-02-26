const { resolve } = require('path')
const stringify = require('stringify-object')

module.exports = (options, context) => ({
  async clientDynamicModules () {
    return {
      name: 'redirect-options.js',
      content: `export default ${stringify(options)}`
    }
  },

  enhanceAppFiles: [
    resolve(__dirname, 'enhanceApp.js')
  ],
})
