const reloquent = require('../reloquent')

const rl = reloquent('How are you today?', 2000)
rl.promise.catch((err) => {
    console.log()
    console.log(err)
    console.log(`Nevermind...`)
})
