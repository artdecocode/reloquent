import makeTestSuite from '@zoroaster/mask'

const TEST_COMPILE = process.env.ALAMODE_ENV == 'test-compile'
if (TEST_COMPILE) {
  console.log('testing compile')
}

export default makeTestSuite('test/result/default', {
  fork: {
    module: TEST_COMPILE ? 'test/fixture/fork' : 'node_modules/alamode/build/alanode',
    getArgs() {
      if (TEST_COMPILE) return []
      return ['test/fixture/fork']
    },
    inputs: [[/test/, 'answer']],
    options: {
      env: {
        SRC: TEST_COMPILE ? '../..' : '../../src', 
      },
    },
  }
})