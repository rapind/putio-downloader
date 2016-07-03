import _ from 'lodash'
import http from 'http'
import fs from 'fs'

import config from '../config'
import queue from './queue'

const MAX_DOWNLOADING = 3

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

  _.filter(state, job =>
    job.status === 'pending'
  ).each(job => {
    newState = queue(state, { type: 'UPDATE_STATUS', id: job.id, status: 'downloading' })
    downloadFile(job.url, err => {
      if (err) {
        newState = queue(state, { type: 'UPDATE_STATUS', id: job.id, status: 'pending', attempts: job.attempts + 1 })
        console.error('Unable to download', job)
      } else {
        newState = queue(state, { type: 'UPDATE_STATUS', id: job.id, status: 'done' })
      }
    })

    // TODO - fix this, totally broken
    if (newState.length >= MAX_DOWNLOADING) {
      break
    }
  })

  return newState
}
