const EventEmitter = require('events');
const EventBus = require('../event-bus');
const { printDatabase } = require('./print');
const { EVENT } = require('./_const');


class Reporter extends EventEmitter {
  constructor() {
    super();

    this.on(EVENT.REPORTER.REPORT.START, async (database) => {
      await printDatabase(database);
      EventBus.emit(EVENT.REPORTER.REPORT.ENDED);
    });
  }
}

module.exports = new Reporter();
