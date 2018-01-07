# Titef
Tiny test framework for testing newbies.
### Why you should use it?
1. It has everything you need in most of the cases in an incredibly small size;
2. It has an almost flat learning curve if you're already familiar with other testing frameworks
like Mocha or Jasmine;
3. (opinionated) It has an almost flat learning curve even though you're not familiar with 
other testing technologies but you're familiar with ES6+;
4. It's deadly simple. You can read the source and understand how it works in an hour;

## Getting started
Titef is completely agnostic regarding te assertion library you want to use, as soon as 
it returns an `AssertionError` when an assertion fails.

For this introduction we'll use Node's `assert`.

Please note: every example you'll read in this documentation is available or at least
deeply inspired by what you find in the `test` folder of this project.

### Recipe #1: Sync function

Suppose you have a sync function

```javascript
const sum = (a, b) => {
    const saneA = Number.parseInt(a, 10);
    const saneB = Number.parseInt(b, 10);

    if(isNaN(saneA)) {
        throw new TypeError('First argument is not number')
    }

    if(isNaN(saneB)) {
        throw new TypeError('Second argument is not number')
    }

    return saneA + saneB;
}
```

Then what you need to do is create a test file, for instance `sum.specs.js`:

```javascript
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

### Recipe #2: Async function with promises

Suppose you have an async function which returns a `Promise`. 

```javascript
const asyncSum = (a, b) => {
    return new Promise((resolve, reject) => {
        const saneA = Number.parseInt(a, 10);
        const saneB = Number.parseInt(b, 10);

        if(isNaN(saneA)) {
            reject('First argument is not number')
        }

        if(isNaN(saneB)) {
            reject('Second argument is not number')
        }

        resolve(saneA + saneB);
    })
}
```

Then what you need to do is create a test file, for instance `sumAsync.specs.js` (if 
you're wondering what `spec` and `suite` do, please go to the preceding recipe)

```javascript
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

### Recipe #3: Async function with callback

Suppose you have an async function with a callback (seriously?!). What we'll be doing 
is simply using the `promisify` method in Node `util`library to transform that function 
to a Promise based async function and then use what we already did in Recipe #2. 

Let's take for example Node's `fs.readFile`.

Then what you need to do is create a test file, for instance `asyncNode.specs.js` (if 
you'll be wondering what `spec` and `suite` do, please go to the first recipe; if you'll 
be wondering how to use `async` go to the second one).

```javascript
const { readFile } = require('fs');
const { join } = require('path');

/**
 * Please note: Node's folks made the world a better place adding this 
 * `promisify` method to the `utils` lib. It will take a callback-based
 * method and transforms it into a Promise-based method.
 */
const { promisify } = require('util');

suite('AsyncNode', () => {
    // The dummy file is a file only containing the string `dummy dummy dummy`
    const dummyPath = join(__dirname, 'fixtures', 'dummy');

    // `promisified` will behave just like a normal Promise-based method
    const promisified = promisify(readFile); 

    spec('should read dummy file', async () => {
        const result = await promisified(dummyPath, 'utf-8'); 
        assert.deepStrictEqual(result, 'dummy dummy dummy');
    })

    xspec('ignore this', () => {})

    spec('should fail assertion', async () => {
        const result = await promisified(dummyPath, 'utf-8'); 
        assert.deepStrictEqual(result, 'dummy! dummy! dummy!');
    })

    spec('unhandled', async () => {
        const result = await promisified('not even a path', 'utf-8'); 
        assert.deepStrictEqual(result, 'dummy! dummy! dummy!');
    })

    spec('should throw', async () => {
        const fn = async () => {
            await promisified('not even a path', 'utf-8')
        }; 

        await assert.throwsAsync(fn, Error);
    })
})

```

### Recipe #4: setInterval, setTimeout

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

## WTF is testing?
This is meant to be a super simple introduciton to testing in general for newbies.
#### Suite
A **Suite** is a collection of specifications. Along with its specs grouping role, it serves 
as a way to _setup_ and _teardown_ your test environment.

##### Example
Suppose you have a function which is meant to write the word "foo-bar" at the end of a file.

To test if it works you need to:

1. create a blank file;
2. launch the function;
3. check if "foo-bar" is in the target file;
4. delete the file.

The problem is that you most probably don't want to manually create a blank file every time 
you launch the test and manually delete it at the end of the test.

So in the _setup phase_ you will create the file and in the _teardown phase_ you will delete
it. 

#### Specification

A **Specification** is where the magic happens. It's basically a function which is run and 
which contains an _assertion_. An assertion is simply a function which throws an error if
something unwanted happens.

#### Example
Suppose you have a function `sum` which is supposed to... sum two number.

```javascript
const sum = (x, y) => a + b;

spec('It sums two numbers', () => {
    const result = sum(1, 2);

    assert.equal(result, 4); // This throws an Error as 1 + 2 is not 4
})

```
# Missing features
[ ][ ] beforeAll
[ ][ ] afterAll
[ ][ ] beforeEach 
[ ][ ] afterEach
[ ][ ] report
[ ][ ] exclusive
[ ][ ] runner
    [ ][ ] configuration (which files to test, choose report, log level)
[ ][ ] cancelInterval
[ ][ ] cancelTimeout