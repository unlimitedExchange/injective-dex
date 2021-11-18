const resolve = require('path').resolve
const { metaTags } = require('./app/utils/generators')

module.exports = {
  pwa: {
    icon: {
      source: resolve(__dirname, './static/favicon-v4.png')
    },

    meta: {
      favicon: true,
      ...metaTags().pwaMetaTags()
    },

    manifest: {
      ...metaTags().manifestMetaTags()
    }
  }
}
