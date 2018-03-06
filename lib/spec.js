const EventEmitter = require('events');
const { EVENT } = require('./_const');

class Spec extends EventEmitter {
  async spec(title, callback) {
    this.emit(EVENT.SPEC.STARTED, title);

    try {
      await callback();
      this.emit(EVENT.SPEC.SUCCESS, title);
    } catch (e) {
      this.emit(EVENT.SPEC.FAILURE, title, e);
    }

    this.emit(EVENT.SPEC.ENDED, title);
  }

  async xspec(title) {
    this.emit(EVENT.SPEC.STARTED, title);
    this.emit(EVENT.SPEC.IGNORE, title);
    this.emit(EVENT.SPEC.ENDED, title);
  }
}

module.exports = new Spec();
