const _ = require('lodash')
const http = require('http')
const fs = require('fs')

const config = require('../config')
const queue = require('./queue')

function downloadFile (name, url, cb) {
  console.log('Download file', name, url)

  const file = fs.createWriteStream(config.downloadTo + name)
  http.get(url, response => {
    response.pipe(file)
    file.on('finish', () =>
      file.close(cb)
    ).on('error', err => { // Handle errors
      fs.unlink(file)
      if (cb) cb(err.message)
    })
  })
}

module.exports = state => {
  var newState = {}

  _.each(state.queue, job => {
    if (job.status !== 'pending') {
      return job
    }

    newState = queue(state, { type: 'UPDATE_STATUS', id: job.id, status: 'downloaded' })
    downloadFile(job.url, err => {
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
