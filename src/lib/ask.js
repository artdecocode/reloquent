import { createInterface } from 'readline'
import promto from 'promto'

/**
 * Ask user a question and wait for an answer.
 * @param {string} question Question to present to the user.
 * @param {{ password: boolean, timeout?: number }} options The options.
 */
export default function ask(question, options = {}) {
  const {
    timeout,
    password = false,
    output = process.stdout,
    input = process.stdin,
    ...rest
  } = options
  const rl = createInterface({
    input,
    output,
    ...rest,
  })
  if (password) {
    rl._writeToOutput = (s) => {
      if (['\r\n', '\n', '\r'].includes(s))
        return rl.output.write(s)

      const v = s.split(question)
      if (v.length == '2') {
        rl.output.write(question)
        rl.output.write('*'.repeat(v[1].length))
      } else {
        rl.output.write('*')
      }
    }
  }
  const p = new Promise(rl.question.bind(rl, question))

  const promise = timeout
    ? promto(p, timeout, `reloquent: ${question}`)
    : p
  rl.promise = tryPromise(promise, rl)
  return rl
}

const tryPromise = async (promise, rl) => {
  try {
    const res = await promise
    return res
  } finally {
    rl.close()
  }
}