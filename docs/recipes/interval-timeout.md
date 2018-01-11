## setInterval, setTimeout

If for some reasons you need to use `setTimeout` or `setInterval` in your tests, you can do
that pretending they're returning a `Promise`. **Titef** under the hoods overrides this two
methods replacing them with a Promise-based version which can be used as you did with old ones.

```javascript
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
        //whatever
    })

    spec('should throw', async () => {
        const fn = async () => {
            await setTimeout(() => {
                throw new Error('asd');
            }, 1000);
        }

        await assert.throwsAsync(fn, Error);
    })
})
```
