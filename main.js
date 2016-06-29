var _ = require('lodash')
var PutIO = require('put.io-v2')
var config = require('./config')

var queue = []

function addToQueue(url) {
  queue.push(url)
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

  console.log("Loop through the available files")

    console.log("Download the file")

    console.log("Delete the file")

  console.log("Recurse with a set timeout")
}

function processQueue() {
  console.log("Process Queue")

  fetchNew()

  _.each(queue, function(url) {
    console.log("Download " + url)
  })

  setTimeout(processQueue, 5000)
}

processQueue()
