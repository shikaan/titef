const EventEmitter = require('events');
const { EVENT, RESULT, RESULTS } = require('./_const');

class Database extends EventEmitter {
  static parent(obj, path) {
    const [first, rest] = path.split(/\.(.*)/);
    return rest ? Database.parent(obj[first], rest) : obj;
  }

  static open(obj, path) {
    const [first, rest] = path.split(/\.(.*)/);
    return rest ? Database.open(obj[first], rest) : obj[first];
  }

  /* eslint-disable no-param-reassign */
  static create(obj, path, value) {
    const [first, rest] = path.split(/\.(.*)/);

    if (rest) {
      obj[first] = obj[first] || {};

      return Database.create(obj[first], rest, value);
    }
    obj[first] = value;
    return obj;
  }
  /* eslint-enable no-param-reassign */

  constructor() {
    super();

    this._recordsets = {};
    this._processed = 0;
    this._created = 0;

    this.on(EVENT.DATABASE.RECORDSET.CREATE, this.createRecordset);
    this.on(EVENT.DATABASE.RECORD.CREATE, this.createRecord);
    this.on(EVENT.DATABASE.RECORD.UPDATE, this.updateRecord);
    this.on(EVENT.DATABASE.RECORD.CLOSE, this.closeRecord);
  }

  createRecordset(path, silent) {
    const meta = { processed: 0, path, silent };
    Database.create(this._recordsets, path, Object.defineProperty({}, 'meta', { value: meta }));
  }

  createRecord(path) {
    if (!path) {
      throw new TypeError('Missing record path!');
    }

    const parent = Database.parent(this._recordsets, path);
    if (!parent) {
      throw new TypeError(`Missing or null records list for ${path}`);
    }

    this._created += 1;

    Database.create(this._recordsets, path, {
      result: RESULT.PENDING,
      payload: null,
    });
  }

  updateRecord(path, result, payload) {
    if (!RESULTS.includes(result)) {
      throw new TypeError(`Result should be one of ${RESULTS.join()}. Got ${result}.`);
    }

    const recordset = Database.open(this._recordsets, path);
    if (!recordset) {
      throw new TypeError(`Missing or null records list for ${path}`);
    }

    recordset.result = result;
    recordset.payload = payload;
  }

  closeRecord(path) {
    setImmediate(() => {
      // #==
      // Checking if it's last record
      this._processed += 1;
      const isLastRecord = this._processed === this._created;

      // #==
      // Checking if it's last record in current suite
      const parent = Database.parent(this._recordsets, path);
      parent.meta.processed += 1;
      const currentSuiteLength = Object.values(parent).filter(item => !item.meta).length;
      const isLastRecordInSuite = parent.meta.processed === currentSuiteLength;

      if (isLastRecord) {
        this.emit(EVENT.DATABASE.PROCESS.ENDED, this._recordsets);
      } else if (isLastRecordInSuite) {
        this.emit(EVENT.DATABASE.RECORDSET.CLOSED, parent.meta.path);
      }
    });
  }
}

module.exports = new Database();
