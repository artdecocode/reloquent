import answer from './answer'
/* start example */
import { confirm } from '../src'

const Confirm = async (question) => {
  const res = await confirm(question, {
    defaultYes: false,
  })
  return res
}
/* end example */

(async () => {
  const p = Confirm('Do you wish to continue')
  await answer('y')
  const res = await p
  console.log('Result: %s', res)
})()