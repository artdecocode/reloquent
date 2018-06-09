import askQuestions from './lib/ask-questions'

/**
 * @typedef {Object} Question
 * @property {string} text A text to show to the user.
 * @property {string} [defaultValue] A default answer to the question.
 * @property {function} [getDefault] A function which will get the default value, possibly asynchronously.
 * @property {function} [validation] A validation function which should throw on error.
 * @property {(s: string) => string} [postProcess] A transformation function for the answer.
 */


/**
 * Ask user questions via the CLI.
 * @param {Object.<string, Question>} questions A question or a questions configuration.
 * @param {number} [timeout] How long to wait before rejecting the promise. Waits forever by default.
 */
export default async function reloquent(questions, timeout) {
  const res = await askQuestions(questions, timeout)
  return res
}

/**
 * Ask user a question via the CLI.
 * @param {string|Question} question A question or a questions configuration.
 * @param {number} [timeout] How long to wait before rejecting the promise. Waits forever by default.
 */
export async function askSingle(question, timeout) {
  const { question: answer } = await askQuestions({ question }, timeout)
  return answer
}
