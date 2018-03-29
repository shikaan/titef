const { suite, spec } = require('../../lib');
const Statistics = require('./statistics');
const { performance } = require('perf_hooks');

const array = (() => {
	const x = []

	let i = 0
	while(i < 10000) {
		x.push(Math.floor(Math.random()*100000))
		i++
	}

	return x
})()

performance.mark('Init');
suite('test', () => {
	spec('does a long operation', () => {
		for(let i = 0; i <= 1000; i ++) {
			const result = array.filter(i => i % 2);
			performance.mark('End');
			performance.measure('Duration', 'Init', 'End');

			Statistics.sample.push(performance.getEntriesByName('Duration')[0].duration);
		}

		console.log('Titef')
		console.log('Input size', array.length);
		console.log('Sample size', Statistics.sample.length);
		console.log('Mean', Statistics.mean);
		console.log('Std', Statistics.std);
	})
})