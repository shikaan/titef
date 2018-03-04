const { EVENT, RESULT } = require('./_const');
const ConsoleReporter = require('./reporter');
const Database = require('./database');
const ProcessManager = require('./process-manager');
const Spec = require('./spec');
const Suite = require('./suite');

class EventBus {
  constructor() {
    // subscribe reporters
    this._reporters = [ConsoleReporter];

    this.subscribeToSuite();
    this.subscribeToSpec();
    this.subscribeToReporter();
    this.subscribeToDatabase();
  }

  subscribeToSuite() {
    Suite.on(EVENT.SUITE.STARTED, (title) => {
      Database.emit(EVENT.DATABASE.RECORDSET.CREATE, title);
    });
  }

  subscribeToSpec() {
    Spec.on(EVENT.SPEC.STARTED, (title) => {
      Database.emit(EVENT.DATABASE.RECORD.CREATE, title);
    });

    Spec.on(EVENT.SPEC.SUCCESS, (title) => {
      Database.emit(EVENT.DATABASE.RECORD.UPDATE, title, RESULT.SUCCESS);
    });

    Spec.on(EVENT.SPEC.IGNORE, (title) => {
      Database.emit(EVENT.DATABASE.RECORD.UPDATE, title, RESULT.IGNORED);
    });

    Spec.on(EVENT.SPEC.FAILURE, (title, payload) => {
      Database.emit(EVENT.DATABASE.RECORD.UPDATE, title, RESULT.FAILURE, payload);
      ProcessManager.emit(EVENT.PROCESS.EXIT_CODE.FAILURE);
    });

    Spec.on(EVENT.SPEC.ENDED, (title) => {
      Database.emit(EVENT.DATABASE.RECORD.CLOSE, title);
    });
  }

  subscribeToDatabase() {
    Database.on(EVENT.DATABASE.PROCESS.ENDED, (database) => {
      this._reporters.forEach((reporter) => {
        reporter.emit(EVENT.REPORTER.REPORT.START, database);
      });
    });
  }

  subscribeToReporter() {
    this._reporters.forEach((reporter) => {
      reporter.on(EVENT.REPORTER.REPORT.ENDED, () => {
        ProcessManager.emit(EVENT.PROCESS.EXIT);
      });
    });
  }
}

// Create a unique EventBus instance for each application run
const instance = new EventBus();

module.exports = {
  suite: Suite.suite.bind(Suite),
  spec: Spec.spec.bind(Spec),
  xspec: Spec.spec.bind(Spec),
};
