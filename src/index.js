import askQuestions from './lib/ask-questions'

/**
 * Ask user questions via the CLI. Returns an object with keys as questions' texts and values as answers.
 * @param {_reloquent.Questions} questions A set of questions.
 * @param {number} [timeout] How long to wait before rejecting the promise. Waits forever by default.
 */
export default async function reloquent(questions, timeout) {
  const res = await askQuestions(questions, timeout)
  return res
}

/**
 * @type {_reloquent.askSingle}
 */
export async function askSingle(question, timeout) {
  const { question: answer } = await askQuestions({ question }, timeout)
  return answer
}

/**
 * @type {_reloquent.confirm}
 */
export async function confirm(question, options = {}) {
  const {
    defaultYes = true,
    timeout,
  } = options
  const Q = typeof question == 'string' ? {
    text: question,
  } : question
  const { text } = question
  const hasQ = text.endsWith('?')
  const realText = `${hasQ ? text.replace(/\?$/, '') : text} (y/n)${hasQ ? '?' : ''}`
  const { question: answer } = await askQuestions({
    question: {
      defaultValue: defaultYes ? 'y' : 'n',
      ...question,
      text: realText,
    },
  }, timeout)
  return answer == 'y'
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').ConfirmOptions} _reloquent.ConfirmOptions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').Question} _reloquent.Question
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').Questions} _reloquent.Questions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types').askSingle} _reloquent.askSingle
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types').confirm} _reloquent.confirm
 */
