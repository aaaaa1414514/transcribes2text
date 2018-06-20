const speechToText = require('../models/speech2text').speechToText

module.exports = {
  async index (ctx, next) {
    await ctx.render('index', {
      title: '语音转文字',
    })
  },
  async speechToText(ctx, next) {
    const params = {
      audio: './resources/新录音.m4a',
      content_type: 'audio/l16; rate=44100'
    }
    const data = await speechToText(params).catch(err => {
      console.log(err)
    })
    ctx.body = data
  }
}