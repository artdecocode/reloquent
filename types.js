export {}

/* typal types/confirm.xml noSuppress */
/**
 * @typedef {_reloquent.ConfirmOptions} ConfirmOptions Options for the confirmation question.
 */
/**
 * @typedef {Object} _reloquent.ConfirmOptions Options for the confirmation question.
 * @prop {boolean} [defaultYes=true] Whether the default value is _yes_. Default `true`.
 * @prop {number} [timeout] How long to wait before rejecting the promise. Waits forever by default.
 */

/* typal types/index.xml noSuppress */
/**
 * @typedef {_reloquent.Question} Question `＠record` A question.
 */
/**
 * @typedef {Object} _reloquent.Question `＠record` A question.
 * @prop {string} text The text to show to the user.
 * @prop {string} [defaultValue] The default answer to the question.
 * @prop {function(): (string|!Promise<string>)} [getDefault] The function which will get the default value, possibly asynchronously.
 * @prop {function(string): void} [validation] The validation function which should throw on error.
 * @prop {function(string): (string|!Promise<string>)} [postProcess] The transformation function for the answer.
 * @prop {boolean} [password=false] Hide the inputs behind `*` when typing the answer. Default `false`.
 */
/**
 * @typedef {_reloquent.Questions} Questions A set of questions.
 */
/**
 * @typedef {!Object<string, string|!_reloquent.Question>} _reloquent.Questions A set of questions.
 */
