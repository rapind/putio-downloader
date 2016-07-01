var _ = require('lodash')
var PutIO = require('put.io-v2')
var config = require('./config')
var reducer = require('./reducer')

modules.exports = function(queue) {
  var api = new PutIO(config.authToken)

  console.log("Iterate the available files")
  api.files.list(0, function(data) {
    _.each(data.files, function(file) {
      console.log("Add to the queue", file.id, file.name)

      var url = api.files.download(file.id)

      job: {
        id: file.id,
        name: file.name,
        url: url,
        updatedAt: new Date()
      }

      queue = reducer(queue, { action: 'ADD', data: job })
    })
  })
}
