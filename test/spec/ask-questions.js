import { throws, equal, deepEqual } from '@zoroaster/assert'
import askQuestions from '../../src/lib/ask-questions'

const T = {
  'is a function'() {
    equal(typeof askQuestions, 'function')
  },
  async 'asks a question and return a value'() {
    const answer = 'description '
    const text = 'Description'

    const p = askQuestions({
      description: {
        text,
        postProcess: s => s.trim(),
      },
    })
    await new Promise(r => setTimeout(r, 100))
    process.stdin.push(`${answer}\n`)
    const { description } = await p
    equal(description, answer.trim())
  },
  async 'asks multiple questions'() {
    const token = 'test-token'
    const org = 'test-org'
    const questions = {
      token: {
        text: 'GitHub access token',
      },
      org: {
        text: 'Organisation',
      },
    }
    const p = askQuestions(questions)
    await new Promise(r => setTimeout(r, 100))
    process.stdin.push(`${token}\n`)
    await new Promise(r => setTimeout(r, 100))
    process.stdin.push(`${org}\n`)
    const res = await p
    deepEqual(res, {
      token,
      org,
    })
  },
  async 'validates input value'() {
    const message = 'Please specify token'
    const error = new Error(message)
    const questions = {
      token: {
        text: 'GitHub access token',
        validation(a) {
          if (!a) {
            throw error
          }
        },
      },
    }
    process.stdin.push('\n')
    await throws({
      fn: askQuestions,
      args: [questions],
      error,
    })
  },
  async 'assigns default value'() {
    const defaultValue = 'default answer'
    const questionName = 'test_property'
    const questions = {
      [questionName]: {
        defaultValue,
        text: 'What is your name',
      },
    }
    process.stdin.push('\n')
    const p = askQuestions(questions)
    const res = await p
    deepEqual(res, {
      [questionName]: defaultValue,
    })
  },
  async 'gets a default value'() {
    const email = 'test@reloquent.net'
    const questions = {
      email: {
        text: 'Email',
        async getDefault() {
          await new Promise(r => setTimeout(r, 100))
          return email
        },
      },
    }
    process.stdin.push('\n')
    const p = askQuestions(questions)
    const res = await p
    deepEqual(res, {
      email,
    })
  },
  async 'returns appropriate rejection when no object is given'() {
    await throws({
      fn: askQuestions,
      message: 'Please give an object with questions',
    })
  },
}

export default T
