/* typal types/index.xml */
/** @const */
var _reloquent = {}
/**
 * A question.
 * @typedef {{ text: string, defaultValue: (string|undefined), getDefault: (function(): string|Promise<string>|undefined), validation: (function(string): void|undefined), postProcess: (function(string): string|undefined), password: (boolean|undefined) }}
 */
_reloquent.Question
/**
 * A set of questions.
 * @typedef {Object<string, _reloquent.Question>}
 */
_reloquent.Questions
