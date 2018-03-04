const {
  RESULT, RESULTS,
} = require('./_const');
const EventEmitter = require('events');
// const Reporter = require('./index'); //NO! should be bus

const EventBus = require('../event-bus');

class Database extends EventEmitter {
  constructor() {
    super();

    this._recordsets = {};
    this._processed = 0;
    this._currentSuite = null;

    /**
     * Following should live in every Reporter
     */
    this.on('spec:start', (title) => {
      this.saveRecord(title);
    });

    this.on('spec:success', (title) => {
      this.updateRecord(title, RESULT.SUCCESS);
    });

    this.on('spec:failure', (title, error) => {
      this.updateRecord(title, RESULT.FAILURE, error);
    });

    this.on('spec:ignored', (title) => {
      this.updateRecord(title, RESULT.IGNORED);
    });

    this.on('spec:end', () => {
      this.closeRecord();
    });

    this.on('suite:start', (title) => {
      this.emit('database:process:start');
      this.initRecordset(title);
    });
  }

  initRecordset(suite) {
    this._currentSuite = suite;
    this._recordsets[this._currentSuite] = {};
  }

  saveRecord(title) {
    if (!this._currentSuite) {
      throw new TypeError('Unable to find current Suite!');
    }

    if (!title) {
      throw new TypeError('Missing record title!');
    }

    if (!this._recordsets[this._currentSuite]) {
      throw new TypeError(`Missing or null records list for ${this._currentSuite}`);
    }

    this._recordsets[this._currentSuite][title] = {
      title,
      suite: this._currentSuite,
      result: RESULT.PENDING,
      payload: null,
    };
  }

  updateRecord(title, result, payload) {
    if (!this._currentSuite) {
      throw new TypeError('Unable to find current Suite!');
    }

    if (!RESULTS.includes(result)) {
      throw new TypeError(`Result should be one of ${RESULTS.join()}. Got ${result}.`);
    }

    this._recordsets[this._currentSuite][title] =
      Object.assign({}, this._recordsets[this._currentSuite][title], { result, payload });
  }

  closeRecord() {
    this._processed += 1;
    const isLastRecord = this._processed === Object.keys(this._recordsets[this._currentSuite]).length;

    if (isLastRecord) {
      EventBus.emit('database:process:end', this._recordsets); // Might not be the right place
    }
  }
}

module.exports = new Database();
