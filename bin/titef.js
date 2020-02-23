#! /usr/bin/env node
!function(e,n){for(var t in n)e[t]=n[t]}(exports,function(e){var n={};function t(r){if(n[r])return n[r].exports;var s=n[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,t),s.l=!0,s.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var s in e)t.d(r,s,function(n){return e[n]}.bind(null,s));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s="./lib/cli/index.js")}({"./lib/_const.js":function(module,exports){eval("const EVENT = {\n  PROCESS: {\n    EXIT: 'process:exit',\n    EXIT_CODE: {\n      FAILURE: 'process:exit-code:failure',\n    },\n  },\n  DATABASE: {\n    RECORDSET: {\n      CREATE: 'database:recordset:create',\n      CLOSED: 'database:recordset:closed',\n    },\n    RECORD: {\n      CREATE: 'database:record:create',\n      UPDATE: 'database:record:update',\n      CLOSE: 'database:record:close',\n    },\n    PROCESS: {\n      ENDED: 'database:process:ended',\n    },\n  },\n  SUITE: {\n    STARTED: 'suite:started',\n    HOOKS: {\n      REGISTER: 'suite:hooks:register',\n      UNREGISTER: 'suite:hooks:unregister',\n    },\n    ENDED: 'suite:ended',\n  },\n  SPEC: {\n    SETUP: {\n      REGISTER: 'spec:before-each:register',\n      UNREGISTER: 'spec:before-each:unregister',\n    },\n    TEARDOWN: {\n      REGISTER: 'spec:after-each:register',\n      UNREGISTER: 'spec:after-each:unregister',\n    },\n    STARTED: 'spec:started',\n    SUCCESS: 'spec:success',\n    IGNORE: 'spec:ignore',\n    FAILURE: 'spec:failure',\n    ENDED: 'spec:ended',\n  },\n  REPORTER: {\n    REPORT: {\n      START: 'reporter:report:start',\n      ENDED: 'reporter:report:ended',\n    },\n  },\n};\n\nconst RESULT = {\n  PENDING: 'PENDING',\n  SUCCESS: 'SUCCESS',\n  FAILURE: 'FAILURE',\n  IGNORED: 'IGNORED',\n};\n\nconst RESULTS = Object.values(RESULT);\n\nconst NODE_MAJOR_VERSION = Number.parseInt((/(\\d+)./).exec(process.version)[1], 10);\n\nmodule.exports = {\n  EVENT,\n  NODE_MAJOR_VERSION,\n  RESULT,\n  RESULTS,\n};\n\n\n//# sourceURL=webpack:///./lib/_const.js?")},"./lib/_utils.js":function(module,exports){eval("/**\n * Returns true if value is a Number\n * @param {any} value\n * @returns {boolean}\n */\nconst isNumber = (value) => Object.prototype.toString.call(value) === '[object Number]';\n\n/**\n * Returns true if value is a Function\n * @param {any} value\n * @returns {boolean}\n */\nconst isFunction = (value) => /\\[object (Async)?Function]/.test(Object.prototype.toString.call(value));\n\n/**\n * Returns true if value is a Object\n * @param {any} value\n * @returns {boolean}\n */\nconst isObject = (value) => Object.prototype.toString.call(value) === '[object Object]';\n\nmodule.exports = {\n  isNumber,\n  isFunction,\n  isObject,\n};\n\n\n//# sourceURL=webpack:///./lib/_utils.js?")},"./lib/cli/argv-parser.js":function(module,exports){eval("class ArgvParser {\n  /**\n   * @param {[]string} argv - Argv Array\n   */\n  constructor(argv) {\n    this.argv = [...argv];\n  }\n\n  /**\n   * Get flag value out of argv options array.\n   *\n   * @private\n   *\n   * @example\n   * getFlagValue(['node', '-h'], '--help', '-h')       // true\n   * getFlagValue(['node', '-h'], '--version', '-v')    // false\n   * getFlagValue(['node', '--help'], '--help', '-h')   // true\n   *\n   * @param {string} flag\n   * @param {string} shortcut\n   *\n   * @returns {boolean}\n   */\n  getFlagValue(flag, shortcut) {\n    return shortcut\n      ? !!this.argv.find((item) => item === flag || item === shortcut)\n      : !!this.argv.find((item) => item === flag);\n  }\n\n  /**\n   * Get a argument value out of argv options array.\n   *\n   * @private\n   *\n   * @example\n   * getArgumentValue(['node', '-f', 'bar'], '--foo', '-f') // 'bar'\n   * getArgumentValue(['node', '-f=bar'], '--foo', '-f') // 'bar'\n   * getArgumentValue(['node', '--foo=bar'], '--foo', '-f') // 'bar'\n   * getArgumentValue(['node', '--foo=bar'], '--zoo', '-z') // ''\n   *\n   * @param {string} argument\n   * @param {string} shortcut\n   *\n   * @returns {string}\n   */\n  getArgumentValue(argument, shortcut) {\n    const optionIndex = this.argv.findIndex((i) => i.includes(argument) || i.includes(shortcut));\n    const option = this.argv[optionIndex];\n\n    if (!option) {\n      return '';\n    }\n\n    return option.includes('=')\n      ? option.split('=')[1]\n      : this.argv[optionIndex + 1];\n  }\n\n  /**\n   * Get a parameter value out of argv options array.\n   *\n   * @private\n   *\n   * @example\n   * getParameterValue(['node', '-f', 'bar', 'lol']) // 'lol'\n\n   * @param {string} argument\n   * @param {string} shortcut\n   *\n   * @returns {string}\n   */\n  getParameterValue() {\n    return this.argv[this.argv.length - 1];\n  }\n\n  /**\n   * Return CLI Options in the shape of an object\n   *\n   * @returns {{ ArgvParser.CLI_OPTION: string|boolean }}\n   */\n  getCLIOptions() {\n    const help = this.getFlagValue('--help', '-h');\n    const version = this.getFlagValue('--version', '-v');\n    const extensions = this.getArgumentValue('--extensions', '-e');\n    const directory = this.getParameterValue();\n\n    return {\n      [ArgvParser.CLI_OPTION.HELP]: help,\n      [ArgvParser.CLI_OPTION.VERSION]: version,\n      [ArgvParser.CLI_OPTION.EXTENSIONS]: extensions,\n      [ArgvParser.CLI_OPTION.DIRECTORY]: directory,\n    };\n  }\n}\n\nArgvParser.CLI_OPTION = {\n  HELP: 'help',\n  VERSION: 'version',\n  EXTENSIONS: 'extensions',\n  DIRECTORY: 'directory',\n};\n\nmodule.exports = ArgvParser;\n\n\n//# sourceURL=webpack:///./lib/cli/argv-parser.js?")},"./lib/cli/cli-printer.js":function(module,exports){eval("class CLIPrinter {\n  /**\n   * @private\n   * @param  {...any} args\n   */\n  static print(...args) {\n    // eslint-disable-next-line no-console\n    console.log(...args);\n  }\n\n  static printHelp() {\n    CLIPrinter.print(`Usage: titef [OPTIONS] [DIRECTORY]\n    Executes test files written in Titef (https://www.npmjs.com/package/titef) framework.\n\n    Options:\n      -h, --help                shows this help\n      -v, --version             prints version number\n      -e, --extensions [string] comma separated list of file extensions to test\n\n    Example:\n\n      titef -e spec.js,test.js ./src\n    `);\n  }\n\n  static printVersion() {\n    CLIPrinter.print(undefined);\n  }\n}\n\nmodule.exports = CLIPrinter;\n\n\n//# sourceURL=webpack:///./lib/cli/cli-printer.js?")},"./lib/cli/directory-walker.js":function(module,exports,__webpack_require__){eval('const { readdirSync, statSync } = __webpack_require__(/*! fs */ "fs");\nconst { join } = __webpack_require__(/*! path */ "path");\n\n\nclass DirectoryWalker {\n  /**\n   * @param {string} directory\n   * @param {{extensions: string}} options\n   */\n  constructor(directory, options) {\n    this.directory = directory;\n    this.options = DirectoryWalker.parseOptions(options);\n  }\n\n  /**\n   * @private\n   *\n   * @param {{extensions: string}} options\n   */\n  static parseOptions(options) {\n    return {\n      extensions: options.extensions ? options.extensions.split(\',\') : [],\n    };\n  }\n\n  /**\n   * @private\n   *\n   * @param {string} filePath\n   * @returns {boolean}\n   */\n  hasFileAllowedExtension(filePath) {\n    return this.options.extensions.some((extension) => filePath.endsWith(extension));\n  }\n\n  /**\n * Returns the list (possibly) filtred of all the files in the directory\n *\n *  @returns {[]string}\n */\n  getFiles() {\n    const items = readdirSync(this.directory);\n\n    /**\n    * Item can be either a file or a directory\n    */\n    return items.reduce((paths, item) => {\n      const itemPath = join(this.directory, item);\n\n      const stats = statSync(itemPath);\n\n      if (stats.isDirectory()) {\n        const childrenFilteredFiles = this.getFiles(itemPath, this.options);\n\n        paths.push(...childrenFilteredFiles);\n      } else {\n        const fileHasAllowedExtension = this.hasFileAllowedExtension(itemPath);\n\n        if (fileHasAllowedExtension) {\n          paths.push(itemPath);\n        }\n      }\n\n      return paths;\n    }, []);\n  }\n}\n\nmodule.exports = DirectoryWalker;\n\n\n//# sourceURL=webpack:///./lib/cli/directory-walker.js?')},"./lib/cli/index.js":function(module,exports,__webpack_require__){eval('const { resolve } = __webpack_require__(/*! path */ "path");\nconst { existsSync } = __webpack_require__(/*! fs */ "fs");\n\nconst CLIPrinter = __webpack_require__(/*! ./cli-printer */ "./lib/cli/cli-printer.js");\nconst ArgvParser = __webpack_require__(/*! ./argv-parser */ "./lib/cli/argv-parser.js");\nconst DirectoryWalker = __webpack_require__(/*! ./directory-walker */ "./lib/cli/directory-walker.js");\n\n(function main() {\n  const argvParser = new ArgvParser(process.argv);\n  const CLIOptions = argvParser.getCLIOptions();\n\n  if (CLIOptions[ArgvParser.CLI_OPTION.HELP]) {\n    CLIPrinter.printHelp();\n    process.exit(0);\n  } else if (CLIOptions[ArgvParser.CLI_OPTION.VERSION]) {\n    CLIPrinter.printVersion();\n    process.exit(0);\n  }\n\n  const rootDirectoryPath = resolve(CLIOptions[ArgvParser.CLI_OPTION.DIRECTORY]);\n\n  if (!rootDirectoryPath) {\n    throw new Error(\'Missing path to test file! Use `titef --help` for further information\');\n  } else if (!existsSync(rootDirectoryPath)) {\n    throw new Error(`The directory at ${rootDirectoryPath} does not exist! Use \\`titef --help\\` for further information`);\n  }\n\n  // eslint-disable-next-line global-require\n  __webpack_require__(/*! ./setup */ "./lib/cli/setup/index.js");\n  // eslint-disable-next-line global-require\n  __webpack_require__(/*! ../index.js */ "./lib/index.js");\n\n  const directoryWalkerOptions = {\n    extensions: CLIOptions[ArgvParser.CLI_OPTION.EXTENSIONS],\n  };\n  const directoryWalker = new DirectoryWalker(rootDirectoryPath, directoryWalkerOptions);\n  const testFiles = directoryWalker.getFiles();\n\n  testFiles.forEach((testFile) => {\n    /**\n       * This is used to prevent webpack to parse the require call\n       */\n    // eslint-disable-next-line no-eval\n    eval(\'require\')(testFile);\n  });\n}());\n\n\n//# sourceURL=webpack:///./lib/cli/index.js?')},"./lib/cli/setup/_const.js":function(module,exports){eval("/**\n * Error has containing all possible errors\n *\n * @constant\n * @type {Object}\n * @default\n */\nconst ERROR = {\n  INTERVAL: 'ERR_CLEAR_INTERVAL',\n  TIMEOUT: 'ERR_CLEAR_TIMEOUT',\n};\n\n/**\n * A Map meant to store rejection functions for each Promise\n *\n * @type {Map<Promise, Function>}\n */\nconst rejectMap = new Map();\n\n/**\n * A reference to NodeJS's core <tt>setTimeout</tt> and <tt>setInterval</tt>\n *\n * @constant\n * @type {object}\n * @private\n */\nconst oldies = {\n  setTimeout, setInterval, clearTimeout, clearInterval,\n};\n\n\nmodule.exports = {\n  ERROR,\n  rejectMap,\n  oldies,\n};\n\n\n//# sourceURL=webpack:///./lib/cli/setup/_const.js?")},"./lib/cli/setup/index.js":function(module,exports,__webpack_require__){eval('/* eslint-disable no-global-assign */\n\n__webpack_require__(/*! ./timeout */ "./lib/cli/setup/timeout.js");\n__webpack_require__(/*! ./interval */ "./lib/cli/setup/interval.js");\n\n/* eslint-enable no-global-assign */\n\n\n//# sourceURL=webpack:///./lib/cli/setup/index.js?')},"./lib/cli/setup/interval.js":function(module,exports,__webpack_require__){eval("/* eslint-disable no-global-assign */\nconst { isNumber } = __webpack_require__(/*! ../../_utils */ \"./lib/_utils.js\");\nconst { ERROR, rejectMap, oldies } = __webpack_require__(/*! ./_const */ \"./lib/cli/setup/_const.js\");\n\n/**\n * Overrides NodeJS's core setInterval replacing it with a Promise-based one.\n *\n * @param {function} callback   The callback to be executed every `interval` ms\n * @param {number} interval     How many ms to wait before `callback`\n *\n * @returns {Promise}\n */\nsetInterval = (callback, interval) => {\n  if (!isNumber(interval) && interval >= 0) {\n    throw new TypeError('Timeout should be a positive number!');\n  }\n\n  let id;\n  let rej;\n\n  const promise = new Promise((resolve, reject) => {\n    rej = reject;\n    id = oldies.setInterval(() => {\n      try {\n        callback();\n      } catch (e) {\n        reject(e);\n        oldies.clearInterval(id);\n      }\n    }, interval);\n  })\n    .catch((e) => {\n      if (e === ERROR.INTERVAL) {\n        oldies.clearInterval(id);\n      } else {\n        throw e;\n      }\n    });\n\n  // Save rejection function to an map of rejects\n  rejectMap.set(promise, rej);\n  return promise;\n};\n\n/**\n * Replace NodeJS' clearTimeout to deal with the Promise-based setTimeout\n *\n * @param {Promise} [promise]\n */\nclearInterval = (promise) => {\n  const [timeout, reject] = (() => {\n    if (promise) {\n      return [promise, rejectMap.get(promise)];\n    }\n    /**\n     * Returns first reject in map if no promise is provided.\n     * Needed to use this in REPL\n     */\n    return [rejectMap.entries()];\n  })();\n\n  if (!reject) {\n    throw new Error('Unable to find interval promise');\n  }\n\n  reject(ERROR.INTERVAL);\n  rejectMap.delete(timeout);\n};\n\n\n//# sourceURL=webpack:///./lib/cli/setup/interval.js?")},"./lib/cli/setup/timeout.js":function(module,exports,__webpack_require__){eval("/* eslint-disable no-global-assign */\nconst { isNumber } = __webpack_require__(/*! ../../_utils */ \"./lib/_utils.js\");\nconst { ERROR, rejectMap, oldies } = __webpack_require__(/*! ./_const */ \"./lib/cli/setup/_const.js\");\n\n/**\n * Overrides NodeJS' core setTimeout replacing it with a Promise-based one.\n *\n * @param {function} callback   The callback to be executed after `timeout` ms\n * @param {number} timeout      How many ms to wait before calling `callback`\n *\n * @returns {Promise}\n */\nsetTimeout = (callback, timeout) => {\n  if (!isNumber(timeout) && timeout >= 0) {\n    throw new TypeError('Timeout should be a positive number!');\n  }\n\n  let id;\n  let rej;\n\n  const promise = new Promise((resolve, reject) => {\n    rej = reject;\n    id = oldies.setTimeout(() => {\n      try {\n        callback();\n        resolve();\n      } catch (e) {\n        reject(e);\n        oldies.clearTimeout(id);\n      }\n    }, timeout);\n  })\n    .catch((e) => {\n      if (e === ERROR.TIMEOUT) {\n        oldies.clearTimeout(id);\n      } else {\n        throw e;\n      }\n    });\n\n  // Save rejection function to an map of rejects\n  rejectMap.set(promise, rej);\n  return promise;\n};\n\n/**\n * Replace NodeJS' clearTimeout to deal with the Promise-based setTimeout\n *\n * @param {Promise} [promise]\n */\nclearTimeout = (promise) => {\n  const [timeout, reject] = (() => {\n    if (promise) {\n      return [promise, rejectMap.get(promise)];\n    }\n    /**\n     * Returns first reject in map if no promise is provided.\n     * Needed to use this in REPL\n     */\n    return [rejectMap.entries()];\n  })();\n\n  if (!reject) {\n    throw new Error('Unable to find timeout');\n  }\n\n  reject(ERROR.TIMEOUT);\n  rejectMap.delete(timeout);\n};\n\n\n//# sourceURL=webpack:///./lib/cli/setup/timeout.js?")},"./lib/database.js":function(module,exports,__webpack_require__){eval("/* eslint-disable no-param-reassign */\nconst EventEmitter = __webpack_require__(/*! events */ \"events\");\nconst { EVENT, RESULT, RESULTS } = __webpack_require__(/*! ./_const */ \"./lib/_const.js\");\n\nclass Database extends EventEmitter {\n  /**\n   * Create an object with the given path and assign a value to it\n   *\n   * @example create({}, 'foo.bar', 1) === {foo: {bar: 1}}\n   *\n   * @param {Object} obj\n   * @param {String} path\n   * @param {any} value\n   */\n  static create(obj, path, value) {\n    const [first, rest] = path.split(/\\.(.*)/);\n\n    if (rest) {\n      obj[first] = obj[first] || {};\n\n      return Database.create(obj[first], rest, value);\n    }\n    obj[first] = value;\n    return obj;\n  }\n\n  /**\n   * Open an object with the given path\n   *\n   * @example open({foo: {bar: 1}}, 'foo.bar') === 1\n   *\n   * @param {Object} obj\n   * @param {String} path\n   */\n  static open(obj, path) {\n    const [first, rest] = path.split(/\\.(.*)/);\n    return rest ? Database.open(obj[first], rest) : obj[first];\n  }\n\n  /**\n   * Open an object's parent with the given path\n   *\n   * @example open({foo: {bar: 1}}, 'foo.bar') === {bar: 1}\n   *\n   * @param {Object} obj\n   * @param {String} path\n   */\n  static parent(obj, path) {\n    const [first, rest] = path.split(/\\.(.*)/);\n    return rest ? Database.parent(obj[first], rest) : obj;\n  }\n\n  /**\n   * Takes a high-resolution time tuple and converts it in ms\n   *\n   * @param {Array<Number>} hrtime\n   *\n   * @returns {number}\n   */\n  static toMilliseconds([seconds, nanoseconds]) {\n    const ns = (seconds * 1e9) + nanoseconds;\n    return ns / 1e6;\n  }\n\n  constructor() {\n    super();\n\n    this._recordsets = {};\n    this._processed = 0;\n    this._created = 0;\n\n    this.on(EVENT.DATABASE.RECORDSET.CREATE, this.createRecordset);\n    this.on(EVENT.DATABASE.RECORD.CREATE, this.createRecord);\n    this.on(EVENT.DATABASE.RECORD.UPDATE, this.updateRecord);\n    this.on(EVENT.DATABASE.RECORD.CLOSE, this.closeRecord);\n  }\n\n  createRecordset(path, silent) {\n    const meta = {\n      duration: process.hrtime(),\n      processed: 0,\n      path,\n      silent,\n    };\n    Database.create(this._recordsets, path, Object.defineProperty({}, 'meta', { value: meta }));\n  }\n\n  createRecord(path) {\n    if (!path) {\n      throw new TypeError('Missing record path!');\n    }\n\n    const parent = Database.parent(this._recordsets, path);\n    if (!parent) {\n      throw new TypeError(`Missing or null records list for ${path}`);\n    }\n\n    this._created += 1;\n\n    Database.create(this._recordsets, path, {\n      result: RESULT.PENDING,\n      payload: null,\n      duration: process.hrtime(),\n    });\n  }\n\n  updateRecord(path, result, payload) {\n    if (!RESULTS.includes(result)) {\n      throw new TypeError(`Result should be one of ${RESULTS.join()}. Got ${result}.`);\n    }\n\n    const recordset = Database.open(this._recordsets, path);\n    if (!recordset) {\n      throw new TypeError(`Missing or null records list for ${path}`);\n    }\n\n    recordset.result = result;\n    recordset.payload = payload;\n  }\n\n  closeRecord(path) {\n    setImmediate(() => {\n      // Checking if it's last record in all database\n      this._processed += 1;\n      const isLastRecord = this._processed === this._created;\n\n      // Checking if it's last record in current suite\n      const parent = Database.parent(this._recordsets, path);\n      parent.meta.processed += 1;\n      const currentSuiteLength = Object.values(parent).filter((item) => !item.meta).length;\n      const isLastRecordInSuite = parent.meta.processed === currentSuiteLength;\n\n      if (isLastRecord) {\n        parent.meta.duration = Database.toMilliseconds(process.hrtime(parent.meta.duration));\n        this.emit(EVENT.DATABASE.PROCESS.ENDED, this._recordsets);\n      } else if (isLastRecordInSuite) {\n        parent.meta.duration = Database.toMilliseconds(process.hrtime(parent.meta.duration));\n        this.emit(EVENT.DATABASE.RECORDSET.CLOSED, parent.meta.path);\n      } else {\n        const record = Database.open(this._recordsets, path);\n        record.duration = Database.toMilliseconds(process.hrtime(record.duration));\n      }\n    });\n  }\n}\n\nmodule.exports = new Database();\n\n\n//# sourceURL=webpack:///./lib/database.js?")},"./lib/event-bus.js":function(module,exports,__webpack_require__){eval('const { EVENT, RESULT } = __webpack_require__(/*! ./_const */ "./lib/_const.js");\nconst ConsoleReporter = __webpack_require__(/*! ./reporter */ "./lib/reporter/index.js");\nconst Database = __webpack_require__(/*! ./database */ "./lib/database.js");\nconst ProcessManager = __webpack_require__(/*! ./process-manager */ "./lib/process-manager.js");\nconst { Spec } = __webpack_require__(/*! ./spec */ "./lib/spec.js");\nconst { Suite } = __webpack_require__(/*! ./suite */ "./lib/suite.js");\n\nclass EventBus {\n  init() {\n    // subscribe reporters\n    this._reporters = [ConsoleReporter];\n    // #==\n    // Suite Events\n    Suite.on(EVENT.SUITE.STARTED, (path, silent) => {\n      Database.emit(EVENT.DATABASE.RECORDSET.CREATE, path, silent);\n    });\n    Suite.on(EVENT.SUITE.HOOKS.REGISTER, (path, eachSetup, eachTeardown) => {\n      Spec.emit(EVENT.SPEC.SETUP.REGISTER, path, eachSetup);\n      Spec.emit(EVENT.SPEC.TEARDOWN.REGISTER, path, eachTeardown);\n    });\n    Suite.on(EVENT.SUITE.HOOKS.UNREGISTER, () => {\n      Spec.emit(EVENT.SPEC.SETUP.UNREGISTER);\n      Spec.emit(EVENT.SPEC.TEARDOWN.UNREGISTER);\n    });\n    // #==\n    // Spec Events\n    Spec.on(EVENT.SPEC.STARTED, (path) => {\n      Database.emit(EVENT.DATABASE.RECORD.CREATE, path);\n    });\n    Spec.on(EVENT.SPEC.SUCCESS, (path) => {\n      Database.emit(EVENT.DATABASE.RECORD.UPDATE, path, RESULT.SUCCESS);\n    });\n    Spec.on(EVENT.SPEC.IGNORE, (path) => {\n      Database.emit(EVENT.DATABASE.RECORD.UPDATE, path, RESULT.IGNORED);\n    });\n    Spec.on(EVENT.SPEC.FAILURE, (path, payload) => {\n      Database.emit(EVENT.DATABASE.RECORD.UPDATE, path, RESULT.FAILURE, payload);\n      ProcessManager.emit(EVENT.PROCESS.EXIT_CODE.FAILURE);\n    });\n    Spec.on(EVENT.SPEC.ENDED, (path) => {\n      Database.emit(EVENT.DATABASE.RECORD.CLOSE, path);\n    });\n    // #==\n    // Database Events\n    Database.on(EVENT.DATABASE.PROCESS.ENDED, (database) => {\n      this._reporters.forEach((reporter) => {\n        reporter.emit(EVENT.REPORTER.REPORT.START, database);\n      });\n    });\n    Database.on(EVENT.DATABASE.RECORDSET.CLOSED, (path) => {\n      Suite.emit(EVENT.SUITE.ENDED, path);\n    });\n    // #==\n    // Reporter Events\n    this._reporters.forEach((reporter) => {\n      reporter.on(EVENT.REPORTER.REPORT.ENDED, () => {\n        ProcessManager.emit(EVENT.PROCESS.EXIT);\n      });\n    });\n  }\n}\n\nmodule.exports = new EventBus();\n\n\n//# sourceURL=webpack:///./lib/event-bus.js?')},"./lib/index.js":function(module,exports,__webpack_require__){eval('const { spec, xspec } = __webpack_require__(/*! ./spec */ "./lib/spec.js");\nconst { suite } = __webpack_require__(/*! ./suite */ "./lib/suite.js");\n\nconst EventBus = __webpack_require__(/*! ./event-bus */ "./lib/event-bus.js");\n\n// Launch event bus\nEventBus.init();\n\n// Just to not pollute the global\nconst ctx = {};\n\nconst api = {\n  // Suite\n  suite: suite.bind(ctx),\n  describe: suite.bind(ctx),\n\n  // Spec\n  spec: spec.bind(ctx),\n  it: spec.bind(ctx),\n  test: spec.bind(ctx),\n\n  // xSpec\n  xspec: xspec.bind(ctx),\n  xit: xspec.bind(ctx),\n  xtest: xspec.bind(ctx),\n};\n\nObject.assign(global, api);\nmodule.exports = api;\n\n\n//# sourceURL=webpack:///./lib/index.js?')},"./lib/process-manager.js":function(module,exports,__webpack_require__){eval('const EventEmitter = __webpack_require__(/*! events */ "events");\nconst { EVENT } = __webpack_require__(/*! ./_const */ "./lib/_const.js");\n\nclass ProcessManager extends EventEmitter {\n  constructor() {\n    super();\n\n    this._exitCode = 0;\n\n    this.on(EVENT.PROCESS.EXIT, () => {\n      setImmediate(() => {\n        process.exit(this._exitCode);\n      });\n    });\n\n    this.on(EVENT.PROCESS.EXIT_CODE.FAILURE, () => {\n      this._exitCode = 1;\n    });\n  }\n}\n\nmodule.exports = new ProcessManager();\n\n\n//# sourceURL=webpack:///./lib/process-manager.js?')},"./lib/reporter/_const.js":function(module,exports){eval("const TEXT_FORMAT = {\n  RED: '\\x1b[31m',\n  GREEN: '\\x1b[32m',\n  YELLOW: '\\x1b[33m',\n  RESET: '\\x1b[0m',\n  BOLD: '\\x1b[1m',\n  GREY: '\\x1b[90m',\n};\n\nmodule.exports = {\n  TEXT_FORMAT,\n};\n\n\n//# sourceURL=webpack:///./lib/reporter/_const.js?")},"./lib/reporter/index.js":function(module,exports,__webpack_require__){eval('const EventEmitter = __webpack_require__(/*! events */ "events");\nconst { printDatabase } = __webpack_require__(/*! ./print */ "./lib/reporter/print.js");\nconst { EVENT } = __webpack_require__(/*! ../_const */ "./lib/_const.js");\n\n\nclass Reporter extends EventEmitter {\n  constructor() {\n    super();\n\n    this.on(EVENT.REPORTER.REPORT.START, async (database) => {\n      await printDatabase(database);\n      this.emit(EVENT.REPORTER.REPORT.ENDED);\n    });\n  }\n}\n\nmodule.exports = new Reporter();\n\n\n//# sourceURL=webpack:///./lib/reporter/index.js?')},"./lib/reporter/print.js":function(module,exports,__webpack_require__){eval("const { isFunction } = __webpack_require__(/*! ../_utils */ \"./lib/_utils.js\");\nconst { TEXT_FORMAT } = __webpack_require__(/*! ./_const */ \"./lib/reporter/_const.js\");\nconst { NODE_MAJOR_VERSION, RESULT } = __webpack_require__(/*! ../_const */ \"./lib/_const.js\");\n\n/**\n * Prints on stdout\n */\nconst print = (...args) => {\n  const line = [...args, TEXT_FORMAT.RESET, '\\n'];\n  return process.stdout.write(line.map(String).join(''));\n};\n\n/**\n * Gets the string name of Error entries\n * @param {any} value\n */\nconst getErrorName = (value) => (isFunction(value) ? value.name : String(value));\n\n/**\n * Tries to extract an error message from an error\n * @param error\n * @returns {string}\n */\nconst getErrorMessage = (error) => {\n  if (error.message) {\n    return error.message;\n  }\n\n  // In case of something like 'ERROR: message' returns 'message'\n  return error.toString().split(':').slice(-1)[0];\n};\n\n/**\n * Returns true if error is an Assertion Failure\n * @param error {Error}\n * @returns {boolean}\n */\nconst isAssertionFailure = (error) => error.code === 'ERR_ASSERTION' || error.toString().includes('AssertionError');\n\n/**\n * Print details of an error in the report.\n * Error can be either an assertion failure or a generic error.\n * @param error {Error}\n */\nconst printErrorDetails = (error) => {\n  const message = getErrorMessage(error);\n  // In Node 10.x.x Error Handling improved a lot,\n  // we'll use this to decide when to leave it do the job\n  const isBeforeNodeTen = NODE_MAJOR_VERSION < 10;\n\n  if (isAssertionFailure(error)) {\n    const operator = getErrorName(error.operator);\n    const expected = getErrorName(error.expected);\n    const actual = getErrorName(error.actual);\n\n    if (isBeforeNodeTen) {\n      print(`ASSERTION FAILURE: ${message}`);\n    }\n\n    /**\n     * Printing detailed report if either:\n     * - operator is generic;\n     * - operator is missing and we have expected and actual;\n     *\n     * Otherwise the message already contains the failure\n     */\n    if (operator === 'fail') {\n      print('\\tUnexpected:\\t', TEXT_FORMAT.RED, `${actual}`);\n    } else if (!operator && error.expected && error.actual) {\n      print('\\tExpected:\\t', TEXT_FORMAT.GREEN, expected);\n      print('\\tActual:\\t\\t', TEXT_FORMAT.RED, actual);\n    }\n  } else if (isBeforeNodeTen) {\n    print(`ERROR: ${message}`);\n  }\n\n  print(TEXT_FORMAT.GREY, error.stack);\n};\n\nconst printSuite = (suite, suiteTitle, prefix = '') => {\n  const ERROR_DETAILS = {};\n\n  if (!suite.meta.silent) {\n    // Printing duration only if bigger than two seconds\n    const duration = suite.meta.duration > 2000\n      ? [TEXT_FORMAT.RESET, TEXT_FORMAT.YELLOW, ` (${Math.ceil(suite.meta.duration)}ms)`]\n      : [];\n\n    print(TEXT_FORMAT.BOLD, `${prefix}${suiteTitle.toUpperCase()}`, ...duration);\n  }\n\n  Object\n    .entries(suite)\n    .forEach(([specTitle, spec]) => {\n      const isSilent = (spec.meta && spec.meta.silent) || suite.meta.silent;\n\n      if (!isSilent) {\n        const isSuite = spec.meta;\n\n        if (isSuite) {\n          Object.assign(ERROR_DETAILS, printSuite(spec, specTitle, `${prefix}    `));\n        } else {\n          // Printing duration only if bigger than half a second\n          const duration = spec.duration > 500 ? [TEXT_FORMAT.YELLOW, ` (${Math.ceil(spec.duration)}ms)`] : [];\n\n          if (spec.result === RESULT.SUCCESS) {\n            print(TEXT_FORMAT.GREEN, `${prefix} ✔ ${specTitle}`, ...duration);\n          } else if (spec.result === RESULT.IGNORED) {\n            print(TEXT_FORMAT.YELLOW, `${prefix} - ${specTitle}`, ...duration);\n          } else if (spec.result === RESULT.PENDING) {\n            print(TEXT_FORMAT.GREY, `${prefix} . ${specTitle}`, ...duration);\n          } else {\n            print(TEXT_FORMAT.RED, `${prefix} ✕ ${specTitle}`);\n            ERROR_DETAILS[`${suiteTitle} > ${specTitle}`] = spec.payload;\n          }\n        }\n      }\n    });\n\n  return ERROR_DETAILS;\n};\n\n/**\n * Prints on stdout the given in-memory database\n * @returns {Promise<void>}\n */\nconst printDatabase = async (database) => {\n  let ERROR_DETAILS = {};\n\n  Object.entries(database).forEach(([title, suite]) => {\n    ERROR_DETAILS = printSuite(suite, title);\n    print('\\n  Duration: ', TEXT_FORMAT.YELLOW, `${Math.ceil(suite.meta.duration) / 1000}s`);\n  });\n\n  const entriesList = Object.entries(ERROR_DETAILS);\n  if (entriesList.length) {\n    print(TEXT_FORMAT.BOLD, '\\nError details:');\n\n    entriesList.forEach((item, index) => {\n      const title = item[0];\n      const error = item[1];\n\n      print(TEXT_FORMAT.BOLD, `\\n${index + 1}) ${title}`);\n      printErrorDetails(error);\n    });\n  }\n};\n\n\nmodule.exports = {\n  printDatabase,\n};\n\n\n//# sourceURL=webpack:///./lib/reporter/print.js?")},"./lib/spec.js":function(module,exports,__webpack_require__){eval("const EventEmitter = __webpack_require__(/*! events */ \"events\");\nconst { EVENT } = __webpack_require__(/*! ./_const */ \"./lib/_const.js\");\n\nconst emitter = new EventEmitter();\nconst hooks = { before: {}, after: {} };\n\nemitter.on(EVENT.SPEC.SETUP.REGISTER, (path, fn) => {\n  hooks.before[path] = fn;\n});\n\nemitter.on(EVENT.SPEC.TEARDOWN.REGISTER, (path, fn) => {\n  hooks.after[path] = fn;\n});\n\nemitter.on(EVENT.SPEC.SETUP.UNREGISTER, (path) => {\n  hooks.before[path] = null;\n});\n\nemitter.on(EVENT.SPEC.TEARDOWN.UNREGISTER, (path) => {\n  hooks.after[path] = null;\n});\n\nasync function spec(title, callback) {\n  // We use dots to split the paths...\n  const saneTitle = String(title).replace('.', ' ');\n  const suitePath = this.path;\n  const path = `${suitePath}.${saneTitle}`;\n\n  emitter.emit(EVENT.SPEC.STARTED, path);\n\n  if (hooks.before && hooks.before[suitePath]) {\n    hooks.before[suitePath]();\n  }\n\n  try {\n    await callback();\n    emitter.emit(EVENT.SPEC.SUCCESS, path);\n  } catch (e) {\n    emitter.emit(EVENT.SPEC.FAILURE, path, e);\n  }\n\n  if (hooks.after && hooks.after[suitePath]) {\n    hooks.after[suitePath]();\n  }\n\n  emitter.emit(EVENT.SPEC.ENDED, path);\n}\n\nasync function xspec(title) {\n  // We use dots to split the paths...\n  const saneTitle = String(title).replace('.', ' ');\n  const path = `${this.path}.${saneTitle}`;\n\n  emitter.emit(EVENT.SPEC.STARTED, path);\n  emitter.emit(EVENT.SPEC.IGNORE, path);\n  emitter.emit(EVENT.SPEC.ENDED, path);\n}\n\nmodule.exports = { spec, xspec, Spec: emitter };\n\n\n//# sourceURL=webpack:///./lib/spec.js?")},"./lib/suite.js":function(module,exports,__webpack_require__){eval("const EventEmitter = __webpack_require__(/*! events */ \"events\");\nconst {\n  isFunction,\n  isObject,\n} = __webpack_require__(/*! ./_utils */ \"./lib/_utils.js\");\n\nconst { EVENT } = __webpack_require__(/*! ./_const */ \"./lib/_const.js\");\n\nconst emitter = new EventEmitter();\n\nfunction argumentParser(args, defaultOptions) {\n  const opts = args[0];\n  const fn = args[1];\n  switch (args.length) {\n    case 1:\n      if (!isFunction(opts)) {\n        throw new TypeError('Second argument must be a function!');\n      }\n      return {\n        options: defaultOptions,\n        callback: opts,\n      };\n    case 2:\n      if (!isObject(opts)) {\n        throw new TypeError('Second argument must be an object!');\n      }\n\n      if (!isFunction(fn)) {\n        throw new TypeError('Third argument must be a function!');\n      }\n\n      return {\n        options: { ...defaultOptions, ...opts },\n        callback: fn,\n      };\n\n    default:\n      throw new TypeError(`Invalid arguments! Expected (title: string, options?: object, callback: function). Actual: ${\n        args.map(String).join()}`);\n  }\n}\n\nfunction suite(title, ...args) {\n  // We use dots to split the paths...\n  const saneTitle = String(title).replace('.', ' ');\n  const oldPath = this.path;\n  const path = oldPath ? `${oldPath}.${saneTitle}` : saneTitle;\n\n  const defaultOptions = {\n    title: saneTitle,\n    // eslint-disable-next-line no-new-func\n    setup: Function(),\n    // eslint-disable-next-line no-new-func\n    teardown: Function(),\n    // eslint-disable-next-line no-new-func\n    eachSetup: Function(),\n    // eslint-disable-next-line no-new-func\n    eachTeardown: Function(),\n    silent: false,\n  };\n\n  const { options, callback } = argumentParser(args, defaultOptions);\n\n  emitter.emit(EVENT.SUITE.STARTED, path, options.silent);\n  emitter.emit(EVENT.SUITE.HOOKS.REGISTER, path, options.eachSetup, options.eachTeardown);\n\n  if (isFunction(options.setup)) {\n    options.setup();\n  } else {\n    throw new TypeError('Setup must be a function!');\n  }\n\n  callback.call(Object.assign(this, { path }));\n\n  Object.assign(this, { path: oldPath });\n\n  emitter.on(EVENT.SUITE.ENDED, (suitePath) => {\n    if (suitePath === path) {\n      if (isFunction(options.teardown)) {\n        options.teardown();\n      } else {\n        throw new TypeError('Teardown must be a function!');\n      }\n\n      emitter.emit(EVENT.SUITE.HOOKS.UNREGISTER);\n      emitter.removeAllListeners(EVENT.SUITE.ENDED);\n    }\n  });\n}\n\nmodule.exports = { suite, Suite: emitter };\n\n\n//# sourceURL=webpack:///./lib/suite.js?")},events:function(module,exports){eval('module.exports = require("events");\n\n//# sourceURL=webpack:///external_%22events%22?')},fs:function(module,exports){eval('module.exports = require("fs");\n\n//# sourceURL=webpack:///external_%22fs%22?')},path:function(module,exports){eval('module.exports = require("path");\n\n//# sourceURL=webpack:///external_%22path%22?')}}));