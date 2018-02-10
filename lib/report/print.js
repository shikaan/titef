// const { isFunction } = require('../_utils');

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
// const getErrorName = value => (isFunction(value) ? value.name : String(value));

const printSpec = (spec) => {
  if (spec.result === RESULT.SUCCESS) {
    print(TEXT_FORMAT.GREEN, `[ ✔ ] ${spec.title}`);
  } else if (spec.result === RESULT.IGNORED) {
    print(TEXT_FORMAT.YELLOW, `[ - ] ${spec.title}`);
  } else if (spec.result === RESULT.PENDING) {
    print(TEXT_FORMAT.GREY, `[...] ${spec.title}`);
  } else {
    print(TEXT_FORMAT.RED, `[ ✕ ] ${spec.title}`);
  }
};

const printRecords = async () => {
  await Promise.all(promises);

  Object.keys(records).forEach((suite) => {
    print(TEXT_FORMAT.BOLD, `SUITE: ${suite}`);

    Object.values(records[suite]).forEach(printSpec);
  });
};

// const printErrorDetails = (spec) => {
//   const { payload } = spec;
//   const message = payload.message || payload.toString().split(':').slice(-1)[0];
//
//   if (payload.code === 'ERR_ASSERTION' || /^AssertionError/.test(payload.toString())) {
//     const operator = getErrorName(payload.operator);
//     const expected = getErrorName(payload.expected);
//     const actual = getErrorName(payload.actual);
//
//     print(`ASSERTION ERROR: ${message}`);
//
//     /**
//      * Printing detailed report if either:
//      * - operator is generic;
//      * - operator is missing and we have expected and actual;
//      */
//     if (operator === 'fail' || (!operator && payload.expected && payload.actual)) {
//       print(`  Expected: ${expected}`);
//       print(`  Actual:   ${actual}`);
//     }
//   } else {
//     print(`UNHANDLED ERROR: ${message}`);
//     print(payload);
//   }
// };

module.exports = {
  printRecords,
};
