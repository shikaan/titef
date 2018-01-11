/** @namespace titef */

const {
  TEXT_FORMAT,
  print,
  getErrorName,
} = require('./_utils');

/**
 * @summary Adds a <tt>spec</tt> to a <tt>suite</tt>.
 *
 * It should be used inside the callback of a <tt>suite</tt>, but you aren't forced to do so.
 *
 * @example <caption>my-class.specs.js</caption>
 *  const { spec, suite } = require('titef');
 *  const assert = require('assert');
 *  const myClass = require('./my-class');
 *
 *  suite('myClass:myMethod', () => {
 *    spec('exists', () => {
 *      assert(!!myClass.myMethod);
 *    })
 *  })
 *
 * @function titef~spec
 *
 * @since 0.0.1
 *
 * @async
 *
 * @param {string}    title     Specification title. It's used to write the report.
 * @param {function}  callback  The function executed when <tt>spec</tt> is run.

 * @returns {Promise<void>}
 */
const spec = async (title, callback) => {
  try {
    if (callback[Symbol.toStringTag] === 'AsyncFunction') {
      try {
        await callback();
      } catch (e) {
        throw e;
      }
    } else {
      callback();
    }
    print(TEXT_FORMAT.GREEN, `[ ✔ ] ${title}`);
  } catch (e) {
    const message = e.toString().split(':').slice(-1)[0];
    print(TEXT_FORMAT.RED, `[ ✕ ] ${title}`);
    if (e.code === 'ERR_ASSERTION') {
      const operator = getErrorName(e.operator);
      const expected = getErrorName(e.expected);
      const actual = getErrorName(e.actual);

      print(`ASSERTION ERROR:${message}`);

      if (operator === 'fail') {
        print(`  Expected: ${expected}`);
        print(`  Actual:   ${actual}`);
      }
    } else {
      print(`UNHANDLED ERROR:${message}`);
      print(e);
    }
  }
};

const xspec = async (title) => {
  print(TEXT_FORMAT.YELLOW, `[ - ] ${title}`);
};

module.exports = {
  spec,
  xspec,
};
