import { throws, equal, deepEqual } from '@zoroaster/assert'
import askQuestions from '../../src/lib/ask-questions'
import Context from '../context'

/**
 * @type {Object<string, (c: Context)}
 */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof askQuestions, 'function')
  },
  async'asks a question and return a value'({ makeStdin }) {
    const answer = 'description '
    const text = 'Description'

    const { description } = await askQuestions({
      description: {
        text,
        postProcess: s => s.trim(),
        input: makeStdin(`${answer}\n`),
      },
    })
    equal(description, answer.trim())
  },
  async'asks multiple questions'({ makeStdin }) {
    const token = 'test-token'
    const org = 'test-org'
    const res = await askQuestions({
      token: {
        text: 'GitHub access token',
        input: makeStdin(`${token}\n`),
      },
      org: {
        text: 'Organisation',
        input: makeStdin(`${org}\n`),
      },
    })
    deepEqual(res, {
      token,
      org,
    })
  },
  async'validates input value'({ makeStdin }) {
    const message = 'Please specify token'
    const error = new Error(message)
    await throws({
      async fn() {
        await askQuestions({
          token: {
            text: 'GitHub access token',
            validation(a) {
              if (!a) {
                throw error
              }
            },
            input: makeStdin('\n'),
          },
        })
      },
      error,
    })
  },
  async'assigns default value'({ makeStdin }) {
    const defaultValue = 'default answer'
    const questionName = 'test_property'
    const res = await askQuestions({
      [questionName]: {
        defaultValue,
        text: 'What is your name',
        input: makeStdin('\n'),
      },
    })
    deepEqual(res, {
      [questionName]: defaultValue,
    })
  },
  async'gets a default value'({ makeStdin }) {
    const email = 'test@reloquent.net'
    const res = await askQuestions({
      email: {
        text: 'Email',
        async getDefault() {
          await new Promise(r => setTimeout(r, 100))
          return email
        },
        input: makeStdin('\n'),
      },
    })
    deepEqual(res, {
      email,
    })
  },
  async'throws when no object is given'() {
    await throws({
      fn: askQuestions,
      message: 'Please give an object with questions',
    })
  },
}

export default T
