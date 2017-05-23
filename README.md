# reloquent

`reloquent` allows to ask user a question.

## `reloquent(question:string, ?timeout:number) => Interface`

The function returns a readline instance, with `.promise` property, which will resolve
when user answers the question. You can als optionally suply a timeout argument after
which you want the promise to be rejected.

```js
const reloquent = require('reloquent')

const rl = reloquent('How are you today?')
rl.then((answer) => {
    console.log(`You've answered: %s`, answer)
})
```

```js
const reloquent = require('reloquent')

const rl = reloquent('How are you today?', 2000)
rl.catch((err) => {
    console.log(err)
    console.log(`Nevermind...`, answer)
})
```

---

(c) Sobesednik-Media 2017
