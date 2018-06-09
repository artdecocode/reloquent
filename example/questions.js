import ask from '../src'

const questions = {
  title: {
    text: 'Title',
    validation: (a) => {
      if (!a) {
        throw new Error('Please enter a title.')
      }
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

;(async () => {
  try {
    const answers = await ask(questions)
    console.log(answers)
  } catch (err) {
    console.log()
    console.log(err)
  }
})()
