const Koa = require('koa')
const path = require('path')
const views = require('koa-views')
const router = require('./routes')
const multer = require('koa-multer');

const app = new Koa()
const upload = multer({ 
  dest: 'uploads/'
})

app.use(views(path.join(__dirname, 'views'), {
  map: { html: 'nunjucks' }
}))
router(app, upload)

app.listen(3000, res => {
  console.log('server running in 3000')
})