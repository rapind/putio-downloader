const _ = require('lodash')

function add (state, data) {
  const existing = _.find(state, job =>
    job.id === data.id
  )

  if (existing) {
    console.error('Job exists', existing)
    return state
  }

  return _.concat(state, data)
}

function updateStatus (state, id, status) {
  return _.map(state, job => {
    if (job.id === id) {
      _.assign(job, { status: status })
    }
    return job
  })
}

function remove (state, id) {
  return _.filter(state, job =>
    job.id === id
  )
}

module.exports = function (state, action) {
  switch (action.type) {
    case 'ADD':
      return add(state, action.job)
    case 'UPDATE_STATUS':
      return updateStatus(state, action.id, action.status)
    case 'REMOVE':
      return remove(state, action.id)
    default:
      return state
  }
}
