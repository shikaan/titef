const assert = require('assert');
const ArgvParser = require('./argv-parser');

suite('ArgvParser#getOptions', () => {
  spec('gets help flag', () => {
    const argvParser = new ArgvParser(['--help']);

    const options = argvParser.getCLIOptions();

    assert.ok(options[ArgvParser.CLI_OPTION.HELP]);
  });

  spec('gets help flag (shortcut)', () => {
    const argvParser = new ArgvParser(['-h']);

    const options = argvParser.getCLIOptions();

    assert.ok(options[ArgvParser.CLI_OPTION.HELP]);
  });

  spec('gets version flag', () => {
    const argvParser = new ArgvParser(['--version']);

    const options = argvParser.getCLIOptions();

    assert.ok(options[ArgvParser.CLI_OPTION.VERSION]);
  });

  spec('gets version flag (shortcut)', () => {
    const argvParser = new ArgvParser(['-v']);

    const options = argvParser.getCLIOptions();

    assert.ok(options[ArgvParser.CLI_OPTION.VERSION]);
  });

  spec('gets extensions argument', () => {
    const argvParser = new ArgvParser(['--extensions', 'specs.js']);

    const options = argvParser.getCLIOptions();

    assert.equal(options[ArgvParser.CLI_OPTION.EXTENSIONS], 'specs.js');
  });

  spec('gets extensions argument (shortcut)', () => {
    const argvParser = new ArgvParser(['-e', 'specs.js']);

    const options = argvParser.getCLIOptions();

    assert.equal(options[ArgvParser.CLI_OPTION.EXTENSIONS], 'specs.js');
  });

  spec('gets extensions argument (equal)', () => {
    const argvParser = new ArgvParser(['-e=specs.js']);

    const options = argvParser.getCLIOptions();

    assert.equal(options[ArgvParser.CLI_OPTION.EXTENSIONS], 'specs.js');
  });

  spec('gets extensions argument (equal and quotes)', () => {
    const argvParser = new ArgvParser(['-e="specs.js"']);

    const options = argvParser.getCLIOptions();

    assert.equal(options[ArgvParser.CLI_OPTION.EXTENSIONS], 'specs.js');
  });

  spec('gets directory parameter', () => {
    const argvParser = new ArgvParser(['-some', 'arguments', '-orflag', './dir']);

    const options = argvParser.getCLIOptions();

    assert.equal(options[ArgvParser.CLI_OPTION.DIRECTORY], './dir');
  });
});
