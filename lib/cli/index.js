const { resolve } = require('path');
const { existsSync } = require('fs');
const { printHelp, printVersion } = require('./print');

// Removes `node` and `__filename` from arguments list
const nonTrivialArguments = process.argv.slice(2);

const showHelp = nonTrivialArguments.find(item => item === '-h' || item === '--help');
const showVersion = nonTrivialArguments.find(item => item === '-v' || item === '--version');

if (showHelp) {
  printHelp();
  process.exit(0);
} else if (showVersion) {
  printVersion();
  process.exit(0);
}

// Last argument should always be the file path
const filePath = nonTrivialArguments.length
  ? resolve(nonTrivialArguments[nonTrivialArguments.length - 1])
  : null;

if (!filePath) {
  throw new Error('Missing path to test file! Use `titef --help` for further information');
} else if (!existsSync(filePath)) {
  throw new Error('The specified file does not exist! Use `titef --help` for further information');
}

require('./setup');
require('../index.js');

/**
 * This is used to prevent webpack to parse the require call
 */
// eslint-disable-next-line no-eval
eval('require')(filePath);
