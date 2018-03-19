const EventEmitter = require('events');
const { EVENT } = require('./_const');

class Spec extends EventEmitter {
  constructor() {
    super();

    this.before = null;
    this.after = null;

    this.on(EVENT.SPEC.SETUP.REGISTER, (fn) => {
      this.before = fn;
    });

    this.on(EVENT.SPEC.TEARDOWN.REGISTER, (fn) => {
      this.after = fn;
    });

    this.on(EVENT.SPEC.SETUP.UNREGISTER, () => {
      this.before = null;
    });

    this.on(EVENT.SPEC.TEARDOWN.UNREGISTER, () => {
      this.after = null;
    });
  }

  async spec(title, callback) {
    this.emit(EVENT.SPEC.STARTED, title);

    if (this.before) { this.before(); }

    try {
      await callback();
      this.emit(EVENT.SPEC.SUCCESS, title);
    } catch (e) {
      this.emit(EVENT.SPEC.FAILURE, title, e);
    }

    if (this.after) { this.after(); }

    this.emit(EVENT.SPEC.ENDED, title);
  }

  async xspec(title) {
    this.emit(EVENT.SPEC.STARTED, title);
    this.emit(EVENT.SPEC.IGNORE, title);
    this.emit(EVENT.SPEC.ENDED, title);
  }
}

module.exports = new Spec();
