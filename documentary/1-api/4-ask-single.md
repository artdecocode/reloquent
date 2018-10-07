```## async askSingle => string
[
  ["question", "Question"],
  ["timeout?", "number"]
]
```

Ask a question which is passed as an object of the [`Question`](#question-type) type, and return a string.

%EXAMPLE: example/single.js, ../src => reloquent%

```fs
Do you wish me to stay so long? [I desire it much]
```

```fs
I desire it much!
```

%~%