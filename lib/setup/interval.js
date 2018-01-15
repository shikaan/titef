/* eslint-disable no-global-assign */
const { isNumber } = require('../_utils');
const { ERROR, rejectMap, oldies } = require('../_const');

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
      }
    }, interval);
  })
    .catch((e) => {
      if (e === ERROR.INTERVAL) {
        oldies.clearInterval(id);
      }
    });

  // Save rejection function to an map of rejects
  rejectMap.set(promise, rej);
  return promise;
};

/**
 * Replace NodeJS' clearTimeout to deal with the Promise-based setTimeout
 *
 * @param {Promise} interval
 */
clearInterval = (interval) => {
  const reject = rejectMap.has(interval) ? rejectMap.get(interval) : null;

  if (reject) {
    reject(ERROR.INTERVAL);
    rejectMap.delete(interval);
  }
};
