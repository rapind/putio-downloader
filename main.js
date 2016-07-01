var config = require('./config')
var fetch = require('./modules/fetch')
var download = require('./modules/download')
var updateJob = require('./modules/updateJob')
var Queue = require('./modules/Queue')

var queue = []

function main() {
  console.log("Next event loop", new Date())

  fetch(queue)

  download(queue)

  cleanup(queue)

  setTimeout(main, 5000)
}

main()
