const EventEmitter = require('events');
const { EVENT } = require('./_const');

const emitter = new EventEmitter();
const hooks = { before: {}, after: {} };

emitter.on(EVENT.SPEC.SETUP.REGISTER, (path, fn) => {
  hooks.before[path] = fn;
});

emitter.on(EVENT.SPEC.TEARDOWN.REGISTER, (path, fn) => {
  hooks.after[path] = fn;
});

emitter.on(EVENT.SPEC.SETUP.UNREGISTER, (path) => {
  hooks.before[path] = null;
});

emitter.on(EVENT.SPEC.TEARDOWN.UNREGISTER, (path) => {
  hooks.after[path] = null;
});

async function spec(title, callback) {
  // #==
  // We use dots to split the paths...
  const saneTitle = String(title).replace('.', ' ');
  const suitePath = this.path;
  const path = `${suitePath}.${saneTitle}`;

  emitter.emit(EVENT.SPEC.STARTED, path);
  if (hooks.before && hooks.before[suitePath]) {
    hooks.before[suitePath]();
  }

  try {
    await callback();
    emitter.emit(EVENT.SPEC.SUCCESS, path);
  } catch (e) {
    emitter.emit(EVENT.SPEC.FAILURE, path, e);
  }

  if (hooks.after && hooks.after[suitePath]) {
    hooks.after[suitePath]();
  }

  emitter.emit(EVENT.SPEC.ENDED, path);
}

async function xspec(title) {
  // #==
  // We use dots to split the paths...
  const saneTitle = String(title).replace('.', ' ');
  const path = `${this.path}.${saneTitle}`;

  emitter.emit(EVENT.SPEC.STARTED, path);
  emitter.emit(EVENT.SPEC.IGNORE, path);
  emitter.emit(EVENT.SPEC.ENDED, path);
}

module.exports = { spec, xspec, Spec: emitter };
