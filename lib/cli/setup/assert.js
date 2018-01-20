const assert = require('assert');

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
