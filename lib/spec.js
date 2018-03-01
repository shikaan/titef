const { setExitCode } = require('./cli/exit-code');
const EventBus = require('./event-bus')

const spec = async (title, callback) => {
  let resolve;
  // A promise to be resolved when the spec is done.
  // This is used to make the print method aware of which specs are done.
  const promise = new Promise((r) => {
    resolve = r;
  });
  EventBus.emit('spec:start', title, promise);

  try {
    await callback();
    EventBus.emit('spec:success', title);
  } catch (e) {
    EventBus.emit('spec:failure', title, e);
    setExitCode(1);
  }

  EventBus.emit('spec:end');
  return resolve && resolve();
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
