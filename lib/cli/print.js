const print = (...args) => {
  const line = [...args, '\n'];
  return process.stdout.write(line.map(String).join(''));
};

module.exports = {
  printHelp() {
    print(`Usage: titef [OPTIONS] [DIRECTORY]
Executes test files written in Titef (https://www.npmjs.com/package/titef) framework.

Options:
  -h, --help                shows this help
  -v, --version             prints version number
  -e, --extensions [string] comma separated list of file extensions to test

Example:

  titef -e spec.js,test.js ./src

  `);
  },
  printVersion() {
    print(VERSION);
  },
};

