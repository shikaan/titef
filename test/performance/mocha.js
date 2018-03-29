const Statistics = require('./statistics');
const { performance } = require('perf_hooks');

const array = (() => {
  const x = [];

  let i = 0;
  while (i < 10000) {
    x.push(Math.floor(Math.random() * 100000));
    i++;
  }

  return x;
})();

performance.mark('Init');
describe('benchmark', () => {
  it('with filter', () => {
    const stats = new Statistics();

    for (let i = 0; i <= 1000; i++) {
      const result = array.filter(i => i % 2);
      performance.mark('End');
      performance.measure('Duration', 'Init', 'End');

      stats.sample.push(performance.getEntriesByName('Duration')[0].duration);
    }

    console.log('\x1b[1mMocha\x1b[0m');
    console.log('\x1b[33mInput size\t\x1b[0m', array.length);
    console.log('\x1b[33mSample size\t\x1b[0m', stats.sample.length);
    console.log('\x1b[33mMean\t\t\x1b[0m', stats.mean);
    console.log('\x1b[33mStd\t\t\x1b[0m', stats.std);
  });

  it('with sort', () => {
    const stats = new Statistics();

    for (let i = 0; i <= 1000; i++) {
      const result = array.sort();
      performance.mark('End');
      performance.measure('Duration', 'Init', 'End');

      stats.sample.push(performance.getEntriesByName('Duration')[0].duration);
    }

    console.log('\x1b[1mMocha\x1b[0m');
    console.log('\x1b[33mInput size\t\x1b[0m', array.length);
    console.log('\x1b[33mSample size\t\x1b[0m', stats.sample.length);
    console.log('\x1b[33mMean\t\t\x1b[0m', stats.mean);
    console.log('\x1b[33mStd\t\t\x1b[0m', stats.std);
  });
});
