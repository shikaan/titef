const { suite, spec } = require('../');
const assert = require('assert');

suite('super simple', () => {
  spec('true', () => {
    assert.ok(true);
  });
});
