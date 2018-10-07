import { ok, equal, deepEqual } from 'zoroaster/assert'
import ask, { askSingle, confirm } from '../../src'
import Context from '../context'

const T = {
  async 'asks a single question as a string'() {
    const answer = 'answer'
    const p = askSingle('test')
    await new Promise(r => setTimeout(r, 100))
    process.stdin.push(`${answer}\n`)
    const res = await p
    equal(res, answer)
  },
  async 'asks a single question as an object'() {
    const answer = 'answer'
    const p = askSingle({
      text: 'test?',
      async postProcess(a) {
        await new Promise(r => setTimeout(r, 100))
        return `${a} + 1`
      },
    })
    await new Promise(r => setTimeout(r, 100))
    process.stdin.push(`${answer}\n`)
    const res = await p
    equal(res, `${answer} + 1`)
  },
  async 'asks multiple questions'() {
    const answer = 'answer'
    const p = ask({
      test: 'Question',
      test2: {
        text: 'Question 2',
        async postProcess(a) {
          return `${a} world`
        },
      },
    })
    await new Promise(r => setTimeout(r, 100))
    process.stdin.push(`${answer}\n`)
    await new Promise(r => setTimeout(r, 100))
    process.stdin.push('hello\n')
    const res = await p
    deepEqual(res, {
      test: answer,
      test2: 'hello world',
    })
  },
  async 'asks confirmation question'() {
    const answer = 'y'
    const p = confirm('Do you wish to continue')
    await new Promise(r => setTimeout(r, 100))
    process.stdin.push(`${answer}\n`)
    const res = await p
    ok(res)
  },
  async 'asks confirmation question and returns false'() {
    const answer = 'n'
    const p = confirm('Do you wish to continue')
    await new Promise(r => setTimeout(r, 100))
    process.stdin.push(`${answer}\n`)
    const res = await p
    ok(!res)
  },
}

/** @type {Object.<string, (c: Context)} */
const Confirm = {
  context: Context,
  async 'asks confirmation question with ?'({ stdout }) {
    const answer = ''
    const p = confirm('Do you wish to continue?')
    await new Promise(r => setTimeout(r, 100))
    process.stdin.push(`${answer}\n`)
    const res = await p
    const [,, q] = stdout
    equal(q, 'Do you wish to continue (y/n)? [y] ')
    ok(res)
  },
  async 'asks confirmation question with default no'({ stdout }) {
    const answer = ''
    const p = confirm('Do you wish to continue?', {
      defaultYes: false,
    })
    await new Promise(r => setTimeout(r, 100))
    process.stdin.push(`${answer}\n`)
    const res = await p
    const [,, q] = stdout
    equal(q, 'Do you wish to continue (y/n)? [n] ')
    ok(!res)
  },
}

export { Confirm }

export default T
