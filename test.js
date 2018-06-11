import ask, { askSingle } from './build'

(async () => {
  try {
    await askSingle('How are you today?', 5000)
  } catch (err) {
    console.log(err)
  }
})
