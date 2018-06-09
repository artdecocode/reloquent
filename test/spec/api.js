const assert = require('assert')
const reloquent = require('../../src/')

const apiTestSuite = {
  'should be able to call askQuestions': () => {
    const answer = 'answer'
    const answer2 = 'question'
    return reloquent.askQuestions({
      question: {
        text: `What is the answer (${answer}) `,
      },
      question2: {
        text: `how to you learn more (${answer2}) `,
      },
    })
      .then((res) => {
        assert.deepEqual(res, {
          question: answer,
          question2: answer2,
        })
      })
  },
}

module.exports = apiTestSuite
