const { EVENT, RESULT } = require('./_const');
const ConsoleReporter = require('./reporter');
const Database = require('./database');
const ProcessManager = require('./process-manager');
const { Spec } = require('./spec');
const { Suite } = require('./suite');

class EventBus {
  init() {
    // subscribe reporters
    this._reporters = [ConsoleReporter];
    // #==
    // Suite Events
    Suite.on(EVENT.SUITE.STARTED, (path, silent) => {
      Database.emit(EVENT.DATABASE.RECORDSET.CREATE, path, silent);
    });
    Suite.on(EVENT.SUITE.HOOKS.REGISTER, (path, eachSetup, eachTeardown) => {
      Spec.emit(EVENT.SPEC.SETUP.REGISTER, path, eachSetup);
      Spec.emit(EVENT.SPEC.TEARDOWN.REGISTER, path, eachTeardown);
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
}

module.exports = new EventBus();
