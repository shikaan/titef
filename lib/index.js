const { spec, xspec } = require('./spec');
const { suite } = require('./suite');

const EventBus = require('./event-bus');

// Launch event bus
EventBus.init();

// Just to not pollute the global
const ctx = {};

const api = {
  // Suite
  suite: suite.bind(ctx),
  describe: suite.bind(ctx),

  // Spec
  spec: spec.bind(ctx),
  it: spec.bind(ctx),

  // xSpec
  xspec: xspec.bind(ctx),
  xit: xspec.bind(ctx),
}

Object.assign(global, api);
module.exports = api;
