/* eslint-disable no-param-reassign */
const EventEmitter = require('events');
const { EVENT, RESULT, RESULTS } = require('./_const');

class Database extends EventEmitter {
  /**
   * Create an object with the given path and assign a value to it
   *
   * @example create({}, 'foo.bar', 1) === {foo: {bar: 1}}
   *
   * @param {Object} obj
   * @param {String} path
   * @param {any} value
   */
  static create(obj, path, value) {
    const [first, rest] = path.split(/\.(.*)/);

    if (rest) {
      obj[first] = obj[first] || {};

      return Database.create(obj[first], rest, value);
    }
    obj[first] = value;
    return obj;
  }

  /**
   * Open an object with the given path
   *
   * @example open({foo: {bar: 1}}, 'foo.bar') === 1
   *
   * @param {Object} obj
   * @param {String} path
   */
  static open(obj, path) {
    const [first, rest] = path.split(/\.(.*)/);
    return rest ? Database.open(obj[first], rest) : obj[first];
  }

  /**
   * Open an object's parent with the given path
   *
   * @example open({foo: {bar: 1}}, 'foo.bar') === {bar: 1}
   *
   * @param {Object} obj
   * @param {String} path
   */
  static parent(obj, path) {
    const [first, rest] = path.split(/\.(.*)/);
    return rest ? Database.parent(obj[first], rest) : obj;
  }

  /**
   * Takes a high-resolution time tuple and converts it in ms
   *
   * @param {Array<Number>} hrtime
   *
   * @returns {number}
   */
  static toMilliseconds([seconds, nanoseconds]) {
    const ns = (seconds * 1e9) + nanoseconds;
    return ns / 1e6;
  }

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
    const meta = {
      duration: process.hrtime(),
      processed: 0,
      path,
      silent,
    };
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
      duration: process.hrtime(),
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
      // Checking if it's last record in all database
      this._processed += 1;
      const isLastRecord = this._processed === this._created;

      // Checking if it's last record in current suite
      const parent = Database.parent(this._recordsets, path);
      parent.meta.processed += 1;
      const currentSuiteLength = Object.values(parent).filter((item) => !item.meta).length;
      const isLastRecordInSuite = parent.meta.processed === currentSuiteLength;

      if (isLastRecord) {
        parent.meta.duration = Database.toMilliseconds(process.hrtime(parent.meta.duration));
        this.emit(EVENT.DATABASE.PROCESS.ENDED, this._recordsets);
      } else if (isLastRecordInSuite) {
        parent.meta.duration = Database.toMilliseconds(process.hrtime(parent.meta.duration));
        this.emit(EVENT.DATABASE.RECORDSET.CLOSED, parent.meta.path);
      } else {
        const record = Database.open(this._recordsets, path);
        record.duration = Database.toMilliseconds(process.hrtime(record.duration));
      }
    });
  }
}

module.exports = new Database();
