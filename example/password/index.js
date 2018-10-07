import { fork } from 'spawncommand'
import forkFeed from 'forkfeed'

const { stdout, stdin } = fork('example', ['example/password/fork'], {
  stdio: 'pipe',
})

forkFeed(stdout, stdin, [
  [/password/, '********'],
], process.stdout)
