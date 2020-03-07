/* eslint-disable no-global-assign */
const { isNumber } = require('../../utils');
const { ERROR, rejectMap, oldies } = require('./_const');

/**
 * Overrides NodeJS' core setTimeout replacing it with a Promise-based one.
 *
 * @param {function} callback   The callback to be executed after `timeout` ms
 * @param {number} timeout      How many ms to wait before calling `callback`
 *
 * @returns {Promise}
 */
setTimeout = (callback, timeout) => {
  if (!isNumber(timeout) && timeout >= 0) {
    throw new TypeError('Timeout should be a positive number!');
  }

  let id;
  let rej;

  const promise = new Promise((resolve, reject) => {
    rej = reject;
    id = oldies.setTimeout(() => {
      try {
        callback();
        resolve();
      } catch (e) {
        reject(e);
        oldies.clearTimeout(id);
      }
    }, timeout);
  })
    .catch((e) => {
      if (e === ERROR.TIMEOUT) {
        oldies.clearTimeout(id);
      } else {
        throw e;
      }
    });

  // Save rejection function to an map of rejects
  rejectMap.set(promise, rej);
  return promise;
};

/**
 * Replace NodeJS' clearTimeout to deal with the Promise-based setTimeout
 *
 * @param {Promise} [promise]
 */
clearTimeout = (promise) => {
  const [timeout, reject] = (() => {
    if (promise) {
      return [promise, rejectMap.get(promise)];
    }
    /**
     * Returns first reject in map if no promise is provided.
     * Needed to use this in REPL
     */
    return [rejectMap.entries()];
  })();

  if (!reject) {
    throw new Error('Unable to find timeout');
  }

  reject(ERROR.TIMEOUT);
  rejectMap.delete(timeout);
};
