const { suite, spec, xspec } = require('../');
const assert = require('assert');

const sum = require('./fixtures/sum');

suite('Sum', () => {
    spec('should be defined', () => {
        assert.ok(sum);
    })

    spec('should sum two numbers', () => {
        const result = sum(2, 3);
        
        assert.deepEqual(result, 5);
    })

    spec('should throw first argument', () => {
        assert.throws(() => {
            sum('foo', 2);
        }, TypeError);
    })

    spec('should fail second argument', () => {
        assert.throws(() => {
            sum(1, 'bar');
        }, TypeError);
    })

    spec('testing assertion failure', () => {
        assert.throws(() => {
            sum(1, 3);
        }, TypeError);
    })

    spec('testing unhandled error', () => {
        throw new Error('Unhandled exception')
        assert(true);
    })

    xspec('ignored', () => {
        assert.throws(sum.bind(this, 1, '3'), TypeError);
    })
})