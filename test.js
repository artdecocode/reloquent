const reloquent = require('../reloquent')

const rl = reloquent('How are you today?', 5000) // 5s timeout
rl.promise.catch((err) => {
  console.log(err)
  console.log('Nevermind...')
})
