var _ = require('lodash')
var PutIO = require('put.io-v2')

var config = require('../config')
var queue = require('./queue')

function removeFile (id, cb) {
  console.log('TODO', 'Remove file', id)

  // TODO - remove the file
  var api = new PutIO(config.authToken)
  api.files.delete([id], cb)
}

module.exports = function (state) {
  var newState = {}

  _(state.queue).filter(function (job) {
    return job.status === 'downloaded'
  }).each(function (job) {
    removeFile(job.id, function (err) {
      if (err) {
        newState = queue(state, { type: 'UPDATE_STATUS', id: job.id, status: 'failed' })
        console.error('Unable to remove', job, err)
      } else {
        newState = queue(state, { type: 'REMOVE', id: job.id })
      }
    })
  })

  return newState
}
