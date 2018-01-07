const { suite, spec, xspec } = require('../');
const assert = require('assert');

const sum = require('./fixtures/asyncSum');

suite('Sum', () => {
    spec('should be defined', () => {
        assert.ok(sum);
    })

    spec('should sum two numbers', async () => {
        const result = await sum(2, 3);
        
        assert.deepEqual(result, 5);
    })

    spec('should throw', async () => {
        const fn = async () => {
            await sum('foo', 2);
        }
        
        await assert.throwsAsync(fn, /First argument is not number/);
    })

    xspec('ignored', () => {
        // whatever
    })
})