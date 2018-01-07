/* eslint-disable no-global-assign */
/**
 * This is meant to replace setInterval and setTimeout with
 * promise based equivalent.
 */
const { isNumber } = require('./_utils');
const assert = require('assert');

const oldies = { setTimeout, setInterval };

setTimeout = (callback, timeout) => new Promise((resolve, reject) => {
  if (!isNumber(timeout)) {
    reject(new TypeError('Timeout should be a Number!'));
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

setInterval = (callback, interval) => new Promise((resolve, reject) => {
  if (!isNumber(interval)) {
    reject(new TypeError('Interval should be a Number!'));
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

assert.throwsAsync = async (fn, regExp) => {
  let f = () => { };
  try {
    await fn();
  } catch (e) {
    f = () => { throw e; };
  } finally {
    assert.throws(f, regExp);
  }
};

assert.doesNotThrowAsync = async (fn, regExp) => {
  let f = () => { };
  try {
    await fn();
  } catch (e) {
    f = () => { throw e; };
  } finally {
    assert.doesNotThrow(f, regExp);
  }
};
/* eslint-enable no-global-assign */
