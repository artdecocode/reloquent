const { _askQuestions, _askSingle, _confirm } = require('./reloquent')

/**
 * Ask user a question via the CLI. Returns the answer to the question. 
    If a timeout is passed, the promise will expire after the specified 
    number of milliseconds if the answer was not given.
 * @param {(string|!_reloquent.Question)} question The question to present to the user.
 * @param {number=} [timeout] How long to wait before rejecting the promise. Waits forever by default.
 * @return {Promise<string>}
 */
function askSingle(question, timeout) {
  return _askSingle(question, timeout)
}

/**
 * Ask user a series of questions via CLI and transform them into answers.
    Returns an object with keys as questions' texts and values as answers.
 * @param {!_reloquent.Questions} questions A set of questions.
 * @param {number=} [timeout] How long to wait before rejecting the promise. Waits forever by default.
 * @return {Promise<!Object<string, string>>}
 */
function askQuestions(questions, timeout) {
  return _askQuestions(questions, timeout)
}

/**
 * Ask a yes/no question. Returns `true` when answer was `y` and `false` otherwise.
 * @param {(string|!_reloquent.Question)} question The question, such as "Add default options", or "Continue to delete?".
      The question mark can added automatically.
 * @param {!_reloquent.ConfirmOptions} [options] Options for the confirmation question.
 * @param {boolean} [options.defaultYes=true] Whether the default value is _yes_. Default `true`.
 * @param {number} [options.timeout] How long to wait before rejecting the promise. Waits forever by default.
 * @return {Promise<boolean>}
 */
function confirm(question, options) {
  return _confirm(question, options)
}

module.exports = askQuestions
module.exports.askSingle = askSingle
module.exports.confirm = confirm

/* typal types/confirm.xml namespace */
/**
 * @typedef {_reloquent.ConfirmOptions} ConfirmOptions Options for the confirmation question.
 * @typedef {Object} _reloquent.ConfirmOptions Options for the confirmation question.
 * @prop {boolean} [defaultYes=true] Whether the default value is _yes_. Default `true`.
 * @prop {number} [timeout] How long to wait before rejecting the promise. Waits forever by default.
 */

/* typal types/index.xml namespace */
/**
 * @typedef {import('readline').ReadLineOptions} readline.ReadLineOptions
 * @typedef {_reloquent.Question} Question `＠record` A question.
 * @typedef {_reloquent.$Question & readline.ReadLineOptions} _reloquent.Question `＠record` A question.
 * @typedef {Object} _reloquent.$Question `＠record` A question.
 * @prop {string} text The text to show to the user.
 * @prop {string} [defaultValue] The default answer to the question.
 * @prop {boolean} [password=false] Hide the inputs behind `*` when typing the answer. Default `false`.
 * @prop {() => (string|!Promise<string>)} [getDefault] The function which will get the default value, possibly asynchronously.
 * @prop {(answer: string) => void} [validation] The validation function which should throw on error.
 * @prop {(answer: string) => (string|!Promise<string>)} [postProcess] The transformation function for the answer.
 * @typedef {_reloquent.Questions} Questions A set of questions.
 * @typedef {!Object<string, string|!_reloquent.Question>} _reloquent.Questions A set of questions.
 */
