const { execSync } = require('child_process');
const { print, toMilliseconds } = require('./fixtures');

print('\x1b[1m  Mocha\x1b[0m');
const mochaMark = process.hrtime();
execSync('mocha -t 100000 --reporter min ./test/performance/spec.js');
print(`\x1b[33m    Duration:\x1b[0m ${toMilliseconds(process.hrtime(mochaMark))} ms`);

print('\x1b[1m  Jest\x1b[0m');
const jestMark = process.hrtime();
execSync('jest --testPathPattern=performance --reporters jest-silent-reporter');
print(`\x1b[33m    Duration:\x1b[0m ${toMilliseconds(process.hrtime(jestMark))} ms`);

print('\x1b[1m  Ava\x1b[0m');
const avaMark = process.hrtime();
execSync('ava ./test/performance/ava.js');
print(`\x1b[33m    Duration:\x1b[0m ${toMilliseconds(process.hrtime(avaMark))} ms`);

print('\x1b[1m  Titef\x1b[0m');
const titefMark = process.hrtime();
execSync('titef ./test/performance/spec.js');
print(`\x1b[33m    Duration:\x1b[0m ${toMilliseconds(process.hrtime(titefMark))} ms`);
