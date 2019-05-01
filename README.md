# reloquent

[![npm version](https://badge.fury.io/js/reloquent.svg)](https://npmjs.org/package/reloquent)

`reloquent` allows to ask users a question, a confirmation (y/n), or a series of questions via the read-line interface.

```sh
yarn add -E reloquent
```

- [API](#api)
- [`Question` Type](#question-type)
  * [<strong><code>text*</code></strong>](#text)
  * [<code>validation</code>](#validation)
  * [<code>postProcess</code>](#postprocess)
  * [<code>defaultValue</code>](#defaultvalue)
  * [<code>getDefault</code>](#getdefault)
  * [<code>password</code>](#password)
- [`async askSingle(question: string, timeout?: number): string`](#async-asksinglequestion-stringtimeout-number-string)
- [`async askSingle(question: Question, timeout?: number): string`](#async-asksinglequestion-questiontimeout-number-string)
- [`async ask(questions: <string, Question>, timeout?: number): object`](#async-askquestions-string-questiontimeout-number-object)
- [`async confirm(question: string, options: confirmOptions): boolean`](#async-confirmquestion-stringoptions-confirmoptions-boolean)
  * [`_reloquent.ConfirmOptions`](#type-_reloquentconfirmoptions)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>



## API

There are 4 types of calls to the API:

- ask a single question as a string;
- ask a single question as an object;
- ask multiple questions.
- ask for a confirmation;

Their respective methods can be accessed via the `import` statement:

```js
import ask, { askSingle, confirm } from 'reloquent'
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## `Question` Type

When asking a question which is not a string, the `question` object should have the following structure:

<table>
 <thead>
  <tr>
   <th>Property</th>
   <th>Type</th>
   <th>Description</th>
   <th>Example</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td><a name="text"><strong><code>text*</code></strong></a></td>
   <td><em>string</em></td>
   <td>Display text. Required.</td>
   <td>

```js
const q = {
  text: 'What is your name',
}
```
  </td>
  </tr>
  <tr>
   <td><a name="validation"><code>validation</code></a></td>
   <td><em>(async) function</em></td>
   <td>A function which needs to throw an error if validation does not pass.</td>
   <td>

```js
const q = {
  text: 'What is your name',
  validate(v) {
    if (!v.length) {
      throw new Error('Name required.')
    }
  },
}
```
  </td>
  </tr>
  <tr>
   <td><a name="postprocess"><code>postProcess</code></a></td>
   <td><em>(async) function</em></td>
   <td>A function to transform the answer.</td>
   <td>

```js
const q = {
  text: 'What is your name',
  postProcess(v) {
    return `${v.toLowerCase()}`
  },
}
```
  </td>
  </tr>
  <tr>
   <td><a name="defaultvalue"><code>defaultValue</code></a></td>
   <td><em>string</em></td>
   <td>

Default answer (shown to users in `[default]` brackets).</td>
   <td>

```js
const q = {
  text: 'What is your name',
  defaultValue: 'Visitor',
}
```
  </td>
  </tr>
  <tr>
   <td><a name="getdefault"><code>getDefault</code></a></td>
   <td><em>(async) function</em></td>
   <td>A function to execute to obtain the default value.</td>
   <td>

```js
const q = {
  text: 'What is your name',
  async getDefault() {
    await git('config', 'user.name')
  },
}
```
  </td>
  </tr>
  <tr>
   <td><a name="password"><code>password</code></a></td>
   <td><em>boolean</em></td>
   <td>Hide the inputs behind <code>*</code> when typing the answer.</td>
   <td>

```js
const q = {
  text: 'Please enter the password',
  password: true,
}
```
  </td>
  </tr>
 </tbody>
</table>


If both `defaultValue` and `getDefault` are provided, the result of the `getDefault` takes precedence:

```js
const q = {
  defaultValue: 'I desire it much',
  getDefault() {
    return 'I desire it much so'
  },
}
```

![getDefault will get precedence](doc/precedence.gif)

When the `password` property is set to true, the answer will be hidden behind the `*` symbols.

```js
import { askSingle  } from 'reloquent'

const Password = async () => {
  const res = await askSingle({
    text: 'Please enter the password',
    password: true,
  })
  return res
}
```
```
Please enter the password: ********
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>

## `async askSingle(`<br/>&nbsp;&nbsp;`question: string,`<br/>&nbsp;&nbsp;`timeout?: number,`<br/>`): string`

Ask a question as a string and wait for the answer. If a timeout is passed, the promise will expire after the specified number of milliseconds if the answer was not given.

```js
import { askSingle } from 'reloquent'

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
```

```fs
What brought you her: I guess Art is the cause.
```

```fs
You've answered: I guess Art is the cause.
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/3.svg?sanitize=true"></a></p>

## `async askSingle(`<br/>&nbsp;&nbsp;`question: Question,`<br/>&nbsp;&nbsp;`timeout?: number,`<br/>`): string`

Ask a question which is passed as an object of the [`Question`](#question-type) type, and return a string.

```js
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
    async getDefault() {
      return 'I desire it much so'
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

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/4.svg?sanitize=true"></a></p>

## `async ask(`<br/>&nbsp;&nbsp;`questions: <string, Question>,`<br/>&nbsp;&nbsp;`timeout?: number,`<br/>`): object`

Ask a series of questions and transform them into answers.

```js
import ask from 'reloquent'

const Ask = async () => {
  const questions = {
    title: {
      text: 'Title',
      validation(a) {
        if (!a) throw new Error('Please enter the title.')
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
  const res = await ask(questions)
  return res
}
```

If when provided with the following answers (leaving _Date_ as it is), the result will be returned as an object:

```
Title: hello
Description: [A test default value] world
Date: [2019-5-1 19:57:40] 

Result: {
  "title": "hello",
  "description": "world",
  "date": "2019-5-1 19:57:40"
}
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/5.svg?sanitize=true"></a></p>

## `async confirm(`<br/>&nbsp;&nbsp;`question: string,`<br/>&nbsp;&nbsp;`options: confirmOptions,`<br/>`): boolean`

Ask a yes or no question.

__<a name="type-_reloquentconfirmoptions">`_reloquent.ConfirmOptions`</a>__: Options for the confirmation question.

|    Name    |       Type       |                               Description                                | Default |
| ---------- | ---------------- | ------------------------------------------------------------------------ | ------- |
| defaultYes | <em>boolean</em> | Whether the default value is _yes_.                                      | `true`  |
| timeout    | <em>number</em>  | How long to wait before rejecting the promise. Waits forever by default. | -       |

```js
import { confirm } from 'reloquent'

const Confirm = async (question) => {
  const res = await confirm(question, {
    defaultYes: false,
  })
  return res
}
```

```
Do you wish to continue (y/n): [n] y

Result: true
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/6.svg?sanitize=true"></a></p>

## Copyright

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png" alt="Art Deco" />
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a>   2019</th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif"
          alt="Tech Nation Visa" />
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>