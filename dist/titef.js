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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

const EVENT = {
  PROCESS: {
    EXIT: 'process:exit',
    EXIT_CODE: {
      FAILURE: 'process:exit-code:failure',
    },
  },
  DATABASE: {
    RECORDSET: {
      CREATE: 'database:recordset:create',
    },
    RECORD: {
      CREATE: 'database:record:create',
      UPDATE: 'database:record:update',
      CLOSE: 'database:record:close',
    },
    PROCESS: {
      ENDED: 'database:process:ended',
    },
  },
  SUITE: {
    STARTED: 'suite:started',
  },
  SPEC: {
    STARTED: 'spec:started',
    SUCCESS: 'spec:success',
    IGNORE: 'spec:ignore',
    FAILURE: 'spec:failure',
    ENDED: 'spec:ended',
  },
  REPORTER: {
    REPORT: {
      START: 'reporter:report:start',
      ENDED: 'reporter:report:ended',
    },
  },
};

const RESULT = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  IGNORED: 'IGNORED',
};

const RESULTS = Object.values(RESULT);


module.exports = {
  EVENT,
  RESULT,
  RESULTS,
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const EventEmitter = __webpack_require__(0);
const { EVENT, RESULT } = __webpack_require__(1);
const ConsoleReporter = __webpack_require__(7);
const Database = __webpack_require__(9);
const ProcessManager = __webpack_require__(10);

class EventBus extends EventEmitter {
  constructor(name) {
    super(name);

    // subscribe reporters
    this._reporters = [ConsoleReporter];

    this.on(EVENT.SUITE.STARTED, (title) => {
      Database.emit(EVENT.DATABASE.RECORDSET.CREATE, title);
    });

    this.on(EVENT.SPEC.STARTED, (title) => {
      Database.emit(EVENT.DATABASE.RECORD.CREATE, title);
    });

    this.on(EVENT.SPEC.SUCCESS, (title) => {
      Database.emit(EVENT.DATABASE.RECORD.UPDATE, title, RESULT.SUCCESS);
    });

    this.on(EVENT.SPEC.IGNORE, (title) => {
      Database.emit(EVENT.DATABASE.RECORD.UPDATE, title, RESULT.IGNORED);
    });

    this.on(EVENT.SPEC.FAILURE, (title, payload) => {
      Database.emit(EVENT.DATABASE.RECORD.UPDATE, title, RESULT.FAILURE, payload);
      ProcessManager.emit(EVENT.PROCESS.EXIT_CODE.FAILURE);
    });

    this.on(EVENT.SPEC.ENDED, (title) => {
      Database.emit(EVENT.DATABASE.RECORD.CLOSE, title);
    });

    Database.on(EVENT.DATABASE.PROCESS.ENDED, (database) => {
      this._reporters.forEach((reporter) => {
        reporter.emit(EVENT.REPORTER.REPORT.START, database);
      });
    });

    this._reporters.forEach((reporter) => {
      reporter.on(EVENT.REPORTER.REPORT.ENDED, () => {
        ProcessManager.emit(EVENT.PROCESS.EXIT);
      });
    });
  }
}

module.exports = new EventBus();


/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports) {

const TEXT_FORMAT = {
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  RESET: '\x1b[0m',
  BOLD: '\x1b[1m',
  GREY: '\x1b[90m',
};

module.exports = {
  TEXT_FORMAT,
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Suite = __webpack_require__(6);
const Spec = __webpack_require__(11);

module.exports = {
  suite: Suite.suite,
  spec: Spec.spec,
  xspec: Spec.spec,
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const EventEmitter = __webpack_require__(0);
const EventBus = __webpack_require__(2);
const {
  isFunction,
  isObject,
} = __webpack_require__(3);

const { EVENT } = __webpack_require__(1);

class Suite extends EventEmitter {
  static argumentParser(args, defaultOptions) {
    const opts = args[0];
    const fn = args[1];
    switch (args.length) {
      case 1:
        if (!isFunction(opts)) {
          throw new TypeError('Second argument must be a function!');
        }
        return {
          options: defaultOptions,
          callback: opts,
        };
      case 2:
        if (!isObject(opts)) {
          throw new TypeError('Second argument must be an object!');
        }

        if (!isFunction(fn)) {
          throw new TypeError('Third argument must be a function!');
        }

        return {
          options: Object.assign({}, defaultOptions, opts),
          callback: fn,
        };

      default:
        throw new TypeError(`Invalid arguments! Expected (title: string, options?: object, callback: function). Actual: ${
          args.map(String).join()}`);
    }
  }

  static suite(title, ...args) {
    const saneTitle = String(title);

    EventBus.emit(EVENT.SUITE.STARTED, saneTitle);

    const defaultOptions = {
      title: saneTitle,
      // eslint-disable no-new-func
      setup: Function(),
      teardown: Function(),
      // eslint-enable no-new-func
    };

    const { options, callback } = Suite.argumentParser(args, defaultOptions);

    if (isFunction(options.setup)) {
      options.setup();
    } else {
      throw new TypeError('Setup must be a function!');
    }

    callback();

    if (isFunction(options.teardown)) {
      options.teardown();
    } else {
      throw new TypeError('Teardown must be a function!');
    }
  }
}

module.exports = Suite;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const EventEmitter = __webpack_require__(0);
const { printDatabase } = __webpack_require__(8);
const { EVENT } = __webpack_require__(1);


class Reporter extends EventEmitter {
  constructor() {
    super();

    this.on(EVENT.REPORTER.REPORT.START, async (database) => {
      await printDatabase(database);
      this.emit(EVENT.REPORTER.REPORT.ENDED);
    });
  }
}

module.exports = new Reporter();


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const { isFunction } = __webpack_require__(3);
const { TEXT_FORMAT } = __webpack_require__(4);
const { RESULT } = __webpack_require__(1);

/**
 * Prints on stdout
 */
const print = (...args) => {
  const line = [...args, TEXT_FORMAT.RESET, '\n'];
  return process.stdout.write(line.map(String).join(''));
};

/**
 * Gets the string name of Error entries
 * @param {any} value
 */
const getErrorName = value => (isFunction(value) ? value.name : String(value));

/**
 * Tries to extract an error message from an error
 * @param error
 * @returns {string}
 */
const getErrorMessage = (error) => {
  if (error.message) {
    return error.message;
  }

  // In case of something like 'ERROR: message' returns 'message'
  return error.toString().split(':').slice(-1)[0];
};

/**
 * Returns true if error is an Assertion Failure
 * @param error {Error}
 * @returns {boolean}
 */
const isAssertionFailure = error => error.code === 'ERR_ASSERTION' || error.toString().indexOf('AssertionError') === 0;

/**
 * Print details of an error in the report.
 * Error can be either an assertion failure or a generic error.
 * @param error {Error}
 */
const printErrorDetails = (error) => {
  const message = getErrorMessage(error);

  if (isAssertionFailure(error)) {
    const operator = getErrorName(error.operator);
    const expected = getErrorName(error.expected);
    const actual = getErrorName(error.actual);

    print(`ASSERTION FAILURE: ${message}`);

    /**
     * Printing detailed report if either:
     * - operator is generic;
     * - operator is missing and we have expected and actual;
     *
     * Otherwise the message already contains the failure
     */
    if (operator === 'fail') {
      print('\tUnexpected:\t', TEXT_FORMAT.RED, `${actual}`);
    } else if (!operator && error.expected && error.actual) {
      print('\tExpected:\t', TEXT_FORMAT.GREEN, expected);
      print('\tActual:\t\t', TEXT_FORMAT.RED, actual);
    }
  } else {
    print(`ERROR: ${message}`);
  }

  print(TEXT_FORMAT.GREY, error.stack);
};

/**
 * Prints on stdout the given in-memory database
 * @returns {Promise<void>}
 */
const printDatabase = async (database) => {
  const ERROR_DETAILS = {};

  Object.keys(database).forEach((suite) => {
    print(TEXT_FORMAT.BOLD, `SUITE: ${suite}`);

    Object.values(database[suite]).forEach((spec) => {
      if (spec.result === RESULT.SUCCESS) {
        print(TEXT_FORMAT.GREEN, `[ ✔ ] ${spec.title}`);
      } else if (spec.result === RESULT.IGNORED) {
        print(TEXT_FORMAT.YELLOW, `[ - ] ${spec.title}`);
      } else if (spec.result === RESULT.PENDING) {
        print(TEXT_FORMAT.GREY, `[...] ${spec.title}`);
      } else {
        print(TEXT_FORMAT.RED, `[ ✕ ] ${spec.title}`);
        ERROR_DETAILS[`${spec.suite} > ${spec.title}`] = spec.payload;
      }
    });
  });

  const entriesList = Object.entries(ERROR_DETAILS);
  if (entriesList.length) {
    print(TEXT_FORMAT.BOLD, '\nError details:');

    entriesList.forEach((item, index) => {
      const title = item[0];
      const error = item[1];

      print(TEXT_FORMAT.BOLD, `\n${index + 1}) ${title}`);
      printErrorDetails(error);
    });
  }
};


module.exports = {
  printDatabase,
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const EventEmitter = __webpack_require__(0);
const { EVENT, RESULT, RESULTS } = __webpack_require__(1);

class Database extends EventEmitter {
  constructor() {
    super();

    this._recordsets = {};
    this._processed = 0;
    this._currentSuite = null;

    this.on(EVENT.DATABASE.RECORDSET.CREATE, this.createRecordset);
    this.on(EVENT.DATABASE.RECORD.CREATE, this.createRecord);
    this.on(EVENT.DATABASE.RECORD.UPDATE, this.updateRecord);
    this.on(EVENT.DATABASE.RECORD.CLOSE, this.closeRecord);
  }

  createRecordset(suite) {
    this._currentSuite = suite;
    this._recordsets[this._currentSuite] = {};
  }

  createRecord(title) {
    if (!this._currentSuite) {
      throw new TypeError('Unable to find current Suite!');
    }

    if (!title) {
      throw new TypeError('Missing record title!');
    }

    if (!this._recordsets[this._currentSuite]) {
      throw new TypeError(`Missing or null records list for ${this._currentSuite}`);
    }

    this._recordsets[this._currentSuite][title] = {
      title,
      suite: this._currentSuite,
      result: RESULT.PENDING,
      payload: null,
    };
  }

  updateRecord(title, result, payload) {
    if (!this._currentSuite) {
      throw new TypeError('Unable to find current Suite!');
    }

    if (!RESULTS.includes(result)) {
      throw new TypeError(`Result should be one of ${RESULTS.join()}. Got ${result}.`);
    }

    this._recordsets[this._currentSuite][title] =
      Object.assign({}, this._recordsets[this._currentSuite][title], { result, payload });
  }

  closeRecord() {
    this._processed += 1;
    const currentSuiteLength = Object.keys(this._recordsets[this._currentSuite]).length;
    const isLastRecord = this._processed === currentSuiteLength;

    if (isLastRecord) {
      this.emit(EVENT.DATABASE.PROCESS.ENDED, this._recordsets);
    }
  }
}

module.exports = new Database();


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const EventEmitter = __webpack_require__(0);
const { EVENT } = __webpack_require__(1);

class ProcessManager extends EventEmitter {
  constructor() {
    super();

    this._exitCode = 0;

    this.on(EVENT.PROCESS.EXIT, () => {
      process.exit(this._exitCode);
    });

    this.on(EVENT.PROCESS.EXIT_CODE.FAILURE, () => {
      this._exitCode = 1;
    });
  }
}

module.exports = new ProcessManager();


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const EventEmitter = __webpack_require__(0);
const EventBus = __webpack_require__(2);
const { EVENT } = __webpack_require__(1);

class Spec extends EventEmitter {
  static async spec(title, callback) {
    EventBus.emit(EVENT.SPEC.STARTED, title);

    try {
      await callback();
      EventBus.emit(EVENT.SPEC.SUCCESS, title);
    } catch (e) {
      EventBus.emit(EVENT.SPEC.FAILURE, title, e);
    }

    EventBus.emit(EVENT.SPEC.ENDED, title);
  }

  static async xspec(title) {
    EventBus.emit(EVENT.SPEC.STARTED, title);
    EventBus.emit(EVENT.SPEC.IGNORE, title);
    EventBus.emit(EVENT.SPEC.ENDED, title);
  }
}

module.exports = Spec;


/***/ })
/******/ ])));