"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.askSingle = askSingle;
exports.default = void 0;

var _askQuestions = _interopRequireDefault(require("./lib/ask-questions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {Object} Question
 * @property {string} text A text to show to the user.
 * @property {string} [defaultValue] A default answer to the question.
 * @property {function} [getDefault] A function which will get the default value, possibly asynchronously.
 * @property {function} [validation] A validation function which should throw on error.
 * @property {(s: string) => string} [postProcess] A transformation function for the answer.
 *
 * @typedef {Object.<string, Question>} Questions
 */

/**
 * Ask user questions via the CLI.
 * @param {Questions} questions A question or a questions configuration.
 * @param {number} [timeout] How long to wait before rejecting the promise. Waits forever by default.
 * @returns {Object.<string, string>} An object with answers.
 */
async function reloquent(questions, timeout) {
  const res = await (0, _askQuestions.default)(questions, timeout);
  return res;
}
/**
 * Ask user a question via the CLI.
 * @param {string|Question} question A question or a questions configuration.
 * @param {number} [timeout] How long to wait before rejecting the promise. Waits forever by default.
 * @returns {string} An answer to the question
 */


async function askSingle(question, timeout) {
  const {
    question: answer
  } = await (0, _askQuestions.default)({
    question
  }, timeout);
  return answer;
}

var _default = reloquent;
exports.default = _default;
//# sourceMappingURL=index.js.map