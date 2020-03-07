const assert = require('assert');
const { suite, spec } = require('../src/core');

suite('super simple', () => {
  spec('true', () => {
    assert.ok(true);
  });
});
