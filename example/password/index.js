import { fork } from 'spawncommand'
import forkFeed from 'forkfeed'

const { stdout, stdin } = fork('node_modules/.bin/alanode', ['example/password/fork'], {
  stdio: 'pipe',
})

forkFeed(stdout, stdin, [
  [/password/, '********'],
], process.stdout)