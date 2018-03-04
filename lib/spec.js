const EventEmitter = require('events');
const EventBus = require('./event-bus');
const { EVENT } = require('./_const');

class Spec extends EventEmitter() {
  static async spec(title, callback) {
    EventBus.emit(EVENT.SPEC.STARTED, title);

    try {
      await callback();
      EventBus.emit(EVENT.SPEC.SUCCESS, title);
    } catch (e) {
      EventBus.emit(EVENT.SPEC.FAILURE, title, e);
    }

    EventBus.emit(EVENT.SPEC.ENDED, title);
  }

  static async xspec(title) {
    EventBus.emit(EVENT.SPEC.STARTED, title);
    EventBus.emit(EVENT.SPEC.IGNORE, title);
    EventBus.emit(EVENT.SPEC.ENDED);
  }
}

module.exports = Spec;
