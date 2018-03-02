const EventEmitter = require('events');
const { RESULT } = require('./_const');
const { printRecords } = require('./print');
const { updateRecord, saveRecord, startSuite } = require('./records');

class Reporter extends EventEmitter {
  constructor(name) {
    super(name);

    /**
     * Following should live in every Reporter
     */
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

    this.on('suite:start', (title) => {
      startSuite(title);
    });

    /**
     * Following are Reporter specific
     */
    this.on('suite:end', async () => {
      this.emit('report:start');
      await printRecords();
      this.emit('report:end');
    });
  }
}

module.exports = {
  Reporter: new Reporter('Reporter'),
};
