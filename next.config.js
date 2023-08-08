const path = require('path')
 
module.exports = {
  i18n: {
    locales: ['en','de', 'zh-TW'],
    defaultLocale: 'en',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}