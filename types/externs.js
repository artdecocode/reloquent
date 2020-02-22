/**
 * @fileoverview
 * @externs
 */

/* typal types/confirm.xml */
/** @const */
var _reloquent = {}
/**
 * Options for the confirmation question.
 * @typedef {{ defaultYes: (boolean|undefined), timeout: (number|undefined) }}
 */
_reloquent.ConfirmOptions

/* typal types/index.xml */
/**
 * A question.
 * @extends {readline.ReadLineOptions}
 * @record
 */
_reloquent.Question
/**
 * The text to show to the user.
 * @type {string}
 */
_reloquent.Question.prototype.text
/**
 * The default answer to the question.
 * @type {string|undefined}
 */
_reloquent.Question.prototype.defaultValue
/**
 * Hide the inputs behind `*` when typing the answer. Default `false`.
 * @type {boolean|undefined}
 */
_reloquent.Question.prototype.password
/**
 * The function which will get the default value, possibly asynchronously.
 * @type {(function(): (string|!Promise<string>))|undefined}
 */
_reloquent.Question.prototype.getDefault = function() {}
/**
 * The validation function which should throw on error.
 * @type {(function(string): void)|undefined}
 */
_reloquent.Question.prototype.validation = function(answer) {}
/**
 * The transformation function for the answer.
 * @type {(function(string): (string|!Promise<string>))|undefined}
 */
_reloquent.Question.prototype.postProcess = function(answer) {}
/**
 * A set of questions.
 * @typedef {!Object<string, string|!_reloquent.Question>}
 */
_reloquent.Questions

/* typal types/api.xml */
/**
 * Ask user a question via the CLI. Returns the answer to the question. 
    If a timeout is passed, the promise will expire after the specified 
    number of milliseconds if the answer was not given.
 * @typedef {function((string|!_reloquent.Question),number=): !Promise<string>}
 */
_reloquent.askSingle
/**
 * Ask user a series of questions via CLI and transform them into answers.
    Returns an object with keys as questions' texts and values as answers.
 * @typedef {function(!_reloquent.Questions,number=): !Promise<!Object<string, string>>}
 */
_reloquent.askQuestions
/**
 * Ask a yes/no question. Returns `true` when answer was `y` and `false` otherwise.
 * @typedef {function((string|!_reloquent.Question),!_reloquent.ConfirmOptions=): !Promise<boolean>}
 */
_reloquent.confirm
