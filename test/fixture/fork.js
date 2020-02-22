const { askSingle } = require(process.env.SRC)

;(async () => {
  const p = await askSingle('test')
  console.log(p)
})()
