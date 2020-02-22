export {}

/* typal types/api.xml namespace */
/**
 * @typedef {_reloquent.askSingle} askSingle Ask user a question via the CLI. Returns the answer to the question. 
    If a timeout is passed, the promise will expire after the specified 
    number of milliseconds if the answer was not given.
 * @typedef {(question: (string|!_reloquent.Question), timeout?: number) => string} _reloquent.askSingle Ask user a question via the CLI. Returns the answer to the question. 
    If a timeout is passed, the promise will expire after the specified 
    number of milliseconds if the answer was not given.
 * @typedef {_reloquent.askQuestions} askQuestions Ask user a series of questions via CLI and transform them into answers.
    Returns an object with keys as questions' texts and values as answers.
 * @typedef {(questions: !_reloquent.Questions, timeout?: number) => !Object<string, string>} _reloquent.askQuestions Ask user a series of questions via CLI and transform them into answers.
    Returns an object with keys as questions' texts and values as answers.
 * @typedef {_reloquent.confirm} confirm Ask a yes/no question. Returns `true` when answer was `y` and `false` otherwise.
 * @typedef {(question: (string|!_reloquent.Question), options?: !_reloquent.ConfirmOptions) => boolean} _reloquent.confirm Ask a yes/no question. Returns `true` when answer was `y` and `false` otherwise.
 */

/**
 * @typedef {import('..').Question} _reloquent.Question
 * @typedef {import('..').Questions} _reloquent.Questions
 * @typedef {import('..').ConfirmOptions} _reloquent.ConfirmOptions
 */