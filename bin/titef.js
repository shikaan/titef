(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const { resolve } = __webpack_require__(3);
const { existsSync } = __webpack_require__(4);
const printHelp = __webpack_require__(5);

// Removes `node` and `__filename` from arguments list
const nonTrivialArguments = process.argv.slice(2);

const showHelp = nonTrivialArguments.find(item => item === '-h' || item === '--help');

if (showHelp) {
  printHelp();
  process.exit(0);
}

// Last argument should always be the file path
const filePath = nonTrivialArguments.length
  ? resolve(nonTrivialArguments[nonTrivialArguments.length - 1])
  : null;

if (!filePath) {
  throw new Error('Missing path to test file! Use `titef --help` for further information');
} else if (!existsSync(filePath)) {
  throw new Error('The specified file does not exist! Use `titef --help` for further information');
}

__webpack_require__(6);

/**
 * This is used to prevent webpack to parse the require call
 */
// eslint-disable-next-line no-eval
eval('require')(filePath);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const { print } = __webpack_require__(0);

module.exports = () => {
  print(`Usage: titef [OPTIONS] [FILE]
Executes test files written in Titef framework.

Options:
  -h, --help            shows this help
  `);
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-global-assign */

__webpack_require__(7);
__webpack_require__(8);
__webpack_require__(9);

/* eslint-enable no-global-assign */


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-global-assign */
const { isNumber } = __webpack_require__(0);
const { ERROR, rejectMap, oldies } = __webpack_require__(1);

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


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-global-assign */
const { isNumber } = __webpack_require__(0);
const { ERROR, rejectMap, oldies } = __webpack_require__(1);

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


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const assert = __webpack_require__(10);

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
  let f = () => {};

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
  let f = () => {};

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


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ })
/******/ ])));