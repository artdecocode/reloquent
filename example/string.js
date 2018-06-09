import { askSingle } from '../src'

(async () => {
  try {
    const answer = await askSingle('What brought you her', 10000)
    console.log(`You've answered: ${answer}`)
  } catch (err) {
    console.log()
    console.log(err)
    console.log('Nevermind...')
  }
})()
