const EventEmitter = require('events');
const {
  isFunction,
  isObject,
} = require('./_utils');

const { EVENT } = require('./_const');

const emitter = new EventEmitter();

function argumentParser(args, defaultOptions) {
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

function suite(title, ...args) {
  // #==
  // We use dots to split the paths...
  const saneTitle = String(title).replace('.', ' ');
  const oldPath = this.path;
  const path = oldPath ? `${oldPath}.${saneTitle}` : saneTitle;

  emitter.emit(EVENT.SUITE.STARTED, path);

  const defaultOptions = {
    title: saneTitle,
    // eslint-disable-next-line no-new-func
    setup: Function(),
    // eslint-disable-next-line no-new-func
    teardown: Function(),
    // eslint-disable-next-line no-new-func
    eachSetup: Function(),
    // eslint-disable-next-line no-new-func
    eachTeardown: Function(),
  };

  const { options, callback } = argumentParser(args, defaultOptions);

  // #==
  // TODO: we might want to use path here to register hooks for the right suite?
  emitter.emit(EVENT.SUITE.HOOKS.REGISTER, options.eachSetup, options.eachTeardown);

  if (isFunction(options.setup)) {
    options.setup();
  } else {
    throw new TypeError('Setup must be a function!');
  }

  callback.call(Object.assign(this, { path }));

  Object.assign(this, { path: oldPath });

  emitter.on(EVENT.SUITE.ENDED, (suitePath) => {
    if (suitePath === path) {
      if (isFunction(options.teardown)) {
        options.teardown();
      } else {
        throw new TypeError('Teardown must be a function!');
      }

      emitter.emit(EVENT.SUITE.HOOKS.UNREGISTER);
      emitter.removeAllListeners(EVENT.SUITE.ENDED);
    }
  });
}

module.exports = { suite, Suite: emitter };
