/* eslint-disable no-global-assign */

const { isNumber } = require('./_utils');
const assert = require('assert');

/**
 * A reference to NodeJS's core <tt>setTimeout</tt> and <tt>setInterval</tt>
 * @constant
 * @type {object}
 * @private
 */
const oldies = { setTimeout, setInterval };

/**
 * Overrides NodeJS's core <tt>setTimeout</tt> replacing it with a Promise-based one.
 *
 * @param {function} callback   The callback to be executed after <tt>timeout</tt> ms
 * @param {number} timeout      How many ms to wait before calling <tt>timeout</tt>
 *
 * @returns {Promise}
 */
setTimeout = (callback, timeout) => new Promise((resolve, reject) => {
  if (!isNumber(timeout) && timeout >= 0) {
    reject(new TypeError('Timeout should be a positive number!'));
  }

  oldies.setTimeout(() => {
    try {
      callback();
      resolve();
    } catch (e) {
      reject(e);
    }
  }, timeout);
});

/**
 * Overrides NodeJS's core <tt>setInterval</tt> replacing it with a Promise-based one.
 *
 * @param {function} callback   The callback to be executed every <tt>interval</tt> ms
 * @param {number} interval     How many ms to wait before calling <tt>interval</tt>
 *
 * @returns {Promise}
 */
setInterval = (callback, interval) => new Promise((resolve, reject) => {
  if (!isNumber(interval) && interval >= 0) {
    reject(new TypeError('Interval should be a positive number!'));
  }

  oldies.setInterval(() => {
    try {
      callback();
      resolve();
    } catch (e) {
      reject(e);
    }
  }, interval);
});

/**
 * @namespace assert
 * @description Following methods are added to Node's <tt>assert</tt> library.
 */

/**
 * Checks if async functions throw. It has the same signature as <tt>assert.throws</tt>
 *
 * @param {function}                  block     Function to check
 * @param {constructor|string|RegExp} [error]   Expected thrown error
 * @param {string}                    [message] Message given by <tt>AssertionError</tt>
 *
 * @returns {Promise}
 */
assert.throwsAsync = async (block, error, message) => {
  let f = () => {
  };
  try {
    await block();
  } catch (e) {
    f = () => {
      throw e;
    };
  } finally {
    assert.throws(f, error, message);
  }
};

/**
 * Checks if async functions don't throw. It has the same signature as <tt>assert.doesNotThrow</tt>
 *
 * @param {function}                  block     Function to check
 * @param {constructor|string|RegExp} [error]   Expected non-thrown error
 * @param {string}                    [message] Message given by <tt>AssertionError</tt>
 *
 * @returns {Promise}
 */
assert.doesNotThrowAsync = async (block, error, message) => {
  let f = () => {
  };
  try {
    await block();
  } catch (e) {
    f = () => {
      throw e;
    };
  } finally {
    assert.doesNotThrow(f, error, message);
  }
};
/* eslint-enable no-global-assign */
