const TEXT_FORMAT = {
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  RESET: '\x1b[0m',
  BOLD: '\x1b[1m',
};
/**
 * Returns true if value is a Number
 * @param {any} value
 * @returns {boolean}
 */
const isNumber = value => Object.prototype.toString.call(value) === '[object Number]';

/**
 * Returns true if value is a Function
 * @param {any} value
 * @returns {boolean}
 */
const isFunction = value => Object.prototype.toString.call(value) === '[object Function]';

/**
 * Returns true if value is a Object
 * @param {any} value
 * @returns {boolean}
 */
const isObject = value => Object.prototype.toString.call(value) === '[object Object]';

/**
 * Prints arguments. At the moment only on console.
 * @param {any} args
 */
/* eslint-disable no-console */
const print = (...args) => console.log(...args, TEXT_FORMAT.RESET);

/**
 * Logs, if logging is enabled. At the moment logging is enabled by default.
 * @param {any} args
 */
const log = () => ({
  error(...args) {
    console.log(TEXT_FORMAT.RED, '[ERROR]', ...args, TEXT_FORMAT.RESET);
  },
  info(...args) {
    console.log('[INFO]', ...args, TEXT_FORMAT.RESET);
  },
});
/* eslint-enable no-console */

/**
 * Gets the string name of Error entries
 * @param {any} value
 */
const getErrorName = value => (isFunction(value) ? value.name : String(value));

module.exports = {
  isNumber,
  isFunction,
  isObject,
  getErrorName,
  print,
  log,
  TEXT_FORMAT,
};
