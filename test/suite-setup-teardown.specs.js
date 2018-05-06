const assert = require('assert');

const silent = true;

suite(
  'suite',
  () => {
    spec('should throw if no arguments', () => {
      assert.throws(() => {
        suite();
      });
    });

    spec('should throw too many arguments', () => {
      assert.throws(() => {
        suite(1, 2, 3, 4, 5);
      });
    });

    spec('should throw if options is not an object (number)', () => {
      assert.throws(() => {
        suite('should throw if options is not an object', 2, () => {
        });
      });
    });

    spec('should throw if options is not an object (null)', () => {
      assert.throws(() => {
        suite(Date.now(), null, () => {
        });
      });
    });

    spec('should throw if options is not an object (string)', () => {
      assert.throws(() => {
        suite(Date.now(), 'options', () => {
        });
      });
    });

    spec('should not throw if options is an object', () => {
      assert.doesNotThrow(() => {
        suite(Date.now(), { silent }, () => {
        });
      });
    });

    spec('should throw if callback is not an function', () => {
      assert.throws(() => {
        suite(Date.now(), {}, 1);
      });
    });

    spec('should throw if setup is not a function', () => {
      assert.throws(() => {
        suite(Date.now(), { setup: 1, silent }, () => {
        });
      });
    });

    xspec('should throw if teardown is not a function', () => {
      // Unfortunately this is untestable within Titef itself.
      // Shit may happen when you try to test something within itself
      // Social proof: https://en.wikipedia.org/wiki/Kurt_G%C3%B6del
    });
  },
);
