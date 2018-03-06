/**
 * Error has containing all possible errors
 *
 * @constant
 * @type {Object}
 * @default
 */
const ERROR = {
  INTERVAL: 'ERR_CLEAR_INTERVAL',
  TIMEOUT: 'ERR_CLEAR_TIMEOUT',
};

/**
 * A Map meant to store rejection functions for each Promise
 *
 * @type {Map<Promise, Function>}
 */
const rejectMap = new Map();

/**
 * A reference to NodeJS's core <tt>setTimeout</tt> and <tt>setInterval</tt>
 *
 * @constant
 * @type {object}
 * @private
 */
const oldies = {
  setTimeout, setInterval, clearTimeout, clearInterval,
};


module.exports = {
  ERROR,
  rejectMap,
  oldies,
};
