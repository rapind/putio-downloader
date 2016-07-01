var _ = require('lodash')
var PutIO = require('put.io-v2')
var config = require('./config')
var reducer = require('./reducer')

function removeFile(id, cb) {
  console.log("Remove file", id)

  // TODO - remove the file
  var api = new PutIO(config.authToken)
  api.files.delete([id], cb)
}

module.exports = function(queue) {
  jobsForRemoval = _.filter(queue, function(job) {
    return job.state == "downloaded"
  })

  _.each(jobsForRemoval, function(job) {
    removeFile(job.id, function(err) {
      if (err) {
        job.state = "failed"
        console.error("Unable to remove", job, err)
      } else {
        queue = reducer(queue, { action: 'REMOVE', data: { id: job.id } })
      }
    })
  })
}
