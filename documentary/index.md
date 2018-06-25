#reloquent

%NPM: reloquent%

`reloquent` allows to ask users a question, or a series of questions via the read-line interface.

```sh
yarn add -E reloquent
```

%TOC%

## API

There are 3 types of calls to the API:

- ask a single question as a string
- ask a single question as an object
- ask multiple questions

Their respective methods can be required with `import` statement:

```js
import ask, { askSingle } from 'reloquent'
```

### `Question` Type

When asking a question which is not a string, the `question` object should have the following structure:

```table
[
  ["Property", "Type", "Description"],
  ["[**`text`**](t)", "string", "Display text. Required."],
  ["[`validation`](t)", "(async) function", "A function which needs to throw an error if validation does not pass."],
  ["[`postProcess`](t)", "(async) function", "A function to transform the answer."],
  ["[`defaultValue`](t)", "string", "Default answer."],
  ["[`getDefault`](t)", "(async) function", "A function to get default value."]
]
```

<!-- %TABLE
  ["Property", "Type", "Description"],

  ["[**text**](t)", "string", "Display text. Required."],
  ["[validation](t)", "async function", "A function which needs to throw an error if validation does not pass."],
  ["[postProcess](t)", "async function", "A function to transform the answer."],
  ["[defaultValue](t)", "string", "Default answer."],
  ["[getDefault](t)", "async function", "A function to get default value."]
% -->

<!-- \| (.+?)\s+\| (.+?)\s+\| (.+?)\s\| -->

<!-- ["[**text**](t)", "string", "Display text. Required."]
["[validation](t)", "async function", "A function which needs to throw an error if validation does not pass."]
["[postProcess](t)", "async function", "A function to transform the answer."]
["[defaultValue](t)", "string", "Default answer."]
["[getDefault](t)", "async function", "A function to get default value."] -->

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
