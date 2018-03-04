const {
  RESULT, RESULTS,
} = require('./_const');
const EventEmitter = require('events');
const EventBus = require('./event-bus');
const { EVENT } = require('./_const');

class Database extends EventEmitter {
  constructor() {
    super();

    this._recordsets = {};
    this._processed = 0;
    this._currentSuite = null;

    this.on(EVENT.DATABASE.RECORDSET.CREATE, this.createRecordset);
    this.on(EVENT.DATABASE.RECORD.CREATE, this.createRecord);
    this.on(EVENT.DATABASE.RECORD.UPDATE, this.updateRecord);
    this.on(EVENT.DATABASE.RECORD.CLOSE, this.closeRecord);
  }

  createRecordset(suite) {
    this._currentSuite = suite;
    this._recordsets[this._currentSuite] = {};
  }

  createRecord(title) {
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
    const currentSuiteLength = Object.keys(this._recordsets[this._currentSuite]).length;
    const isLastRecord = this._processed === currentSuiteLength;

    if (isLastRecord) {
      EventBus.emit(EVENT.DATABASE.PROCESS.ENDED, this._recordsets);
    }
  }
}

module.exports = new Database();
