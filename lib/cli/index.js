const { resolve } = require('path');
const { existsSync } = require('fs');
const { print, TEXT_FORMAT } = require('../_utils');
const printHelp = require('./_print-help');

// Removes `node` and `__filename` from arguments list
const nonTrivialArguments = process.argv.slice(2);

const hasHelp = nonTrivialArguments.find(item => item === '-h' || item === '--help');

if (hasHelp) {
  printHelp();
  process.exit(0);
}

// Last argument should always be the file path
const filePath = nonTrivialArguments.length
  ? resolve(nonTrivialArguments.slice(-1)[0])
  : null;

if (!filePath) {
  print(TEXT_FORMAT.RED, 'ERROR: Missing path to test file!\n');
  printHelp();
  process.exit(1);
} else if (!existsSync(filePath)) {
  print(TEXT_FORMAT.RED, 'ERROR: The specified test file does not exist!');
  process.exit(1);
}

require('./setup');

/**
 * This is used to prevent webpack to parse the require call
 */
// eslint-disable-next-line no-eval
eval('require')(filePath);
