"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ask;

var _readline = require("readline");

var _promto = _interopRequireDefault(require("promto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Ask user a question and wait for an answer.
 * @param {string} question Question to present to the user
 * @return {Promise<string>} An answer from the user
 */
function ask(question, timeout) {
  const rl = (0, _readline.createInterface)({
    input: process.stdin,
    output: process.stdout
  });
  let rejectQuestion;
  const promise = new Promise((resolve, reject) => {
    rejectQuestion = () => {
      reject(new Error('Question was rejected')); // no pending promises
    };

    rl.question(question, answer => {
      resolve(answer);
    });
  });
  const p = timeout ? (0, _promto.default)(promise, timeout, `reloquent: ${question}`) : promise;
  rl.promise = p.then(res => {
    rl.close();
    rejectQuestion();
    return res;
  }, err => {
    rl.close();
    rejectQuestion();
    throw err;
  });
  return rl;
}