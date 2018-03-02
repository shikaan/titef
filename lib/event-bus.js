const EventEmitter = require('events');
const { Reporter } = require('./report');

class EventBus extends EventEmitter {
  constructor(name) {
    super(name);

    // subscribe reporters
    this._reporters = [Reporter];
    this.errorCode = 0;

    this.subscribeSpecEvents();
    this.subscribeSuiteEvents();
    this.subscribeReporterEvents();
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
      this.errorCode = 1;
      this._reporters.forEach((reporter) => {
        reporter.emit('spec:failure', ...args);
      });
    });

    this.on('spec:ignored', (...args) => {
      this._reporters.forEach((reporter) => {
        reporter.emit('spec:ignored', ...args);
      });
    });

    // this.on('spec:end'); // will replace the promise shit...
  }

  subscribeSuiteEvents() {
    this.on('suite:start', (...args) => {
      if (process.env.TITEF_ENV !== 'test') {
        this._reporters.forEach((reporter) => {
          reporter.emit('suite:start', ...args);
        });
      }
    });

    this.on('suite:end', (...args) => {
      if (process.env.TITEF_ENV !== 'test') {
        this._reporters.forEach((reporter) => {
          reporter.emit('suite:end', ...args);
        });
      }
    });
  }

  subscribeReporterEvents() {
    this._reporters.forEach((reporter) => {
      // reporter.on('report:start')
      reporter.on('report:end', () => {
        process.exit(this.errorCode);
      });
    });
  }
}

module.exports = new EventBus('Event Bus');
