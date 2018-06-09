# reloquent

[![npm version](https://badge.fury.io/js/reloquent.svg)](https://badge.fury.io/js/reloquent)

`reloquent` allows to ask user a question, or a series of questions via the read-line interface.

```sh
yarn add -E reloquent
```

## API

There are 3 types of calls to the API:

- ask a single question as a string
- ask a single question as an object
- ask multiple questions

### Question

When asking a question which is not a string, the `question` object should have the following structure:

| Property     | Type           | Description                                                           |
|--------------|----------------|-----------------------------------------------------------------------|
| **text**     | string         | Display text. Required.                                               |
| validation   | async function | A function which needs to throw an error if validation does not pass. |
| postProcess  | async function | A function to transform the answer.                                   |
| defaultValue | string         | Default answer.                                                       |
| getDefault   | async function | A function to get default value.                                      |


### `askSingle(question: string|Question, timeout?: number) => Promise.<string>`

Ask a question and wait for the answer. If a timeout is passed, the promise will expire after the specified number of milliseconds if answer was not given.

A question can be a simple string:

```js
/* yarn example/string.js */
import { askSingle } from 'reloquent'

(async () => {
  try {
    const answer = await askSingle('What brought you her', 10000)
    console.log(`You've answered: ${answer}`)
  } catch (err) {
    console.log(err)
    console.log('Nevermind...')
  }
})()
```

```fs
What brought you her: I guess Art is the cause.
```

```fs
I guess Art is the cause.
```

Or it can be an object:

```js
/* yarn example/single.js */
import { askSingle } from 'reloquent'

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
  })
  console.log(answer)
})()
```

```fs
Do you wish me to stay so long? [I desire it much]
```

```fs
I desire it much!
```

### `ask(questions: <string, Question>, timeout:number) => Promise.<object>`

Ask a series of questions and transform them into answers.

```js
/* yarn example/questions.js */
import ask from 'reloquent'

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
```

If you provide the following answers (leaving _Date_ as it is):

```fs
Title: hello
Description: [A test default value] world
Date: [2018-6-9 07:11:03]
```

You will get the following object as the result:

```js
{ title: 'hello',
  description: 'world',
  date: '2018-6-9 07:11:03' }
```

<!-- ## todo

* show timer on the right
* accept other ios
* reject when closed without answer -->

---

(c) [Art Deco Code][1] 2018

[1]: https://artdeco.bz
