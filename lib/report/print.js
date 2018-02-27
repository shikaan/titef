const { isFunction } = require('../_utils');

const {
  records, promises, RESULT, TEXT_FORMAT,
} = require('./_const');

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
const isAssertionFailure = error => error.code === 'ERR_ASSERTION' || error.toString().indexOf('AssertionError') === 0;

/**
 * Print details of an error in the report.
 * Error can be either an assertion failure or a generic error.
 * @param error {Error}
 */
const printErrorDetails = (error) => {
  const message = getErrorMessage(error);

  if (isAssertionFailure(error)) {
    const operator = getErrorName(error.operator);
    const expected = getErrorName(error.expected);
    const actual = getErrorName(error.actual);

    print(`ASSERTION FAILURE: ${message}`);

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
  } else {
    print(`ERROR: ${message}`);
  }

  print(TEXT_FORMAT.GREY, error.stack);
};

/**
 * Prints all the records in the shared record map
 * @returns {Promise<void>}
 */
const printRecords = async () => {
  const ERROR_DETAILS = {};
  await Promise.all(...Object.values(promises));

  Object.keys(records).forEach((suite) => {
    print(TEXT_FORMAT.BOLD, `SUITE: ${suite}`);

    Object.values(records[suite]).forEach((spec) => {
      if (spec.result === RESULT.SUCCESS) {
        print(TEXT_FORMAT.GREEN, `[ ✔ ] ${spec.title}`);
      } else if (spec.result === RESULT.IGNORED) {
        print(TEXT_FORMAT.YELLOW, `[ - ] ${spec.title}`);
      } else if (spec.result === RESULT.PENDING) {
        print(TEXT_FORMAT.GREY, `[...] ${spec.title}`);
      } else {
        print(TEXT_FORMAT.RED, `[ ✕ ] ${spec.title}`);
        ERROR_DETAILS[`${spec.suite} > ${spec.title}`] = spec.payload;
      }
    });
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
  printRecords,
};
