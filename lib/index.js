const Suite = require('./suite');
const Spec = require('./spec');

module.exports = {
  suite: Suite.suite,
  spec: Spec.spec,
  xspec: Spec.spec,
};
