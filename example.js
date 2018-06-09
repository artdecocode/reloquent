const reloquent = require('../reloquent')

const rl = reloquent('How are you today? ', 10000)
rl.promise
  .then((answer) => {
    console.log(`You've answered: ${answer}`)
  })
  .catch((err) => {
    console.log()
    console.log(err)
    console.log('Nevermind...')
  })
