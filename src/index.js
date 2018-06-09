const ask = require('./ask')
const askQuestions = require('./ask-questions')

Object.defineProperties(ask, {
  askQuestions: {
    get: () => askQuestions,
  },
})


module.exports = ask
