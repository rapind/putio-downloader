const _ = require('lodash')
const expect = require('expect')
const queue = require('../src/modules/queue')

const job = {
  id: 1,
  name: 'Test File',
  url: 'http://google.ca',
  status: 'pending',
  addedAt: new Date()
}

// ADD
expect(
  queue(
    [],
    { type: 'ADD', job: job }
  )
).toEqual([ job ])

// REMOVE
expect(
  queue(
    queue(
      [],
      { type: 'ADD', job: job }
    ),
    { type: 'REMOVE', id: job.id }
  )
).toEqual([])

// UPDATE_STATUS
expect(
  queue(
    queue(
      [],
      { type: 'ADD', job: job }
    ),
    { type: 'UPDATE_STATUS', status: 'tested' }
  )
).toEqual([ _.assign(job, { status: 'tested' }) ])

// UNKNOWN
expect(
  queue(
    [],
    { type: 'UNKNOWN', job: job }
  )
).toEqual([])
