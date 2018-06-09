import { equal, deepEqual } from 'zoroaster/assert'
import ask, { askSingle } from '../../src'

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
}

export default T
