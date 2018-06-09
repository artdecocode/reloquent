"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = askQuestions;

var _ask = _interopRequireDefault(require("./ask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Ask a set of questions.
 * @param {object} questions An object with questions as values
 * @param {number} [timeout] How long to wait before answer
 * @returns {Promise} a promise where keys from the questions object are validated, assigned
 * default values if required, and populated with answers. Validation function should either throw
 * or return nothing, or throw an error.
 */
async function askQuestions(questions, timeout) {
  if (typeof questions != 'object') {
    throw new Error('Please give an object with questions');
  }

  const keys = Object.keys(questions);
  const res = await keys.reduce(async (acc, key) => {
    const accRes = await acc;
    const value = questions[key];
    let question;

    switch (typeof value) {
      case 'object':
        question = { ...value
        };
        break;

      case 'string':
        question = {
          text: value
        };
        break;

      default:
        throw new Error('A question must be a string or an object.');
    }

    question.text = `${question.text}${question.text.endsWith('?') ? '' : ':'} `;

    if (question.defaultValue) {
      question.text = `${question.text}[${question.defaultValue}] `;
    }

    let defaultValue;

    if (typeof question.getDefault == 'function') {
      defaultValue = await question.getDefault();
      question.text = `${question.text}[${defaultValue}] `;
    }

    const {
      promise
    } = (0, _ask.default)(question.text, timeout);
    const a = await promise;
    let answer = a || defaultValue || question.defaultValue;

    if (typeof question.validation == 'function') {
      question.validation(answer);
    }

    if (typeof question.postProcess == 'function') {
      answer = await question.postProcess(answer);
    }

    return { ...accRes,
      [key]: answer
    };
  }, {});
  return res;
}