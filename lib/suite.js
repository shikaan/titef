const {
  TEXT_FORMAT,
  print,
  log,
  isFunction,
  isObject,
} = require('./_utils');

const suiteArgumentsFactory = (args, defaultOptions) => {
  const opts = args[1];
  const fn = args[2];
  switch (args.length) {
    case 2:
      if (!isFunction(opts)) {
        log.error('Second argument must be a function!');
        return process.exit(1);
      }
      return {
        options: defaultOptions,
        callback: opts,
      };
    case 3:
      if (!isObject(opts)) {
        log.error('Second argument must be an object!');
        return process.exit(1);
      }

      if (!isFunction(fn)) {
        log.error('Third argument must be an function!');
        return process.exit(1);
      }

      return {
        options: Object.assign({}, defaultOptions, opts),
        callback: fn,
      };

    default:
      log.error('Invalid arguments! Expected (title: string, options?: object, callback: function)');
      return process.exit(1);
  }
};

/* eslint-disable no-unused-vars */
const suite = async (title, opts, fn) => {
  const saneTitle = String(title);
  print(TEXT_FORMAT.BOLD, `SUITE: ${saneTitle}`);

  const defaultOptions = {
    title: saneTitle,
    setup: () => { },
    teardown: () => { },
  };

  const { options, callback } = suiteArgumentsFactory(arguments, defaultOptions);

  if (isFunction(options.setup)) {
    options.setup();
  } else {
    log.error('Setup must be a function!');
    process.exit(1);
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
    process.exit(1);
  }
};
/* eslint-enable no-unused-vars */

module.exports = {
  suite,
};
