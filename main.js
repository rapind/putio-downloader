var _ = require('lodash')
var PutIO = require('put.io-v2')
var config = require('./config')

var queue = []

function addToQueue(url) {
  existing = _.find(queue, function(job) {
    job.url === url
  })

  if (existing === null) {
    queue.push({ url: url, state: "pending" })
  }
}

function removeFromQueue(url) {
  queue = _.filter(queue, function(job) {
    job.url === url
  })
}

function fetchNew() {
  console.log("Log into put.io")
  var api = new PutIO(config.authToken)

  console.log("Iterate the available files")
  api.files.list(0, function(data) {
    _.each(data.files, function(file) {
      console.log(file)

      var url = api.files.download(file.id)
      addToQueue(url)
    })
  })

  console.log("Filter the list of files to those newer than our last download timestamp")
}

function processQueue() {
  console.log("Process Queue")

  fetchNew()

  queue = _.map(queue, function(job) {
    console.log("Download " + job.url)
    job.state = "downloading"
    downloadFile(job.url) // TODO: async
    return job
  })

  console.log("Queue Status:", queue)
  setTimeout(processQueue, 5000)
}

processQueue()
