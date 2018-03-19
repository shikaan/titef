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

  Suite.on(EVENT.SUITE.HOOKS.REGISTER, (eachSetup, eachTeardown) => {
    Spec.emit(EVENT.SPEC.SETUP.REGISTER, eachSetup);
    Spec.emit(EVENT.SPEC.TEARDOWN.REGISTER, eachTeardown);
  });

  Suite.on(EVENT.SUITE.HOOKS.UNREGISTER, () => {
    Spec.emit(EVENT.SPEC.SETUP.UNREGISTER);
    Spec.emit(EVENT.SPEC.TEARDOWN.UNREGISTER);
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

  // Database Events
  Database.on(EVENT.DATABASE.PROCESS.ENDED, (database) => {
    Suite.emit(EVENT.SUITE.ENDED);

    this._reporters.forEach((reporter) => {
      reporter.emit(EVENT.REPORTER.REPORT.START, database);
    });
  });

  // Reporter Events
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
  xspec: Spec.xspec.bind(Spec),
};
