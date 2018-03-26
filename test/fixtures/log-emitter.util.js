const EventEmitter = require('events');

const oldies = {
  emit: EventEmitter.prototype.emit,
};

EventEmitter.prototype.emit = (...args) => {
  const line = ['\x1b[1m\x1b[36m[ SEND ]\x1b[0m', `\x1b[33m${args.reverse().pop()}\x1b[0m`, ...args, '\n'];
  process.stdout.write(line.map(String).join(''));
  oldies.emit.call(this, ...args);
};
