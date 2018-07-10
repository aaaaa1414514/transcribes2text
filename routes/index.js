const router = require('koa-router')()

module.exports = (app, upload) => {
  router.get('/', require('./home').index)

  router.post('/speechToText', upload.single('file'), require('./home').speechToText)
  app
    .use(router.routes())
    .use(router.allowedMethods())
}
