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
 * Logs, if logging is enabled. At the moment logging is enabled by default.
 * @param {any} args
 */
class log {
  static error(...args) {
    process.stdout.print('[ERROR]', ...args);
  }
  static info(...args) {
    process.stdout.print('[INFO]', ...args);
  }
}

module.exports = {
  isNumber,
  isFunction,
  isObject,
  log,
};
