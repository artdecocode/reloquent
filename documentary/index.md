# reloquent

%NPM: reloquent%

`reloquent` allows to ask users a question, or a series of questions via the read-line interface.

```sh
yarn add -E reloquent
```

%TOC%

## API

There are 3 types of calls to the API:

- ask a single question as a string;
- ask a single question as an object;
- ask multiple questions.

Their respective methods can be required with the `import` statement:

```js
import ask, { askSingle } from 'reloquent'
```

### `Question` Type

When asking a question which is not a string, the `question` object should have the following structure:

%TYPE true
<p name="text" type="string" required>
  <d>Display text. Required.</d>
  <e>

```js
const q = {
  text: 'What is your name',
}
```
  </e>
</p>
<p name="validation" type="(async) function">
  <d>A function which needs to throw an error if validation does not pass.</d>
  <e>

```js
const q = {
  text: 'What is your name',
  validate(v) {
    if (!v.length) throw new Error('Name is required.')
  },
}
```
  </e>
</p>
<p name="postProcess" type="(async) function">
  <d>A function to transform the answer.</d>
  <e>

```js
const q = {
  text: 'What is your name',
  postProcess(v) {
    return `${v.toLowerCase()}`
  },
}
```
  </e>
</p>
<p name="defaultValue" type="string">
  <d>

Default answer (shown to users in `[default]` brackets).</d>
  <e>

```js
const q = {
  text: 'What is your name',
  defaultValue: 'Visitor',
}
```
  </e>
</p>
<p name="getDefault" type="(async) function">
  <d>A function to execute to obtain the default value.</d>
  <e>

```js
const q = {
  text: 'What is your name',
  async getDefault() {
    await git('config', 'user.name')
  },
}
```
  </e>
</p>
%

```### async askSingle => string
[
  ["question", "string"],
  ["timeout?", "number"]
]
```

Ask a question as a string and wait for the answer. If a timeout is passed, the promise will expire after the specified number of milliseconds if answer was not given.

%EXAMPLE: example/string.js, ../src => reloquent, javascript%

```fs
What brought you her: I guess Art is the cause.
```

```fs
I guess Art is the cause.
```

```### async askSingle => string
[
  ["question", "Question"],
  ["timeout?", "number"]
]
```

Ask a question which is passed as an object of the [`Question`](#question-type) type, and return a string.

%EXAMPLE: example/single.js, ../src => reloquent, javascript%

```fs
Do you wish me to stay so long? [I desire it much]
```

```fs
I desire it much!
```

```### async ask => object
[
  ["questions", "<string, Question>"],
  ["timeout?", "number"]
]
```

Ask a series of questions and transform them into answers.

%EXAMPLE: example/questions.js, ../src => reloquent, javascript%

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
