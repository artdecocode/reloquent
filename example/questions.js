import answer from './answer'
/* start example */
import ask from '../src'

const Ask = async () => {
  const questions = {
    title: {
      text: 'Title',
      validation(a) {
        if (!a) throw new Error('Please enter the title.')
      },
    },
    description: {
      text: 'Description',
      postProcess: s => s.trim(),
      defaultValue: 'A test default value',
    },
    date: {
      text: 'Date',
      async getDefault() {
        await new Promise(r => setTimeout(r, 200))
        return new Date().toLocaleString()
      },
    },
  }
  const res = await ask(questions)
  return res
}
/* end example */

(async () => {
  const p = Ask()
  await answer('hello')
  await answer('world')
  await answer('')
  const res = await p
  console.log('\nResult: %s', JSON.stringify(res, null, 2))
  process.exit()
})()