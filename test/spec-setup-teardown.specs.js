const { suite, spec } = require('../lib');
const assert = require('assert');

suite(
  'suite',
  () => {
    spec('should execute setup before and teardown after callback', async () => {
      const messages = [];
      suite('a', {
        setup() {
          messages.push('suite:setup');
        },
        teardown() {
          messages.push('suite:teardown');
        },
        eachSetup() {
          messages.push('spec:setup');
        },
        eachTeardown() {
          messages.push('spec:teardown');
        },
        silent: true,
      }, () => {
        messages.push('suite:callback');
        spec('b', () => {
          messages.push('spec:callback');
        });
      });

      assert.equal(messages[0], 'suite:setup');
      assert.equal(messages[1], 'suite:callback');
      assert.equal(messages[2], 'spec:setup');
      assert.equal(messages[3], 'spec:callback');
      assert.equal(messages[4], 'spec:teardown');
      assert.equal(messages[5], 'suite:teardown');
    });
  },
);
