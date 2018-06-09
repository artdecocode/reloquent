const assert = require('assert')
const askQuestions = require('../../src/ask-questions')
const ReloquentContext = require('../context/')

const askQuestionsTestSuite = {
  context: ReloquentContext,

  'should be a function': () => {
    assert.equal(typeof askQuestions, 'function')
  },
  'should ask a question and return a value': (ctx) => {
    const answer = 'description'
    return ctx.askQuestions({
      description: {
        text: `Description: (${answer}) `,
        postProcess: s => s.trim(),
        defaultValue: '',
      },
    }, null, 'description')
      .then((res) => {
        assert.equal(res, answer)
      })
  },
  'should ask multiple questions': (ctx) => {
    const token = 'test-token'
    const org = 'test-org'
    const tokenErr = new Error('Please specify token')
    const questions = {
      token: {
        text: `GitHub access token: (${token}) `,
        validation: (a) => {
          if (!a) {
            throw tokenErr
          }
        },
      },
      org: {
        text: `Organisation: (${org}) `,
        defaultValue: null,
      },
    }
    return ctx.askQuestions(questions)
      .then((res) => {
        assert.deepEqual({
          token,
          org,
        }, res)
      })
  },
  'should validate input value': (ctx) => {
    const message = 'Please specify token'
    const error = new Error(message)
    const questions = {
      token: {
        text: 'GitHub access token: () ',
        validation: (a) => {
          if (!a) {
            throw error
          }
        },
      },
    }
    return ctx.askQuestions(questions)
      .then(() => {
        throw new Error('should have been rejected')
      }, (err) => {
        assert.strictEqual(err, error)
      })
  },
  'should assign default value': (ctx) => {
    const defaultValue = 'default answer'
    const questionName = 'test_property'
    const questions = {
      [questionName]: {
        defaultValue,
        text: 'some question () ',
      },
    }
    return ctx.askQuestions(questions)
      .then((res) => {
        assert.deepEqual({
          [questionName]: defaultValue,
        }, res)
      })
  },
  'should execute init promise': (ctx) => {
    const defaultValue = 'default answer'
    const questionName = 'test_property'
    const questions = {
      [questionName]: {
        defaultValue,
        text: 'some question () ',
      },
    }
    return ctx.askQuestions(questions)
      .then((res) => {
        assert.deepEqual({
          [questionName]: defaultValue,
        }, res)
      })
  },
  'should return default value when no answer': (ctx) => {
    const defaultValue = 'test@reloquent.net'
    const questions = {
      email: {
        getDefault: () => Promise.resolve(defaultValue),
        text: 'email',
      },
    }
    return ctx.askQuestions(questions)
      .then((res) => {
        assert.deepEqual(res, {
          email: defaultValue, // should test that it is also in the question
        })
      })
  },
  'should return appropriate rejection when no object is given': (ctx) => {
    return ctx.askQuestions()
      .then(() => {
        throw new Error('should have been rejected')
      })
      .catch((err) => {
        assert.equal(err.message, 'Please give an object with questions')
      })
  },
}

module.exports = askQuestionsTestSuite
