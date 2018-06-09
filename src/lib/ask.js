import { createInterface } from 'readline'
import promto from 'promto'

/**
 * Ask user a question and wait for an answer.
 * @param {string} question Question to present to the user
 * @return {Promise<string>} An answer from the user
 */
export default function ask(question, timeout) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  let rejectQuestion
  const promise = new Promise((resolve, reject) => {
    rejectQuestion = () => {
      reject(new Error('Question was rejected')) // no pending promises
    }
    rl.question(question, (answer) => {
      resolve(answer)
    })
  })
  const p = timeout ? promto(promise, timeout, `reloquent: ${question}`) : promise
  rl.promise = p.then(
    (res) => {
      rl.close()
      rejectQuestion()
      return res
    },
    (err) => {
      rl.close()
      rejectQuestion()
      throw err
    }
  )
  return rl
}
