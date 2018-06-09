import ask from '../../src/lib/ask'

/**
 * This context will proxy calls to the ask method to close the readline.
 */
export default class Context {
  ask(question, timeout) {
    if (this.rl) {
      throw new Error('readline interface already exists')
    }
    this.rl = ask(question, timeout)
    return this.rl
  }
  async _destroy() {
    if (this.rl) {
      this.rl.close()
    }
  }
}

