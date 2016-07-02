const _ = require('lodash')
const PutIO = require('put.io-v2')

const config = require('../config')
const queue = require('./queue')

module.exports = function (state) {
  var newState = {}
  const api = new PutIO(config.authToken)

  console.log('Iterate the available files')
  api.files.list(0, data =>
    _.each(data.files, file => {
      console.log('Add to the queue', file.id, file.name)
      // Get the download URL
      const url = api.files.download(file.id)

      const job = {
        id: file.id,
        name: file.name,
        url: url,
        status: 'pending',
        addedAt: new Date()
      }

      newState = queue(state, { type: 'ADD', job: job })
    })
  )

  return newState
}
