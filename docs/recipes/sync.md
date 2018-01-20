## Sync functions

Suppose you have a sync function

```javascript
// test/fixtures/sum.js

const sum = (a, b) => {
    const saneA = Number.parseInt(a, 10);
    const saneB = Number.parseInt(b, 10);

    if(Number.isNaN(saneA)) {
        throw new TypeError('First argument is not number')
    }

    if(Number.isNaN(saneB)) {
        throw new TypeError('Second argument is not number')
    }

    return saneA + saneB;
}
```

Then what you need to do is create a test file, for instance `sum.specs.js`:

```javascript
// test/sum.specs.js

const { suite, spec, xspec } = require('titef');
const assert = require('assert');

const sum = require('./fixtures/sum');

// `suite` creates a test suite. Every argument is mandatory
suite('Sum', () => {
    // `spec` creates a spec. If no error is raised, it will be marked as passed.
    spec('should sum two numbers', () => {
        assert.deepEqual(sum(2, 3), 5);
    })

    spec('should throw', () => {
        assert.throws(() => {
            sum('foo', 2);
        }, TypeError);
    })

    // if you want to temporarly exclude certain specs, you can use the `xspec` method
    xspec('ignored', () => {
        // whatever
    })
})

```

To launch the test you need to

```bash
$ titef test/sum.specs.js
```
