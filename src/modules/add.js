import _ from 'lodash'
import PutIO from 'put.io-v2'

import config from '../config'
import queue from './queue'

module.exports = function (state) {
  var newState = state
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

      newState = queue(newState, { type: 'ADD', job: job })
    })
  )

  return newState
}
