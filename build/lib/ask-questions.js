const ask = require('./ask');

/**
 * Color foreground with grey
 * @param {string} t
 */
       function c(t) {
  return `\x1b[90m${t}\x1b[0m`
}

/**
 * Ask a set of questions.
 * @param {_reloquent.Questions} questions An object with questions as values
 * @param {number} [timeout] How long to wait before answer
 * @returns {!Promise<!Object<string, string>>} A promise where keys from the questions object are validated, assigned default values if required, and populated with answers. Validation function should either throw or return nothing, or throw an error.
 */
               async function askQuestions(questions, timeout) {
  if (typeof questions != 'object')
    throw new Error('Please give an object with questions')

  const keys = Object.keys(/** @type {!Object} */ (questions))
  const res = await keys.reduce(async (acc, key) => {
    const accRes = await acc

    const value = questions[key]
    /** @type {!_reloquent.Question} */
    let question
    switch (typeof value) {
    case 'object':
      question = /** @type {!_reloquent.Question} */ ({ ...value })
      break
    case 'string':
      question = { text: value }
      break
    default:
      throw new Error('A question must be a string or an object.')
    }

    question.text = `${question.text}${question.text.endsWith('?') ? '' : ':'} `

    let defaultValue
    let gotDefaultValue
    if (question.defaultValue) {
      defaultValue = question.defaultValue
    }
    if (question.getDefault) {
      gotDefaultValue = await question.getDefault()
    }

    let dv = defaultValue || ''
    if (defaultValue && gotDefaultValue && defaultValue != gotDefaultValue) {
      dv = c(defaultValue)
    } else if (defaultValue && defaultValue == gotDefaultValue) {
      dv = ''
    }
    let gtd = gotDefaultValue || ''
    const text = `${question.text}${dv ? `[${dv}] ` : ''}${gtd ? `[${gtd}] ` : ''}`
    const { promise } = ask(text, {
      timeout,
      password: question.password,
    })

    const a = await promise
    let answer = a || gotDefaultValue || question.defaultValue

    if (typeof question.validation == 'function') {
      question.validation(answer)
    }
    if (typeof question.postProcess == 'function') {
      answer = await question.postProcess(answer)
    }
    return {
      ...accRes,
      [key]: answer,
    }
  }, {})

  return res
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types').Questions} _reloquent.Questions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types').Question} _reloquent.Question
 */

module.exports = askQuestions
module.exports.c = c