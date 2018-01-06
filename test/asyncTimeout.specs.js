const { suite, spec, xspec } = require('../');
const assert = require('assert');

suite('AsyncTimeout', () => {
    spec('should add one', async () => {
        let count = 1;

        await setTimeout(() => {
            count = count + 1;
        }, 1000)

        assert.equal(count, 2);
    })

    xspec('should be ignored', () => {
        assert.throws(sum.bind(this, 1, 'bar'), TypeError);
    })

    spec('should fail', async () => {
        let count = 1;

        await setTimeout(() => {
            count = count + 1;
        }, 1000)

        assert.equal(count, 3);
    })

    spec('should throw', async () => {
        const fn = async () => {
            await setTimeout(() => {
                throw new Error('asd');
            }, 1000);
        }

        await assert.throwsAsync(fn, Error);
    })

    spec('should fail notThrow', async () => {
        const fn = async () => {
            await setTimeout(() => {
                throw new Error();
            }, 1000);
        }

        await assert.doesNotThrowAsync(fn, Error);
    })
})