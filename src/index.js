const add = require('./modules/add')
const download = require('./modules/download')
const remove = require('./modules/remove')

var state = []

function main () {
  console.log('Next event loop', new Date())

  state = add(state)

  state = download(state)

  state = remove(state)

  setTimeout(main, 5000)
}

main()
