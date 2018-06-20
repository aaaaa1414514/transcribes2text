const Koa = require('koa')
const path = require('path')
const views = require('koa-views')
const router = require('./routes')

const app = new Koa()

app.use(views(path.join(__dirname, 'views'), {
  map: { html: 'nunjucks' }
}))
router(app)

app.listen(3000, res => {
  console.log('server running in 3000')
})