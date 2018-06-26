
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
