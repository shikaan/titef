const { resolve } = require('path');
const { existsSync } = require('fs');
const { printHelp, printVersion } = require('./print');
const { getFiles } = require('./get-files');

const CLI_OPTION = {
  HELP: 'help',
  VERSION: 'version',
  EXTENSIONS: 'extensions',
  DIRECTORY: 'directory',
};

function getFlagValue(argv, flag, shortcut) {
  return shortcut
    ? !!argv.find(item => item === flag || item === shortcut)
    : !!argv.find(item => item === flag);
}

function getArgumentValue(argv, option, shortcut) {
  const optionArgvItemIndex = argv.findIndex(item => item.includes(option) || item.includes(shortcut));
  const optionArgvItem = argv[optionArgvItemIndex];

  return optionArgvItem.includes('=')
    ? optionArgvItem.split('=')[1]
    : argv[optionArgvItemIndex + 1];
}

function getParameterValue(argv) {
  return argv[argv.length - 1];
}

function getCLIOptions(argv) {
  // Removes `node` and `__filename` from arguments list
  const nonTrivialArguments = argv.slice(2);

  const help = getFlagValue(nonTrivialArguments, '--help', '-h');
  const version = getFlagValue(nonTrivialArguments, '--version', '-v');
  const extensions = getArgumentValue(nonTrivialArguments, '--extensions', '-e');
  const directory = getParameterValue(argv);

  return {
    [CLI_OPTION.HELP]: help,
    [CLI_OPTION.VERSION]: version,
    [CLI_OPTION.EXTENSIONS]: extensions,
    [CLI_OPTION.DIRECTORY]: directory,
  };
}

(function main() {
  const CLIOptions = getCLIOptions(process.argv);

  if (CLIOptions[CLI_OPTION.HELP]) {
    printHelp();
    process.exit(0);
  } else if (CLIOptions[CLI_OPTION.VERSION]) {
    printVersion();
    process.exit(0);
  }

  const rootDirectoryPath = resolve(CLIOptions[CLI_OPTION.DIRECTORY]);

  if (!rootDirectoryPath) {
    throw new Error('Missing path to test file! Use `titef --help` for further information');
  } else if (!existsSync(rootDirectoryPath)) {
    throw new Error(`The directory at ${rootDirectoryPath} does not exist! Use \`titef --help\` for further information`);
  }

  // eslint-disable-next-line global-require
  require('./setup');
  // eslint-disable-next-line global-require
  require('../index.js');

  const testFiles = getFiles(
    rootDirectoryPath,
    { extensions: CLIOptions[CLI_OPTION.EXTENSIONS] },
  );

  testFiles.forEach((testFile) => {
    /**
       * This is used to prevent webpack to parse the require call
       */
    // eslint-disable-next-line no-eval
    eval('require')(testFile);
  });
}());
