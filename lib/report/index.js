const EventEmitter = require('events');
const { printRecords } = require('./print');
const EventBus = require('../event-bus');

class Reporter extends EventEmitter {
  constructor(name) {
    super(name);

    this.on('database:process:end', async (database) => {
      EventBus.emit('report:start');
      await printRecords(database);
      EventBus.emit('report:end');
    });
  }
}

module.exports = {
  Reporter: new Reporter('Reporter'),
};
