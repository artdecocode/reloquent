import { equal, ok, throws } from 'zoroaster/assert'
import events from 'events'
import Context from '../context/'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async 'returns a readline Interface'({ ask }) {
    const rl = ask('Question: ', 100)
    ok(rl instanceof events.EventEmitter)
    try {
      await rl.promise
    } catch (err) {
      /* OK */
    }
  },
  async 'asks correct question'({ ask }) {
    const question = 'Test question: '
    const correct = 'OK'
    const { promise } = ask(question)
    await new Promise(r => setTimeout(r, 100))
    process.stdin.push(`${correct}\n`)
    const answer = await promise
    equal(answer, correct)
  },
  async 'times out'({ ask }) {
    await throws({
      async fn() {
        const { promise } = ask('Timeout question: ', 200)
        await promise
      },
      message: /has timed out after 200ms/,
    })
  },
}

export default T
