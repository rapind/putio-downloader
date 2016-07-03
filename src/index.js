import { List } from 'immutable'

import add from './modules/add'
import download from './modules/download'
import remove from './modules/remove'

const state = List()

function main () {
  console.log('Next event loop', new Date())

  state = add(state)

  state = download(state)

  state = remove(state)

  setTimeout(main, 5000)
}

main()
