const { EVENT, RESULT } = require('./_const');
const ConsoleReporter = require('./reporter');
const Database = require('./database');
const ProcessManager = require('./process-manager');
const { spec, xspec, Spec } = require('./spec');
const { suite, Suite } = require('./suite');


function runEventBus() {
  // subscribe reporters
  this._reporters = [ConsoleReporter];

  // #==
  // Suite Events
  Suite.on(EVENT.SUITE.STARTED, (path, silent) => {
    Database.emit(EVENT.DATABASE.RECORDSET.CREATE, path, silent);
  });

  Suite.on(EVENT.SUITE.HOOKS.REGISTER, (eachSetup, eachTeardown) => {
    Spec.emit(EVENT.SPEC.SETUP.REGISTER, eachSetup);
    Spec.emit(EVENT.SPEC.TEARDOWN.REGISTER, eachTeardown);
  });

  Suite.on(EVENT.SUITE.HOOKS.UNREGISTER, () => {
    Spec.emit(EVENT.SPEC.SETUP.UNREGISTER);
    Spec.emit(EVENT.SPEC.TEARDOWN.UNREGISTER);
  });

  // #==
  // Spec Events
  Spec.on(EVENT.SPEC.STARTED, (path) => {
    Database.emit(EVENT.DATABASE.RECORD.CREATE, path);
  });

  Spec.on(EVENT.SPEC.SUCCESS, (path) => {
    Database.emit(EVENT.DATABASE.RECORD.UPDATE, path, RESULT.SUCCESS);
  });

  Spec.on(EVENT.SPEC.IGNORE, (path) => {
    Database.emit(EVENT.DATABASE.RECORD.UPDATE, path, RESULT.IGNORED);
  });

  Spec.on(EVENT.SPEC.FAILURE, (path, payload) => {
    Database.emit(EVENT.DATABASE.RECORD.UPDATE, path, RESULT.FAILURE, payload);
    ProcessManager.emit(EVENT.PROCESS.EXIT_CODE.FAILURE);
  });

  Spec.on(EVENT.SPEC.ENDED, (path) => {
    Database.emit(EVENT.DATABASE.RECORD.CLOSE, path);
  });

  // #==
  // Database Events
  Database.on(EVENT.DATABASE.PROCESS.ENDED, (database) => {
    this._reporters.forEach((reporter) => {
      reporter.emit(EVENT.REPORTER.REPORT.START, database);
    });
  });

  Database.on(EVENT.DATABASE.RECORDSET.CLOSED, (path) => {
    Suite.emit(EVENT.SUITE.ENDED, path);
  });

  // #==
  // Reporter Events
  this._reporters.forEach((reporter) => {
    reporter.on(EVENT.REPORTER.REPORT.ENDED, () => {
      ProcessManager.emit(EVENT.PROCESS.EXIT);
    });
  });
}


// Create a unique EventBus instance for each application run
runEventBus();

// Just to not pollute the global
const ctx = {};

module.exports = {
  suite: suite.bind(ctx),
  spec: spec.bind(ctx),
  xspec: xspec.bind(ctx),
};
