export {}

/* typal types/api.xml namespace */
/**
 * @typedef {_reloquent.askSingle} askSingle Ask user a question via the CLI. Returns the answer to the question. 
    If a timeout is passed, the promise will expire after the specified 
    number of milliseconds if the answer was not given.
 * @typedef {(question: (string|!_reloquent.Question), timeout?: number) => string} _reloquent.askSingle Ask user a question via the CLI. Returns the answer to the question. 
    If a timeout is passed, the promise will expire after the specified 
    number of milliseconds if the answer was not given.
 * @typedef {_reloquent.confirm} confirm Ask a yes/no question. Returns `true` when answer was `y` and `false` otherwise.
 * @typedef {(question: (string|!_reloquent.Question), options?: !_reloquent.ConfirmOptions) => boolean} _reloquent.confirm Ask a yes/no question. Returns `true` when answer was `y` and `false` otherwise.
 */

/**
 * @typedef {import('..').Question} _reloquent.Question
 * @typedef {import('..').ConfirmOptions} _reloquent.ConfirmOptions
 */