## WTF is testing?
This is meant to be a super simple introduciton to testing in general for newbies.

### Suite
A **Suite** is a collection of specifications. Along with its specs grouping role, it serves
as a way to _setup_ and _teardown_ your test environment.

#### Example
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

### Specification

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
