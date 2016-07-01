var _ = require('lodash')
var http = require('http')
var fs = require('fs')
var config = require('./config')

function downloadFile(name, url, cb) {
  console.log("Download file", name, url)

  var file = fs.createWriteStream(config.downloadTo + name)
  http.get(url, function(response) {
    response.pipe(file)
    file.on('finish', function() {
      file.close(cb)
    }).on('error', function(err) { // Handle errors
      fs.unlink(dest)
      if (cb) cb(err.message)
    })
  })
}

module.exports = function(queue) {
  return _.map(queue, function(job) {
    if (job.status !== "pending") {
      return job
    }

    job.updatedAt = new Date()
    downloadFile(job.url, function(err) {
      if (err) {
        job.status = "failed"
        job.error = err
        console.error("Unable to download", job)
      } else {
        job.status = "downloaded"
      }
    })
    return job
  })
}
