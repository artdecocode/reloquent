# reloquent

[![npm version](https://badge.fury.io/js/reloquent.svg)](https://badge.fury.io/js/reloquent)

`reloquent` allows to ask user a question.

## `reloquent(question:string, timeout?:number) => Interface`

The function returns a readline instance, with `.promise` property, which will resolve
when the user answers the question. You can also optionally supply a timeout argument after
which you want the promise to be rejected.

```js
const reloquent = require('reloquent')

const rl = reloquent('How are you today?')
rl.then((answer) => {
    console.log(`You've answered: %s`, answer) // no timeout
})
```

```js
const reloquent = require('reloquent')

const rl = reloquent('How are you today?', 5000) // 5s timeout
rl.catch((err) => {
    console.log(err)
    console.log(`Nevermind...`, answer)
})
```

## todo

* show timer on the right
* accept other ios
* reject when closed without answer

---

(c) [Sobesednik-Media](https://sobesednik.media) 2017
