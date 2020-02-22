import { ok, equal, deepEqual } from '@zoroaster/assert'
import ask, { askSingle, confirm } from '../../src'
import Context from '../context'
import Catchment from 'catchment'

/**
 * @type {Object<string, (c: Context)}
 */
const T = {
  context: Context,
  async'asks a single question as an object'({ makeStdin }) {
    const answer = 'answer'
    const res = await askSingle({
      text: 'test?',
      async postProcess(a) {
        await new Promise(r => setTimeout(r, 100))
        return `${a} + 1`
      },
      input: makeStdin(`${answer}\n`)
    })
    equal(res, `${answer} + 1`)
  },
  async'asks multiple questions'({ makeStdin }) {
    const answer = 'answer'
    const p = ask({
      test: {
        text: 'Question',
        input: makeStdin(`${answer}\n`),
      },
      test2: {
        text: 'Question 2',
        async postProcess(a) {
          return `${a} world`
        },
        input: makeStdin('hello\n'),
      },
    })
    const res = await p
    deepEqual(res, {
      test: answer,
      test2: 'hello world',
    })
  },
  async'asks confirmation question'({ makeStdin }) {
    const answer = 'y'
    const res = await confirm({
      text: 'Do you wish to continue',
      input: makeStdin(`${answer}\n`),
    })
    ok(res)
  },
  async'asks confirmation question and returns false'({ makeStdin }) {
    const answer = 'n'
    const res = await confirm({
      text: 'Do you wish to continue',
      input: makeStdin(`${answer}\n`),
    })
    ok(!res)
  },
}

/** @type {Object.<string, (c: Context)} */
export const Confirm = {
  context: Context,
  async'asks confirmation question with ?'({ makeStdin }) {
    const answer = ''
    const output = new Catchment()
    const res = await confirm({
      text: 'Do you wish to continue?',
      input: makeStdin(`${answer}\n`),
      output,
    })
    output.end()
    const q = await output.promise
    equal(q, 'Do you wish to continue (y/n)? [y] ')
    ok(res)
  },
  async'asks confirmation question with default no'({ makeStdin }) {
    const answer = ''
    const output = new Catchment()
    const res = await confirm({
      text: 'Do you wish to continue?',
      input: makeStdin(`${answer}\n`),
      output,
    }, {
      defaultYes: false,
    })
    output.end()
    const q = await output.promise
    equal(q, 'Do you wish to continue (y/n)? [n] ')
    ok(!res)
  },
}

export default T
