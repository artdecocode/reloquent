import askQuestions from './lib/ask-questions'

/**
 * Ask user questions via the CLI. Returns an object with keys as questions' texts and values as answers.
 * @param {_reloquent.Questions} questions A set of questions.
 * @param {number} [timeout] How long to wait before rejecting the promise. Waits forever by default.
 */
export default async function reloquent(questions, timeout) {
  const res = await askQuestions(questions, timeout)
  return res
}

/**
 * Ask user a question via the CLI. Returns the answer to the question.
 * @param {string|!_reloquent.Question} question A question to present to the user.
 * @param {number} [timeout] How long to wait before rejecting the promise. Waits forever by default.
 */
export async function askSingle(question, timeout) {
  const { question: answer } = await askQuestions({ question }, timeout)
  return answer
}

/**
 * Ask a yes/no question. Returns `true` when answer was `y` and `false` otherwise.
 * @param {string} question The question, such as "Add default options", or "Continue to delete?".
 * @param {_reloquent.ConfirmOptions} [options] Options for the confirmation question.
 * @param {boolean} [options.defaultYes=true] Whether the default value is _yes_. Default `true`.
 * @param {number} [options.timeout] How long to wait before rejecting the promise. Waits forever by default.
 */
export async function confirm(question, options = {}) {
  const {
    defaultYes = true,
    timeout,
  } = options
  const hasQ = question.endsWith('?')
  const text = `${hasQ ? question.replace(/\?$/, '') : question} (y/n)${hasQ ? '?' : ''}`
  const { question: answer } = await askQuestions({
    question: {
      text,
      defaultValue: defaultYes ? 'y' : 'n',
    },
  }, timeout)
  return answer == 'y'
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types').ConfirmOptions} _reloquent.ConfirmOptions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types').Question} _reloquent.Question
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types').Questions} _reloquent.Questions
 */
