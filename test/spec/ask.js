const assert = require('assert')
const events = require('events')
const ask = require('../../src/ask')
const ReloquentContext = require('../context/')

const askTestSuite = {
  context: ReloquentContext,

  'should be a function': () => {
    assert.equal(typeof ask, 'function')
  },
  'should return a readline Interface': (ctx) => {
    const rl = ctx.ask('', 100)
    assert(rl instanceof events.EventEmitter)
    return rl.promise.then(() => {}, () => {}) // timeout
  },
  'should ask correct question': (ctx) => {
    const question = 'is this a test question? '
    const correct = 'yes'
    const rl = ctx.ask(question)
    return rl.promise
      .then((answer) => {
        assert.equal(answer, correct, 'Well yes it was')
      })
  },
  'should resolve with the answer': (ctx) => {
    const correct = 42
    const rl = ctx.ask('Please enter the answer to the ultimate question ')
    return rl.promise
      .then((answer) => {
        assert.equal(answer, correct, 'No it\'s not')
      })
  },
  'should timeout': (ctx) => {
    const rl = ctx.ask('please don\'t enter an answer', 200)
    assert(rl instanceof events.EventEmitter)
    return rl.promise.then(() => {
      throw new Error('should have timed out')
    }, (err) => {
      assert(/has timed out after 200ms/.test(err.message))
    })
  },
}

module.exports = askTestSuite
