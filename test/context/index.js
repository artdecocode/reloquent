const ask = require('../../src/ask')
const askQuestions = require('../../src/ask-questions')
const reloquent = require('../../src/')

function ReloquentContext() {
  Object.assign(this, { reloquent })
  Object.defineProperties(this, {
    ask: {
      value: (question, timeout) => {
        if (this._rl) {
          throw new Error('already exists')
        }
        this._rl = ask(question, timeout)
        return this._rl
      },
    },
    askQuestions: {
      value: (questions, timeout, singleValue) => {
        return askQuestions(questions, timeout, singleValue)
      },
    },
    _destroy: {
      value: () => {
        if (this._rl) {
          this._rl.close() // make sure all read lines are closed
        }
      },
    },
  })
}

module.exports = ReloquentContext
