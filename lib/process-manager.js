const EventEmitter = require('events');
const { EVENT } = require('./_const');

class ProcessManager extends EventEmitter {
  constructor() {
    super();

    this.exitCode = 0;

    this.on(EVENT.PROCESS.EXIT, () => {
      process.exit(this.exitCode);
    });

    this.on(EVENT.PROCESS.EXIT_CODE.FAILURE, () => {
      this.exitCode = 1;
    });
  }
}

module.exports = new ProcessManager();
