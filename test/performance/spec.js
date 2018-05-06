/* eslint-env mocha */
const { array } = require('./fixtures');

describe('benchmark', () => {
  it('with filter', () => {
    for (let i = 0; i <= 1000; i += 1) {
      array.filter(j => j % 2);
    }
  });

  it('with sort', () => {
    for (let i = 0; i <= 1000; i += 1) {
      array.sort();
    }
  });
});
