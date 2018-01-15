/* eslint-disable no-global-assign */
const { isNumber } = require('../_utils');
const { ERROR, rejectMap, oldies } = require('../_const');

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
      }
    }, timeout);
  })
    .catch((e) => {
      if (e === ERROR.TIMEOUT) {
        oldies.clearTimeout(id);
      }
    });

  // Save rejection function to an map of rejects
  rejectMap.set(promise, rej);
  return promise;
};

/**
 * Replace NodeJS' clearTimeout to deal with the Promise-based setTimeout
 *
 * @param {Promise} timeout
 */
clearTimeout = (timeout) => {
  const reject = rejectMap.has(timeout) ? rejectMap.get(timeout) : null;

  if (reject) {
    reject(ERROR.TIMEOUT);
    rejectMap.delete(timeout);
  }
};
