import { List, Map } from 'immutable'
import { describe, it } from 'mocha'
import { expect } from 'chai'

describe('the queue', () => {
  const state = List()

  const job = Map({
    id: 1,
    name: 'Test File',
    url: 'http://google.ca',
    status: 'pending',
    attempts: 0,
    addedAt: new Date()
  })

  describe('add', () => {
    it('adds a job to the queue', () => {
      expect(1).to.equal(1)
    })
  })

  describe('remove', () => {
    it('removes a job from the queue', () => {
      expect(1).to.equal(1)
    })
  })

  describe('updateStatus', () => {
    it('updates the status of a job in the queue', () => {
      expect(1).to.equal(1)
    })
  })
})
