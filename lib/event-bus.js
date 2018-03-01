const { Reporter } = require('./report');
const { LoggingEventEmitter } = require('./_utils');

class EventBus extends LoggingEventEmitter {
  constructor(name) {
    super(name);

    // subscribe reporters
    this._reporters = [Reporter];

    this.subscribeSpecEvents();
  }

  subscribeSpecEvents() {
    this.on('spec:start', (...args) => {
      this._reporters.forEach((reporter) => {
        reporter.emit('spec:start', ...args);
      });
    });

    this.on('spec:success', (...args) => {
      this._reporters.forEach((reporter) => {
        reporter.emit('spec:success', ...args);
      });
    });

    this.on('spec:failure', (...args) => {
      this._reporters.forEach((reporter) => {
        reporter.emit('spec:failure', ...args);
      });
    });

    this.on('spec:ignored', (...args) => {
      this._reporters.forEach((reporter) => {
        reporter.emit('spec:ignored', ...args);
      });
    });

    //this.on('spec:end'); // will replace the promise shit...
  }
}

module.exports = new EventBus('Event Bus');
