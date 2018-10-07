/* start example */
import { askSingle  } from '../../src'

const Password = async () => {
  const res = await askSingle({
    text: 'Please enter the password',
    password: true,
  })
  return res
}
/* end example */

Password()