const assert = require('assert');
const { suite, spec, xspec } = require('../src/core');

suite('AsyncTimeout', () => {
  spec('should add one', async () => {
    let count = 1;

    await setTimeout(() => {
      count += 1;
    }, 1000);

    assert.equal(count, 2);
  });

  xspec('should be ignored', () => {
    // whatever
  });

  spec('should fail', async () => {
    let count = 1;

    await setTimeout(() => {
      count += 1;
    }, 1000);

    assert.equal(count, 3);
  });

  spec('should throw', async () => {
    const fn = async () => {
      await setTimeout(() => {
        throw new Error('asd');
      }, 1000);
    };

    await assert.rejects(fn, Error);
  });

  spec('should fail notThrow', async () => {
    const fn = async () => {
      await setTimeout(() => {
        throw new Error();
      }, 1000);
    };

    await assert.doesNotReject(fn, Error);
  });

  spec('should return a promise', () => {
    const promise = setTimeout(() => { }, 10000);

    assert.ok(promise instanceof Promise);
  });

  spec('should reject promise on clear', async () => {
    let called = false;

    const promise = setTimeout(() => {
      called = true;
    }, 1000);

    clearTimeout(promise);

    await setTimeout(() => {
      assert.ok(!called);
    }, 1500);
  });
});
