const { isFunction } = require('../_utils');
const { TEXT_FORMAT } = require('./_const');
const { NODE_MAJOR_VERSION, RESULT } = require('../_const');

/**
 * Prints on stdout
 */
const print = (...args) => {
  const line = [...args, TEXT_FORMAT.RESET, '\n'];
  return process.stdout.write(line.map(String).join(''));
};

/**
 * Gets the string name of Error entries
 * @param {any} value
 */
const getErrorName = value => (isFunction(value) ? value.name : String(value));

/**
 * Tries to extract an error message from an error
 * @param error
 * @returns {string}
 */
const getErrorMessage = (error) => {
  if (error.message) {
    return error.message;
  }

  // In case of something like 'ERROR: message' returns 'message'
  return error.toString().split(':').slice(-1)[0];
};

/**
 * Returns true if error is an Assertion Failure
 * @param error {Error}
 * @returns {boolean}
 */
const isAssertionFailure = error => error.code === 'ERR_ASSERTION' || error.toString().includes('AssertionError');

/**
 * Print details of an error in the report.
 * Error can be either an assertion failure or a generic error.
 * @param error {Error}
 */
const printErrorDetails = (error) => {
  const message = getErrorMessage(error);
  // In Node 10.x.x Error Handling improved a lot,
  // we'll use this to decide when to leave it do the job
  const isBeforeNodeTen = NODE_MAJOR_VERSION < 10;

  if (isAssertionFailure(error)) {
    const operator = getErrorName(error.operator);
    const expected = getErrorName(error.expected);
    const actual = getErrorName(error.actual);

    if (isBeforeNodeTen) {
      print(`ASSERTION FAILURE: ${message}`);
    }

    /**
     * Printing detailed report if either:
     * - operator is generic;
     * - operator is missing and we have expected and actual;
     *
     * Otherwise the message already contains the failure
     */
    if (operator === 'fail') {
      print('\tUnexpected:\t', TEXT_FORMAT.RED, `${actual}`);
    } else if (!operator && error.expected && error.actual) {
      print('\tExpected:\t', TEXT_FORMAT.GREEN, expected);
      print('\tActual:\t\t', TEXT_FORMAT.RED, actual);
    }
  } else if (isBeforeNodeTen) {
    print(`ERROR: ${message}`);
  }

  print(TEXT_FORMAT.GREY, error.stack);
};

const printSuite = (suite, suiteTitle, prefix = '') => {
  const ERROR_DETAILS = {};

  if (!suite.meta.silent) {
    // Printing duration only if bigger than two seconds
    const duration = suite.meta.duration > 2000
      ? [TEXT_FORMAT.RESET, TEXT_FORMAT.YELLOW, ` (${Math.ceil(suite.meta.duration)}ms)`]
      : [];

    print(TEXT_FORMAT.BOLD, `${prefix}${suiteTitle.toUpperCase()}`, ...duration);
  }

  Object
    .entries(suite)
    .forEach(([specTitle, spec]) => {
      const isSilent = (spec.meta && spec.meta.silent) || suite.meta.silent;

      if (!isSilent) {
        const isSuite = spec.meta;

        if (isSuite) {
          Object.assign(ERROR_DETAILS, printSuite(spec, specTitle, `${prefix}    `));
        } else {
          // Printing duration only if bigger than half a second
          const duration = spec.duration > 500 ? [TEXT_FORMAT.YELLOW, ` (${Math.ceil(spec.duration)}ms)`] : [];

          if (spec.result === RESULT.SUCCESS) {
            print(TEXT_FORMAT.GREEN, `${prefix} ✔ ${specTitle}`, ...duration);
          } else if (spec.result === RESULT.IGNORED) {
            print(TEXT_FORMAT.YELLOW, `${prefix} - ${specTitle}`, ...duration);
          } else if (spec.result === RESULT.PENDING) {
            print(TEXT_FORMAT.GREY, `${prefix} . ${specTitle}`, ...duration);
          } else {
            print(TEXT_FORMAT.RED, `${prefix} ✕ ${specTitle}`);
            ERROR_DETAILS[`${suiteTitle} > ${specTitle}`] = spec.payload;
          }
        }
      }
    });

  return ERROR_DETAILS;
};

/**
 * Prints on stdout the given in-memory database
 * @returns {Promise<void>}
 */
const printDatabase = async (database) => {
  let ERROR_DETAILS = {};

  Object.entries(database).forEach(([title, suite]) => {
    ERROR_DETAILS = printSuite(suite, title);
    print('\n  Duration: ', TEXT_FORMAT.YELLOW, `${Math.ceil(suite.meta.duration) / 1000}s`);
  });

  const entriesList = Object.entries(ERROR_DETAILS);
  if (entriesList.length) {
    print(TEXT_FORMAT.BOLD, '\nError details:');

    entriesList.forEach((item, index) => {
      const title = item[0];
      const error = item[1];

      print(TEXT_FORMAT.BOLD, `\n${index + 1}) ${title}`);
      printErrorDetails(error);
    });
  }
};


module.exports = {
  printDatabase,
};
