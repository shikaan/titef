const { resolve } = require('path');
const { existsSync, statSync } = require('fs');

const CLIPrinter = require('./cli-printer');
const ArgvParser = require('./argv-parser');
const DirectoryWalker = require('./directory-walker');

(function main() {
  const argvParser = new ArgvParser(process.argv);
  const CLIOptions = argvParser.getCLIOptions();

  if (CLIOptions[ArgvParser.CLI_OPTION.HELP]) {
    CLIPrinter.printHelp();
    process.exit(0);
  } else if (CLIOptions[ArgvParser.CLI_OPTION.VERSION]) {
    CLIPrinter.printVersion();
    process.exit(0);
  }

  const rootDirectoryPath = resolve(CLIOptions[ArgvParser.CLI_OPTION.DIRECTORY]);

  if (!rootDirectoryPath) {
    throw new Error('Missing path to test file! Use `titef --help` for further information');
  } else if (!existsSync(rootDirectoryPath)) {
    throw new Error(`The directory at ${rootDirectoryPath} does not exist! Use \`titef --help\` for further information`);
  }

  // eslint-disable-next-line global-require
  require('./setup');
  // eslint-disable-next-line global-require
  require('../core');

  const rootDirectoryStat = statSync(rootDirectoryPath);

  if (rootDirectoryStat.isFile()) {
    /**
     * This is used to prevent webpack to parse the require call
     */
    // eslint-disable-next-line no-eval
    eval('require')(rootDirectoryPath);
    return;
  }

  const directoryWalkerOptions = {
    extensions: CLIOptions[ArgvParser.CLI_OPTION.EXTENSIONS],
  };
  const directoryWalker = new DirectoryWalker(rootDirectoryPath, directoryWalkerOptions);
  const testFiles = directoryWalker.getFiles();

  testFiles.forEach((testFile) => {
    /**
       * This is used to prevent webpack to parse the require call
       */
    // eslint-disable-next-line no-eval
    eval('require')(testFile);
  });
}());
