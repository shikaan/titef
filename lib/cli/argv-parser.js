class ArgvParser {
  /**
   * @param {[]string} argv - Argv Array
   */
  constructor(argv) {
    this.argv = [...argv];
  }

  /**
   * Get flag value out of argv options array.
   *
   * @private
   *
   * @example
   * getFlagValue(['node', '-h'], '--help', '-h')       // true
   * getFlagValue(['node', '-h'], '--version', '-v')    // false
   * getFlagValue(['node', '--help'], '--help', '-h')   // true
   *
   * @param {string} flag
   * @param {string} shortcut
   *
   * @returns {boolean}
   */
  getFlagValue(flag, shortcut) {
    return shortcut
      ? !!this.argv.find((item) => item === flag || item === shortcut)
      : !!this.argv.find((item) => item === flag);
  }

  /**
   * Get a argument value out of argv options array.
   *
   * @private
   *
   * @example
   * getArgumentValue(['node', '-f', 'bar'], '--foo', '-f') // 'bar'
   * getArgumentValue(['node', '-f=bar'], '--foo', '-f') // 'bar'
   * getArgumentValue(['node', '--foo=bar'], '--foo', '-f') // 'bar'
   * getArgumentValue(['node', '--foo=bar'], '--zoo', '-z') // ''
   *
   * @param {string} argument
   * @param {string} shortcut
   *
   * @returns {string}
   */
  getArgumentValue(argument, shortcut) {
    const optionIndex = this.argv.findIndex((i) => i.includes(argument) || i.includes(shortcut));
    const option = this.argv[optionIndex];

    if (!option) {
      return '';
    }

    return option.includes('=')
      ? option.split('=')[1]
      : this.argv[optionIndex + 1];
  }

  /**
   * Get a parameter value out of argv options array.
   *
   * @private
   *
   * @example
   * getParameterValue(['node', '-f', 'bar', 'lol']) // 'lol'

   * @param {string} argument
   * @param {string} shortcut
   *
   * @returns {string}
   */
  getParameterValue() {
    return this.argv[this.argv.length - 1];
  }

  /**
   * Return CLI Options in the shape of an object
   *
   * @returns {{ ArgvParser.CLI_OPTION: string|boolean }}
   */
  getCLIOptions() {
    const help = this.getFlagValue('--help', '-h');
    const version = this.getFlagValue('--version', '-v');
    const extensions = this.getArgumentValue('--extensions', '-e');
    const directory = this.getParameterValue();

    return {
      [ArgvParser.CLI_OPTION.HELP]: help,
      [ArgvParser.CLI_OPTION.VERSION]: version,
      [ArgvParser.CLI_OPTION.EXTENSIONS]: extensions,
      [ArgvParser.CLI_OPTION.DIRECTORY]: directory,
    };
  }
}

ArgvParser.CLI_OPTION = {
  HELP: 'help',
  VERSION: 'version',
  EXTENSIONS: 'extensions',
  DIRECTORY: 'directory',
};

module.exports = ArgvParser;
