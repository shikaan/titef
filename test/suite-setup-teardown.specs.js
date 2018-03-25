const { suite, spec } = require('../lib');

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
        suite('should throw if options is not an object', null, () => {
        });
      });
    });

    spec('should throw if options is not an object (string)', () => {
      assert.throws(() => {
        suite('should throw if options is not an object', 'options', () => {
        });
      });
    });

    spec('should not throw if options is an object', () => {
      assert.doesNotThrow(() => {
        suite('name', { silent }, () => {
        });
      });
    });

    spec('should throw if callback is not an function', () => {
      assert.throws(() => {
        suite('should throw if callback is not an function', {}, 1);
      });
    });

    spec('should throw if setup is not a function', () => {
      assert.throws(() => {
        suite('should throw if setup is not a function', { setup: 1, silent }, () => {
        });
      });
    });

    spec('should throw if teardown is not a function', () => {
      assert.throws(() => {
        suite('should throw if teardown is not a function', { teardown: 1, silent }, () => {
        });
      });
    });

    spec('should execute setup before and teardown after callback', () => {
      const messages = [];
      suite('should execute setup before and teardown after callback', {
        setup: () => {
          messages.push('setup');
        },
        teardown: () => {
          messages.push('teardown');
        },
        silent,
      }, () => {
        messages.push('callback');
      });

      assert(messages[0] === 'setup');
      assert(messages[1] === 'callback');
      assert(messages[2] === 'teardown');
    });

    spec('should execute setup before callback', () => {
      const messages = [];
      suite('should execute setup before callback', {
        setup: () => {
          messages.push('setup');
        },
        silent,
      }, () => {
        messages.push('callback');
      });

      assert(messages[0] === 'setup');
      assert(messages[1] === 'callback');
    });

    spec('should execute teardown after callback', () => {
      const messages = [];
      suite('should execute teardown after callback', {
        teardown: () => {
          messages.push('teardown');
        },
        silent,
      }, () => {
        messages.push('callback');
      });

      assert(messages[0] === 'callback');
      assert(messages[1] === 'teardown');
    });
  },
);
