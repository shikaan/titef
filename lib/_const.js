/**
 * Error has containing all possible errors
 * @constant
 * @type {Map}
 * @default
 */
const ERROR = {
  INVALID_ARGUMENT: 'ERR_INVALID_ARGUMENT',
  INTERVAL: 'ERR_CLEAR_INTERVAL',
  TIMEOUT: 'ERR_CLEAR_TIMEOUT',
};

const rejectMap = new Map();

/**
 * A reference to NodeJS's core <tt>setTimeout</tt> and <tt>setInterval</tt>
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
