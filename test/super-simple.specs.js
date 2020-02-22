const assert = require('assert');
const { suite, spec } = require('../lib');

suite('super simple', () => {
  spec('true', () => {
    assert.ok(true);
  });
});
