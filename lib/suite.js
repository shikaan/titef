const EventEmitter = require('events');
const {
  isFunction,
  isObject,
} = require('./_utils');

const { EVENT } = require('./_const');

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

  suite(title, ...args) {
    const saneTitle = String(title);

    this.emit(EVENT.SUITE.STARTED, saneTitle);

    const defaultOptions = {
      title: saneTitle,
      // eslint-disable-next-line no-new-func
      setup: Function(),
      // eslint-disable-next-line no-new-func
      teardown: Function(),
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

module.exports = new Suite();
