/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
const test = require('ava');
const { array } = require('./fixtures');

test('with filter', (t) => {
  for (let i = 0; i <= 1000; i += 1) {
    array.filter(j => j % 2);
  }

  t.pass();
});

test('with sort', (t) => {
  for (let i = 0; i <= 1000; i += 1) {
    array.sort();
  }

  t.pass();
});
