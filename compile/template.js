const { _askQuestions, _askSingle, _confirm } = require('./reloquent')

/**
 * @methodType {_reloquent.askSingle}
 */
function askSingle(question, timeout) {
  return _askSingle(question, timeout)
}

/**
 * @methodType {_reloquent.askQuestions}
 */
function askQuestions(questions, timeout) {
  return _askQuestions(questions, timeout)
}

/**
 * @methodType {_reloquent.confirm}
 */
function confirm(question, options) {
  return _confirm(question, options)
}

module.exports = askQuestions
module.exports.askSingle = askSingle
module.exports.confirm = confirm

/* typal types/confirm.xml namespace */

// ok

/* typal types/index.xml namespace */
