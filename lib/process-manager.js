const EventEmitter = require('events');
const { EVENT } = require('./_const');

class ProcessManager extends EventEmitter {
  constructor() {
    super();

    this._exitCode = 0;

    this.on(EVENT.PROCESS.EXIT, () => {
      setImmediate(() => {
        process.exit(this._exitCode);
      });
    });

    this.on(EVENT.PROCESS.EXIT_CODE.FAILURE, () => {
      this._exitCode = 1;
    });
  }
}

module.exports = new ProcessManager();
