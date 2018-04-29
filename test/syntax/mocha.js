const assert = require('assert');
const sum = require('../fixtures/sum');

describe('Sum', () => {
  it('should be defined', () => {
    assert.ok(sum);
  });

  it('should sum two numbers', () => {
    const result = sum(2, 3);

    assert.deepEqual(result, 5);
  });

  it('should throw first argument', () => {
    assert.throws(() => {
      sum('foo', 2);
    }, TypeError);
  });

  it('should fail second argument', () => {
    assert.throws(() => {
      sum(1, 'bar');
    }, TypeError);
  });
});
