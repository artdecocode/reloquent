
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
    if (!v.length) {
      throw new Error('Name required.')
    }
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
