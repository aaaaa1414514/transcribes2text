const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1')
const fs = require("fs")
const CombinedStream = require('combined-stream')
const speechToText = new SpeechToTextV1({
  url: 'https://stream.watsonplatform.net/speech-to-text/api',
  username: '1ef851be-586e-4c14-a95e-677d5671e2bd',
  password: 'liOz08oOzHpQ'
})

module.exports = {
  async speechToText (params) {
    var combinedStream = CombinedStream.create()
    combinedStream.append(fs.createReadStream(params.audio))
    const recognizeParams = {
      model: 'zh-CN_NarrowbandModel',
      audio: combinedStream,
      'content_type': 'audio/flac',
      timestamps: true,
      'word_alternatives_threshold': 0.9,
      keywords: ['colorado', 'tornado', 'tornadoes'],
      'keywords_threshold': 0.5
    }
    return new Promise(function (resolve, reject) {
      speechToText.recognize(recognizeParams, function (err, res) {
        if (err) {
          reject({
            status: 0,
            err: err
          })
        } else {
          resolve({
            status: 1,
            data: res
          })
        }
      })
    })
  }
}