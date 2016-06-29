var PutIO = require('put.io-v2')
var config = require('config')

function fetch(lastDownloadAt) {
  console.log("Log into put.io")
  var api = new PutIO(config.authToken)

  console.log("Iterate the available files")
  api.files.list(0, function(data) {
    for (var i in data.files) {
      console.log(data.files[i].name)
    }
  })

  console.log("Filter the list of files to those newer than our last download timestamp")

  console.log("Loop through the available files")

    console.log("Download the file")

    console.log("Delete the file")

  console.log("Recurse with a set timeout")
}

fetch(new Date())
