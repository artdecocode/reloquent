import { equal, ok, throws } from '@zoroaster/assert'
import events from 'events'
import { PassThrough } from 'stream'
import Catchment, { collect } from 'catchment'
import Context from '../context/'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async'returns a readline Interface'({ ask, makeStdin }) {
    const output = new Catchment()
    const rl = ask('Question: ', { 
      timeout: 100,
      input: makeStdin('test'),
      output,
    })
    ok(rl instanceof events.EventEmitter)
    try {
      await rl.promise
    } catch (err) {
      /* OK */
    }
  },
  async'asks correct question'({ ask, makeStdin }) {
    const question = 'Test question: '
    const correct = 'OK'
    const output = new Catchment()
    const { promise } = ask(question, {
      input: makeStdin(`${correct}\n`),
      output,
    })
    const answer = await promise
    equal(answer, correct)
  },
  async'times out'({ ask, makeStdin }) {
    await throws({
      async fn() {
        const { promise } = ask('Timeout question: ', { 
          timeout: 200,
          output: new Catchment(),
          input: makeStdin(''),
        })
        await promise
      },
      message: /has timed out after 200ms/,
    })
  },
  async'writes a password'({ ask }) {
    const output = new PassThrough()
    const input = new PassThrough()
    const a = 'password'
    const p = collect(output)
    const { promise } = ask('Password: ', {
      password: true,
      output,
      input,
      terminal: true,
    })
    input.end(`${a}\n`)
    const answer = await promise
    output.end()
    equal(answer, a)
    const pp = await p
    equal(pp, '\u001b[1G\u001b[0JPassword: \u001b[11G********\r\n')
  },
}

export default T
