/* eslint-disable no-global-assign */
const { isNumber } = require('../../utils');
const { ERROR, rejectMap, oldies } = require('./_const');

/**
 * Overrides NodeJS's core setInterval replacing it with a Promise-based one.
 *
 * @param {function} callback   The callback to be executed every `interval` ms
 * @param {number} interval     How many ms to wait before `callback`
 *
 * @returns {Promise}
 */
setInterval = (callback, interval) => {
  if (!isNumber(interval) && interval >= 0) {
    throw new TypeError('Timeout should be a positive number!');
  }

  let id;
  let rej;

  const promise = new Promise((resolve, reject) => {
    rej = reject;
    id = oldies.setInterval(() => {
      try {
        callback();
      } catch (e) {
        reject(e);
        oldies.clearInterval(id);
      }
    }, interval);
  })
    .catch((e) => {
      if (e === ERROR.INTERVAL) {
        oldies.clearInterval(id);
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
clearInterval = (promise) => {
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
    throw new Error('Unable to find interval promise');
  }

  reject(ERROR.INTERVAL);
  rejectMap.delete(timeout);
};
