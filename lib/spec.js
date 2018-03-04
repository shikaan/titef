const EventBus = require('./event-bus');

const spec = async (title, callback) => {
  EventBus.emit('spec:start', title);

  try {
    await callback();
    EventBus.emit('spec:success', title);
  } catch (e) {
    EventBus.emit('spec:failure', title, e);
  }

  EventBus.emit('spec:end');
};

const xspec = async (title) => {
  EventBus.emit('spec:start', title, Promise.resolve());
  EventBus.emit('spec:ignored', title);
  EventBus.emit('spec:end');
};

module.exports = {
  spec,
  xspec,
};
