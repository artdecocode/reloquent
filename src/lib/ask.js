import { createInterface } from 'readline'
import promto from 'promto'

/**
 * Ask user a question and wait for an answer.
 * @param {string} question Question to present to the user.
 * @param {{ password: (boolean| undefined), timeout: (number|undefined), input: (stream.Readable|NodeJS.ReadStream|undefined), output: (stream.Writable|NodeJS.WriteStream|undefined) }} options The options.
 */
export default function ask(question, options = {}) {
  const {
    timeout,
    password = false,
    output = process.stdout,
    input = process.stdin,
    ...rest
  } = options
  const rl = createInterface(/** @type {!readline.ReadLineOptions} */ ({
    input,
    output,
    ...rest,
  }))
  if (password) {
    /**
     * Undocumented API.
     * @type {!NodeJS.WriteStream}
     * @suppress {checkTypes}
     */
    const o = rl['output']
    /**
     * Undocumented API.
     * @suppress {checkTypes}
     */
    rl['_writeToOutput'] = (s) => {
      if (['\r\n', '\n', '\r'].includes(s))
        return o.write(s)

      const v = s.split(question)
      if (v.length == '2') {
        o.write(question)
        o.write('*'.repeat(v[1].length))
      } else {
        o.write('*')
      }
    }
  }
  const p = new Promise((r) => {
    rl.question(question, r)
  })

  let promise
  if (timeout) {
    promise = promto(p, timeout, `reloquent: ${question}`)
  } else {
    promise = p
  }
  /**
   * @suppress {checkTypes}
   */
  rl['promise'] = tryPromise(promise, rl)
  return rl
}

/**
 * 
 * @param {!Promise} promise 
 * @param {!readline.Interface} rl 
 */
const tryPromise = async (promise, rl) => {
  try {
    const res = await promise
    return res
  } finally {
    rl.close()
  }
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('stream').Readable} stream.Readable
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('stream').Writable} stream.Writable
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('readline').ReadLineOptions} readline.ReadLineOptions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('readline').Interface} readline.Interface
 */