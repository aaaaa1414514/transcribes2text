const ffmpeg = require('fluent-ffmpeg')

module.exports = {
  async ffmpeg(params) {
    return new Promise(function (resolve, reject) {
      ffmpeg(params.audio)
        .format('flac')
        .audioFrequency(16000)
        .saveToFile('./uploads/' + params.name + '.flac')
        .on('end', res => {
          resolve({
            status: 1,
            data: res
          })
        })
        .on('error', err => {
          reject({
            status: 0,
            err: err.message
          })
        })
    })
  }
}