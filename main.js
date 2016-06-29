var PutIO = require('put.io-v2')

function fetch(lastDownloadAt) {
  console.log("Log into put.io")
  var api = new PutIO(oauth_token)

  api.files.list(0, function(data) {
    for (var i in data.files) {
      console.log(data.files[i].name)
    }
  })


  console.log("List the available files")

  console.log("Filter the list of files to those newer than our last download timestamp")

  console.log("Loop through the available files")

    console.log("Download the file")

    console.log("Delete the file")

  console.log("Recurse with a set timeout")
}

fetch(new Date())
