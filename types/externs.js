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
 * The function which will get the default value, possibly asynchronously.
 * @type {(function(): (string|!Promise<string>))|undefined}
 */
_reloquent.Question.prototype.getDefault = function() {}
/**
 * The validation function which should throw on error.
 * @type {(function(string): void)|undefined}
 */
_reloquent.Question.prototype.validation = function() {}
/**
 * The transformation function for the answer.
 * @type {(function(string): (string|!Promise<string>))|undefined}
 */
_reloquent.Question.prototype.postProcess = function() {}
/**
 * Hide the inputs behind `*` when typing the answer.
 * @type {boolean|undefined}
 */
_reloquent.Question.prototype.password
/**
 * A set of questions.
 * @typedef {!Object<string, string|!_reloquent.Question>}
 */
_reloquent.Questions
