const { EVENT, RESULT } = require('./_const');
const ConsoleReporter = require('./reporter');
const Database = require('./database');
const ProcessManager = require('./process-manager');
const Spec = require('./spec');
const Suite = require('./suite');


function runEventBus() {
  // subscribe reporters
  this._reporters = [ConsoleReporter];

  // Suite Events
  Suite.on(EVENT.SUITE.STARTED, (title) => {
    Database.emit(EVENT.DATABASE.RECORDSET.CREATE, title);
  });

  // Spec Events
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

  // Reporter Events
  Database.on(EVENT.DATABASE.PROCESS.ENDED, (database) => {
    this._reporters.forEach((reporter) => {
      reporter.emit(EVENT.REPORTER.REPORT.START, database);
    });
  });

  // Database Events
  this._reporters.forEach((reporter) => {
    reporter.on(EVENT.REPORTER.REPORT.ENDED, () => {
      ProcessManager.emit(EVENT.PROCESS.EXIT);
    });
  });
}

// Create a unique EventBus instance for each application run
runEventBus();

module.exports = {
  suite: Suite.suite.bind(Suite),
  spec: Spec.spec.bind(Spec),
  xspec: Spec.spec.bind(Spec),
};
