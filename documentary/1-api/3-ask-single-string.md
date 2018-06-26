
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
You've answered: I guess Art is the cause.
```
