import { askSingle } from '../src'

(async () => {
  const answer = await askSingle({
    text: 'Do you wish me to stay so long?',
    validation(a) {
      if (a.length < 5) {
        throw new Error('The answer is too short')
      }
    },
    defaultValue: 'I desire it much',
    postProcess(a) {
      return `${a}!`
    },
    async getDefault() {
      return 'I desire it much so'
    },
  })
  console.log(answer)
})()
