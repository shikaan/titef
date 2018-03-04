const EventEmitter = require('events');
const { EVENT, RESULT } = require('./_const');
const ConsoleReporter = require('./reporter');
const Database = require('./database');
const ProcessManager = require('./process-manager');

class EventBus extends EventEmitter {
  constructor(name) {
    super(name);

    // subscribe reporters
    this._reporters = [ConsoleReporter];

    this.on(EVENT.SUITE.STARTED, (title) => {
      Database.emit(EVENT.DATABASE.RECORDSET.CREATE, title);
    });

    this.on(EVENT.SPEC.STARTED, (title) => {
      Database.emit(EVENT.DATABASE.RECORD.CREATE, title);
    });

    this.on(EVENT.SPEC.SUCCESS, (title) => {
      Database.emit(EVENT.DATABASE.RECORD.UPDATE, title, RESULT.SUCCESS);
    });

    this.on(EVENT.SPEC.IGNORE, (title) => {
      Database.emit(EVENT.DATABASE.RECORD.UPDATE, title, RESULT.IGNORED);
    });

    this.on(EVENT.SPEC.FAILURE, (title, payload) => {
      Database.emit(EVENT.DATABASE.RECORD.UPDATE, title, RESULT.FAILURE, payload);
      ProcessManager.emit(EVENT.PROCESS.EXIT_CODE.FAILURE);
    });

    this.on(EVENT.SPEC.ENDED, (title) => {
      Database.emit(EVENT.DATABASE.RECORD.CLOSE, title);
    });

    Database.on(EVENT.DATABASE.PROCESS.ENDED, (database) => {
      this._reporters.forEach((reporter) => {
        reporter.emit(EVENT.REPORTER.REPORT.START, database);
      });
    });

    this._reporters.forEach((reporter) => {
      reporter.on(EVENT.REPORTER.REPORT.ENDED, () => {
        ProcessManager.emit(EVENT.PROCESS.EXIT);
      });
    });
  }
}

module.exports = new EventBus();
