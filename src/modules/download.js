var _ = require('lodash')
var http = require('http')
var fs = require('fs')

var config = require('../config')
var queue = require('./queue')

function downloadFile (name, url, cb) {
  console.log('Download file', name, url)

  var file = fs.createWriteStream(config.downloadTo + name)
  http.get(url, function (response) {
    response.pipe(file)
    file.on('finish', function () {
      file.close(cb)
    }).on('error', function (err) { // Handle errors
      fs.unlink(file)
      if (cb) cb(err.message)
    })
  })
}

module.exports = function (state) {
  var newState = {}

  _.each(state.queue, function (job) {
    if (job.status !== 'pending') {
      return job
    }

    newState = queue(state, { type: 'UPDATE_STATUS', id: job.id, status: 'downloaded' })
    downloadFile(job.url, function (err) {
      if (err) {
        newState = queue(state, { type: 'UPDATE_STATUS', id: job.id, status: 'failed' })
        console.error('Unable to download', job)
      } else {
        newState = queue(state, { type: 'UPDATE_STATUS', id: job.id, status: 'downloaded' })
      }
    })
    return job
  })

  return newState
}
