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
  } = options
  const rl = createInterface({
    input,
    output,
  })
  if (password) {
    rl._writeToOutput = (s) => {
      const v = s.split(question)
      if (v.length == '2') {
        rl.output.write(question)
        rl.output.write('*'.repeat(v[1].length))
      } else {
        rl.output.write('*')
      }
    }
  }
  const promise = new Promise((resolve, reject) => {
    rl.on('close', () => {
      reject('Readline was closed.')
    })
    rl.question(question, answer => resolve(answer))
  }).catch(() => {})
  const promtoPromise = timeout
    ? promto(promise, timeout, `reloquent: ${question}`)
    : promise
  rl.promise = makePromise(promtoPromise, rl)
  return rl
}

const makePromise = async (promtoPromise, rl) => {
  try {
    return await promtoPromise
  } finally {
    rl.close()
  }
}