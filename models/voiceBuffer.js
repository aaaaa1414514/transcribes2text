const AipSpeechClient = require("baidu-aip-sdk").speech
const fs = require('fs')

const APP_ID = '11421644'
const API_KEY = 'WiPVxnaU8q69XpbES1gVmo3w'
const SECRET_KEY = 'nxUQqvgZORpXVMZjqYRRoNmBX3bp6yvl'
const client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY)

module.exports = {
  async voiceBuffer(params) {
    let voice = fs.readFileSync(params.audio)
    let voiceBuffer = new Buffer(voice)
    console.log(voice)
    return new Promise(function (resolve, reject) {
      client.recognize(voiceBuffer, 'pcm', 16000, {dev_pid: 1537}).then(function (result) {
        console.log('<recognize>: ' + JSON.stringify(result))
        resolve({
          status: 1,
          data: result
        })
      }, function (err) {
        reject({
          status: 0,
          err: err
        })
      })
    })
  }
}