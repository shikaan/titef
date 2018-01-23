## setInterval, setTimeout

If for some reasons you need to use `setTimeout` or `setInterval` in your tests, you can do
that pretending they're returning a `Promise`. **Titef** under the hoods overrides this two
methods replacing them with a Promise-based version which can be used as you did with old ones.

```javascript
// test/async-timeout.specs.js

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

Of course you can also `clearTimeout` and `clearInterval` as you're used to do:

```javascript
const timeout = setTimeout(() => {
  // whatever
}, 10000);

clearTimeout(timeout);

const interval = setInterval(() => {
  // whatever
}, 10000);

clearInterval(interval);
```
##### Remark #1:
`setTimeout` and `setInterval` are replaced by Promise-based versions only when you run your
script using titef-cli. This means that the above commands are supposed to work only when you
do something like:

```bash
$ titef test/async-timeout.specs.js
```
##### Remark #2:
If you happen to use TypeScript, please remember to use `global.setTimeout` and 
`global.setInterval` instead of `setInterval` and `setTimeout`. Non prefixed ones are 
replaced under the hoods by Typescript with methods in `timers` library and these (still!)
don't work well with Titef.
