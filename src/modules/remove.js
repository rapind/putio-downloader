import _ from 'lodash'
import PutIO from 'put.io-v2'

import config from '../config'
import queue from './queue'

function removeFile (id, cb) {
  console.log('TODO', 'Remove file', id)

  // TODO - remove the file
  const api = new PutIO(config.authToken)
  api.files.delete([id], cb)
}

module.exports = function (state) {
  var newState = {}

  _(state.queue).filter(job =>
    job.status === 'downloaded'
  ).each(job =>
    removeFile(job.id, err => {
      if (err) {
        newState = queue(state, { type: 'UPDATE_STATUS', id: job.id, status: 'failed' })
        console.error('Unable to remove', job, err)
      } else {
        newState = queue(state, { type: 'REMOVE', id: job.id })
      }
    })
  )

  return newState
}
