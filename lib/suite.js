const {
  TEXT_FORMAT,
  print,
  log,
  isFunction,
  isObject,
} = require('./_utils');

const { ERROR } = require('./_const');

const suiteArgumentsFactory = (args, defaultOptions) => {
  const opts = args[0];
  const fn = args[1];
  switch (args.length) {
    case 1:
      if (!isFunction(opts)) {
        log.error('Second argument must be a function!');
        throw new TypeError(ERROR.INVALID_ARGUMENT);
      }
      return {
        options: defaultOptions,
        callback: opts,
      };
    case 2:
      if (!isObject(opts)) {
        log.error('Second argument must be an object!');
        throw new TypeError(ERROR.INVALID_ARGUMENT);
      }

      if (!isFunction(fn)) {
        log.error('Third argument must be a function!');
        throw new TypeError(ERROR.INVALID_ARGUMENT);
      }

      return {
        options: Object.assign({}, defaultOptions, opts),
        callback: fn,
      };

    default:
      log.error('Invalid arguments! Expected (title: string, options?: object, callback: function), Actual', args);
      throw new TypeError(ERROR.INVALID_ARGUMENT);
  }
};

/* eslint-disable no-unused-vars */
const suite = async (title, ...args) => {
  const saneTitle = String(title);
  print(TEXT_FORMAT.BOLD, `SUITE: ${saneTitle}`);

  const defaultOptions = {
    title: saneTitle,
    setup: () => { },
    teardown: () => { },
  };

  const { options, callback } = suiteArgumentsFactory(args, defaultOptions);

  if (isFunction(options.setup)) {
    options.setup();
  } else {
    log.error('Setup must be a function!');
    throw new TypeError(ERROR.INVALID_ARGUMENT);
  }

  if (callback[Symbol.toStringTag] === 'AsyncFunction') {
    try {
      await callback();
    } catch (e) {
      throw e;
    }
  } else {
    callback();
  }

  if (isFunction(options.teardown)) {
    options.teardown();
  } else {
    log.error('Teardown must be a function!');
    throw new TypeError(ERROR.INVALID_ARGUMENT);
  }
};
/* eslint-enable no-unused-vars */

module.exports = {
  suite,
};
