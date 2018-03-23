const EventEmitter = require('events');
const { EVENT } = require('./_const');

const emitter = new EventEmitter();
const hooks = { before: null, after: null };

emitter.on(EVENT.SPEC.SETUP.REGISTER, (fn) => {
  hooks.before = fn;
});

emitter.on(EVENT.SPEC.TEARDOWN.REGISTER, (fn) => {
  hooks.after = fn;
});

emitter.on(EVENT.SPEC.SETUP.UNREGISTER, () => {
  hooks.before = null;
});

emitter.on(EVENT.SPEC.TEARDOWN.UNREGISTER, () => {
  hooks.after = null;
});

async function spec(title, callback) {
  // #==
  // We use dots to split the paths...
  const saneTitle = String(title).replace('.', ' ');
  const path = `${this.path}.${saneTitle}`;

  emitter.emit(EVENT.SPEC.STARTED, path);
  if (hooks.before) {
    hooks.before();
  }

  try {
    await callback();
    emitter.emit(EVENT.SPEC.SUCCESS, path);
  } catch (e) {
    emitter.emit(EVENT.SPEC.FAILURE, path, e);
  }

  if (hooks.after) {
    hooks.after();
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
