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
    let params = {
      audio: './resources/周杰伦 - 青花瓷.mp3',
      type: 2
    }
    //转码
    
    let suffix = params.audio.replace(/.+\./, "")
    console.log(suffix)
    if (suffix !== 'flac'){
      await ffmpeg(params).catch(err => {
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