/* eslint-disable no-console */
const { Statistics, array } = require('./fixtures');
const { suite, spec } = require('../../lib');
const { performance } = require('perf_hooks');

performance.mark('Init');
suite('benchmark', { silent: true }, () => {
  spec('with filter', () => {
    const stats = new Statistics();

    for (let i = 0; i <= 1000; i += 1) {
      array.filter(j => j % 2);
      performance.mark('End');
      performance.measure('Duration', 'Init', 'End');

      stats.sample.push(performance.getEntriesByName('Duration')[0].duration);
    }

    console.log('\n\t\x1b[0m\x1b[1mTitef\x1b[0m');
    console.log('\t\x1b[90m  Filtering\x1b[0m');
    console.log('\t\x1b[33mInput size\t\x1b[0m', array.length);
    console.log('\t\x1b[33mSample size\t\x1b[0m', stats.sample.length);
    console.log('\t\x1b[33mMean\t\t\x1b[0m', stats.mean, 'ms');
    console.log('\t\x1b[33mStd\t\t\x1b[0m', stats.std, 'ms');
  });

  spec('with sort', () => {
    const stats = new Statistics();

    for (let i = 0; i <= 1000; i += 1) {
      array.sort();
      performance.mark('End');
      performance.measure('Duration', 'Init', 'End');

      stats.sample.push(performance.getEntriesByName('Duration')[0].duration);
    }

    console.log('\t\x1b[90m  Sorting\x1b[0m');
    console.log('\t\x1b[33mInput size\t\x1b[0m', array.length);
    console.log('\t\x1b[33mSample size\t\x1b[0m', stats.sample.length);
    console.log('\t\x1b[33mMean\t\t\x1b[0m', stats.mean, 'ms');
    console.log('\t\x1b[33mStd\t\t\x1b[0m', stats.std, 'ms');
  });
});
