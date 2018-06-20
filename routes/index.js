const router = require('koa-router')()

module.exports = (app) => {
  router.get('/', require('./home').index)

  router.post('/speechToText', require('./home').speechToText)
  app
    .use(router.routes())
    .use(router.allowedMethods())
}
