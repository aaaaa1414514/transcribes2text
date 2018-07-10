const speechToText = require('../models/speech2text').speechToText
const voiceBuffer = require('../models/voiceBuffer').voiceBuffer
const CombinedStream = require('combined-stream')
const ffmpeg = require('../models/ffmpeg').ffmpeg
module.exports = {
  async index (ctx, next) {
    await ctx.render('index', {
      title: '语音转文字',
    })
  },
  // type: 1 百度； 2 ibm
  async speechToText(ctx, next) {
    const file = ctx.req.file
    console.log(file)
    let params = {
      name: file.filename,
      audio: file.path,
      type: 2
    }
    // 转码
    let suffix = file.originalname.replace(/.+\./, "")
    if (suffix !== 'flac'){
      await ffmpeg(params).then(res => {
        if (res.status === 1) {
          params.audio += '.flac'
        }
      }).catch(err => {
        console.log(err)
        return err
      })
    }
    
    var data
    // 采用ibm接口
    if (params.type === 2) {
      data = await speechToText(params).catch(err => {
        return err
      })
    // 采用百度接口
    } else if (params.type === 1) {
      data = await voiceBuffer(params).catch(err => {
        return err
      })
    } 
    ctx.body = data
  }
}