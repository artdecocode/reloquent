import askQuestions from './lib/ask-questions'

/**
 * Ask user questions via the CLI.
 * @param {_reloquent.Questions} questions A set of questions.
 * @param {number} [timeout] How long to wait before rejecting the promise. Waits forever by default.
 * @returns {!Object<string, string>} An object with answers.
 */
async function reloquent(questions, timeout) {
  const res = await askQuestions(questions, timeout)
  return res
}

/**
 * Ask user a question via the CLI.
 * @param {string|_reloquent.Question} question A question to present to the user.
 * @param {number} [timeout] How long to wait before rejecting the promise. Waits forever by default.
 * @returns {!Promise<string>} An answer to the question.
 */
async function askSingle(question, timeout) {
  const { question: answer } = await askQuestions({ question }, timeout)
  return answer
}

/**
 * Ask a yes/no question.
 * @param {string} question The question, such as "Add default options", or "Continue to delete?".
 * @param {!Object} [options] The options.
 * @param {number} [options.timeout] How long to wait before rejecting the promise. Waits forever by default.
 * @param {boolean} [options.defaultYes=true]
 * @returns {string} An answer to the question.
 */
async function confirm(question, options = {}) {
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

export default reloquent
export { askSingle, confirm }

/* documentary types/confirm.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_reloquent.ConfirmOptions} ConfirmOptions Options for the confirmation question.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} _reloquent.ConfirmOptions Options for the confirmation question.
 * @prop {boolean} [defaultYes=true] Whether the default value is _yes_. Default `true`.
 * @prop {number} [timeout] How long to wait before rejecting the promise. Waits forever by default.
 */

/* documentary types/index.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_reloquent.Question} Question A question.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} _reloquent.Question A question.
 * @prop {string} text The text to show to the user.
 * @prop {string} [defaultValue] The default answer to the question.
 * @prop {function(): string|Promise<string>} [getDefault] The function which will get the default value, possibly asynchronously.
 * @prop {function(string): void} [validation] The validation function which should throw on error.
 * @prop {function(string): string} [postProcess] The transformation function for the answer.
 * @prop {boolean} [password=false] Hide the inputs behind `*` when typing the answer. Default `false`.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_reloquent.Questions} Questions A set of questions.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object<string, _reloquent.Question>} _reloquent.Questions A set of questions.
 */
