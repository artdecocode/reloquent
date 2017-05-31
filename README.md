# reloquent

[![npm version](https://badge.fury.io/js/reloquent.svg)](https://badge.fury.io/js/reloquent)

`reloquent` allows to ask user a question.

## `reloquent(question:string, timeout?:number) => Interface`

The function returns a readline instance, with `.promise` property, which will resolve
when the user answers the question. You can also optionally supply a timeout argument after
which you want the promise to be rejected.

```js
const reloquent = require('reloquent')

const rl = reloquent('How are you today? ')
rl.promise.then((answer) => {
    console.log(`You've answered: %s`, answer) // no timeout
})
```

```js
const reloquent = require('reloquent')

const rl = reloquent('How are you today? ', 5000) // 5s timeout
rl.promise.catch((err) => {
    console.log(err)
    console.log('Nevermind...')
})
```

## `reloquent.askQuestions(questions:object[], timeout:number, singleValue:string) => Promise<object>`

Ask a series of questions and transform them into answers. `questions` must be an object of
the following structure:

```js
const reloquent = require('reloquent')

const questions = {
    title: {
        text: 'Title: ',
        validation: (a) => {
            if (!a) {
                throw new Error('Please enter a title.')
            }
        },
    },
    description: {
        text: 'Description: ',
        postProcess: s => s.trim(),
        defaultValue: '',
    },
    date: {
        text: 'Date: ',
        getDefault: () => {
            return new Promise((resolve) => {
                setTimeout(() => resolve(Date.now()), 200)
            })
        },
    },
}

reloquent.askQuestions(questions)
    .then((answers) => {
        console.log(answers)
    })
```

If you provide the following answers (leaving _Date_ as it is):

```fs
Title: title
Description: desc
Date: : [1496188514306]
```

You will get the following object as the result:

```js
{ title: 'title', description: 'desc', date: 1496188514306 }
```

### Question Object

A question object supports the following properties:

* *text*:_string_ - question text
* *validation*:_fn(answer:string)_ - validation function to run against answer. Needs to throw an error if validation does not pass
* *postProcess*:_fn(answer:string)_ - transform answer after it has been submitted and after validation
* *defaultValue*:_string_ - what default value should be recorded as an answer
* *getDefault*:_fn()_ - possibly async function to run before asking the question. Will provide a default answer, e.g., `What is your OS [win]:` can be achieved with `() => Promise.resolve(process.platform)` function.

### Single Value

You can supply a single value argument, which will ensure that only an answer to the requested
question is returned in resolved promise. This can be useful when you want to use `askQuestions`
interface to ask a single question.

```js
const reloquent = require('reloquent')

reloquent.askQuestions({
    singleQuestion: {
        text: 'This is meant to be a single question. Single just like me.',
        validation: () => {
            console.log('oh no you don\'t have to say anything, it\'s OK.')
        },
        defaultValue: true,
        postProcess: () => 'programming is an art',
    },
}, null, 'singleQuestion')
    .then((res) => {
        console.log(res) // programming is art
    })
```

## todo

* show timer on the right
* accept other ios
* reject when closed without answer

---

(c) [Sobesednik-Media](https://sobesednik.media) 2017
