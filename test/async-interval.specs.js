const assert = require('assert');
const { suite, spec } = require('../src/core');

suite('AsyncInterval', () => {
  spec('should throw', async () => {
    const fn = async () => {
      await setInterval(() => {
        throw new Error('asd');
      }, 1000);
    };

    await assert.rejects(fn, Error);
  });

  spec('should fail notThrow', async () => {
    const fn = async () => {
      await setInterval(() => {
        throw new Error();
      }, 1000);
    };

    await assert.doesNotReject(fn, Error);
  });

  spec('should return a promise', () => {
    const promise = setInterval(() => {
    }, 10000);

    assert.ok(promise instanceof Promise);

    clearInterval(promise);
  });

  spec('should reject promise on clear', async () => {
    let called = false;

    const promise = setInterval(() => {
      called = true;
    }, 1000);

    clearInterval(promise);

    await setTimeout(() => {
      assert.ok(!called);
    }, 1500);
  });

  spec('should be doing repeated calls', async () => {
    let callNumber = 0;

    const promise = setInterval(() => {
      callNumber += 1;
    }, 1000);

    await setTimeout(() => {
      assert.deepEqual(callNumber, 10);
    }, 10100);

    clearInterval(promise);
  });
});
