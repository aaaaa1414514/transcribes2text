const ffmpeg = require('fluent-ffmpeg')

module.exports = {
  async ffmpeg(params) {
    const file_name = params.audio.replace(/(.*\/)*([^.]+).*/ig, "$2")
    console.log(file_name)
    return new Promise(function (resolve, reject) {
      ffmpeg(params.audio)
        .format('flac')
        .audioFrequency(16000)
        .saveToFile('./resources/' + file_name + 'flac')
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