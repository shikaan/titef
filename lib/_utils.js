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
const isFunction = value => /\[object (Async)?Function]/.test(Object.prototype.toString.call(value));

/**
 * Returns true if value is a Object
 * @param {any} value
 * @returns {boolean}
 */
const isObject = value => Object.prototype.toString.call(value) === '[object Object]';

module.exports = {
  isNumber,
  isFunction,
  isObject,
};
