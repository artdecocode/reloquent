import { Readable } from 'stream'
import ask from '../../src/lib/ask'

const ORIGINAL_WRITE = process.stdout.write.bind(process.stdout)
/**
 * This context will proxy calls to the ask method to close the readline.
 */
export default class Context {
  makeStdin(answer = '\n') {
    const stdin = new Readable({
      read() {
        this.push(answer)
        this.push(null)
      }
    })
    return stdin
  }
  _init() {
    this.stdout = []
    process.stdout.write = (...args) => {
      this.stdout.push(...args)
      ORIGINAL_WRITE(...args)
    }
  }
  ask(question, options) {
    if (this.rl)
      throw new Error('readline interface already exists')
    this.rl = ask(question, options)
    return this.rl
  }
  async _destroy() {
    process.stdout.write = ORIGINAL_WRITE
    if (this.rl) {
      this.rl.close()
    }
  }
}

