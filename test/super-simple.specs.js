const { suite, spec } = require('../lib');
const assert = require('assert');

suite('super simple', () => {
  spec('true', () => {
    assert.ok(true);
  });
});
