var _ = require('lodash')

function add (queue, data) {
  var existing = _.find(queue, function(job) {
    job.id === data.id
  })
  if (existing) {
    console.error("Job exists", existing)
    return queue
  }
  return _.concat(queue, _.assign(data, {
    status: 'pending',
    updatedAt: new Date()
  }))
}

function update (queue, data) {
  return _.map(queue, function(job) {
    return job.id === data.id ? data : job
  })
},

function remove (queue, data) {
  return _.filter(queue, function(job) {
    job.id === data.id
  })
}

module.exports = function (queue, message) {
  switch (message.action) {
    case "ADD":
      return add(queue, message.data)
    case "UPDATE":
      return update(queue, message.data)
    case "REMOVE":
      return remove(queue, message.data)
    default:
      return queue
  }
}
