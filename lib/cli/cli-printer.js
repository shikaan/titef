class CLIPrinter {
  /**
   * @private
   * @param  {...any} args
   */
  static print(...args) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }

  static printHelp() {
    CLIPrinter.print(`Usage: titef [OPTIONS] [DIRECTORY]
    Executes test files written in Titef (https://www.npmjs.com/package/titef) framework.

    Options:
      -h, --help                shows this help
      -v, --version             prints version number
      -e, --extensions [string] comma separated list of file extensions to test

    Example:

      titef -e spec.js,test.js ./src
    `);
  }

  static printVersion() {
    CLIPrinter.print(VERSION);
  }
}

module.exports = CLIPrinter;
