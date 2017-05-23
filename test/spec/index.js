const assert = require('assert')
const reloquent = require('../../src/')
const events = require('events')

function Context() {
    Object.defineProperties(this, {
        reloquent: {
            value: (question, timeout) => {
                if (this._rl) {
                    throw new Error('already exists')
                }
                this._rl = reloquent(question, timeout)
                return this._rl
            },
        },
        _destroy: {
            value: () => {
                if (this._rl) {
                    this._rl.close() // make sure all read lines are closed
                }
            },
        },
    })
}

const reloquentTestSuite = {
    context: Context,

    'should be a function': () => {
        assert.equal(typeof reloquent, 'function')
    },
    'should return a readline Interface': (ctx) => {
        const rl = ctx.reloquent('', 100)
        assert(rl instanceof events.EventEmitter)
        return rl.promise.then(() => {}, () => {}) // timeout
    },
    'should ask correct question': (ctx) => {
        const question = 'is this a test question? '
        const correct = 'yes'
        const rl = ctx.reloquent(question)
        return rl.promise
            .then((answer) => {
                assert.equal(answer, correct, 'Well yes it was')
            })
    },
    'should resolve with the answer': (ctx) => {
        const correct = 42
        const rl = ctx.reloquent('Please enter the answer to the ultimate question ')
        return rl.promise
            .then((answer) => {
                assert.equal(answer, correct, 'No it\'s not')
            })
    },
    'should timeout': (ctx) => {
        const rl = ctx.reloquent('please don\'t enter an answer', 200)
        assert(rl instanceof events.EventEmitter)
        return rl.promise.then(() => {
            throw new Error('should have timed out')
        }, (err) => {
            assert(/has timed out after 200ms/.test(err.message))
        })
    },
}

module.exports = reloquentTestSuite
