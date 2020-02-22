const { _askSingle } = require('./reloquent')

/**
 * @methodType {_reloquent.askSingle}
 */
function askSingle(question, timeout) {
  return _askSingle(question, timeout)
}

module.exports.askSingle = askSingle

/* typal types/confirm.xml namespace */

// ok

/* typal types/index.xml namespace */
