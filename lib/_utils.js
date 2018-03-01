const EventEmitter = require('events');

const createUID = () => Math.random().toString(36).slice(2);
const getLastElement = array => Array.isArray(array) && array[array.length - 1];
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

/**
 * Logs, if logging is enabled. At the moment logging is enabled by default.
 * @param {any} args
 */
class log {
  static error(...args) {
    process.stdout.write(['[ERROR]', ...args, '\n'].map(String).join(' '));
  }

  static info(...args) {
    process.stdout.write(['[INFO]', ...args, '\n'].map(String).join(' '));
  }
}

class LoggingEventEmitter extends EventEmitter {
  on(title, callback) {
    super.on(title, (...args) => {
      const last = getLastElement(args);
      const uid = last && last.uid;

      log.info(`[${this.name}]`, `\t(${uid})\t`, 'receive', title);
      callback(...args, { uid });
    });
  }

  emit(title, ...args) {
    const last = getLastElement(args);
    const uid = (last && last.uid) || createUID();

    log.info(`[${this.name}]`, `\t(${uid})\t`, 'emit\t', title);
    super.emit(title, ...args, { uid });
  }

  constructor(name) {
    super();

    this.name = name;
  }
}

module.exports = {
  isNumber,
  isFunction,
  isObject,
  LoggingEventEmitter,
  log,
};
