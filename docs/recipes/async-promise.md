## Async function with promises

Suppose you have an async function which returns a `Promise`.

```javascript
// test/fixtures/asyncSum.js

const asyncSum = (a, b) => {
    return new Promise((resolve, reject) => {
        const saneA = Number.parseInt(a, 10);
        const saneB = Number.parseInt(b, 10);

        if(Number.isNaN(saneA)) {
            reject('First argument is not number')
        }

        if(Number.isNaN(saneB)) {
            reject('Second argument is not number')
        }

        resolve(saneA + saneB);
    })
}
```

Then what you need to do is create a test file, for instance `sum-async.specs.js` (if
you're wondering what `spec` and `suite` do, please go [here](./sync))

```javascript
// test/sum-async.specs.js

const { suite, spec, xspec } = require('titef');
const assert = require('assert');

const asyncSum = require('./fixtures/asyncSum');

suite('SumAsync', () => {
    // Use async keyword if calling an async function
    spec('should sum two numbers', async () => {
        const result = await asyncSum(2, 3);

        assert.deepEqual(result, 5);
    })

    spec('should throw', async () => {
        const fn = async () => {
            await asyncSum('foo', 2);
        }

        // And remember to use `throwsAsync` instead of `throws`, here
        await assert.throwsAsync(fn, /First argument is not number/);
    })

    xspec('ignored', () => {
        // whatever
    })
})

```

To launch the test you need to

```bash
$ titef test/sum-async.specs.js
```
