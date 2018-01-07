const { suite, spec } = require('../');
const { print, TEXT_FORMAT } = require('../lib/_utils');
const { ERROR } = require('../lib/_const');

const assert = require('assert');

print(TEXT_FORMAT.BOLD, 'Testing suite setup/teardown');

suite('suite', () => {
  spec('should throw if no arguments', async () => {
    await assert.throwsAsync(async () => {
      await suite();
    }, ERROR.INVALID_ARGUMENT);
  });

  spec('should throw too many arguments', async () => {
    await assert.throwsAsync(async () => {
      await suite(1, 2, 3, 4, 5);
    }, ERROR.INVALID_ARGUMENT);
  });

  spec('should throw if options is not an object', async () => {
    await assert.throwsAsync(async () => {
      await suite('should throw if options is not an object', 2, () => { });
    }, ERROR.INVALID_ARGUMENT);

    await assert.throwsAsync(async () => {
      await suite('should throw if options is not an object', null, () => { });
    }, ERROR.INVALID_ARGUMENT);

    await assert.throwsAsync(async () => {
      await suite('should throw if options is not an object', 'options', () => { });
    }, ERROR.INVALID_ARGUMENT);
  });

  spec('should throw if callback is not an function', async () => {
    await assert.throwsAsync(async () => {
      await suite('should throw if callback is not an function', {}, null);
    }, ERROR.INVALID_ARGUMENT);

    await assert.throwsAsync(async () => {
      await suite('should throw if callback is not an function', {}, 1);
    }, ERROR.INVALID_ARGUMENT);
  });

  spec('should throw if setup is not a function', async () => {
    await assert.throwsAsync(async () => {
      await suite('should throw if setup is not a function', { setup: 1 }, () => { });
    }, ERROR.INVALID_ARGUMENT);
  });

  spec('should throw if teardown is not a function', async () => {
    await assert.throwsAsync(async () => {
      await suite('should throw if teardown is not a function', { teardown: 1 }, () => { });
    }, ERROR.INVALID_ARGUMENT);
  });

  spec('should execute setup before and teardown after callback', async () => {
    const messages = [];
    await suite('should execute setup before and teardown after callback', {
      setup: () => {
        messages.push('setup');
      },
      teardown: () => {
        messages.push('teardown');
      },
    }, () => {
      messages.push('callback');
    });

    assert(messages[0] === 'setup');
    assert(messages[1] === 'callback');
    assert(messages[2] === 'teardown');
  });

  spec('should execute setup before callback', async () => {
    const messages = [];
    await suite('should execute setup before callback', {
      setup: () => {
        messages.push('setup');
      },
    }, () => {
      messages.push('callback');
    });

    assert(messages[0] === 'setup');
    assert(messages[1] === 'callback');
  });

  spec('should execute teardown after callback', async () => {
    const messages = [];
    await suite('should execute teardown after callback', {
      teardown: () => {
        messages.push('teardown');
      },
    }, () => {
      messages.push('callback');
    });

    assert(messages[0] === 'callback');
    assert(messages[1] === 'teardown');
  });
});
