const { LoggingEventEmitter } = require('../_utils');
const { RESULT } = require('./_const');
const { printRecords } = require('./print');
const { updateRecord, saveRecord, startSuite } = require('./records');

class Reporter extends LoggingEventEmitter {
  constructor(name) {
    super(name);

    this.on('spec:start', (title, promise) => {
      saveRecord(title, promise);
    });

    this.on('spec:success', (title) => {
      updateRecord(title, RESULT.SUCCESS);
    });

    this.on('spec:failure', (title, error) => {
      updateRecord(title, RESULT.FAILURE, error);
    });

    this.on('spec:ignored', (title) => {
      updateRecord(title, RESULT.IGNORED);
    });

    // this.on('spec:end');
  }
}

module.exports = {
  updateRecord,
  printRecords,
  RESULT,
  saveRecord,
  startSuite,
  Reporter: new Reporter('Reporter'),
};
