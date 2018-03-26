const { suite, spec, xspec } = require('../lib');
const assert = require('assert');

suite('suite', () => {
  spec('spec', () => {
    assert(false);
  });

  suite('suite 1', () => {
    spec('spec 1', () => {
      assert(false);
    });

    suite('suite 1.1', () => {
      spec('spec 1.1', () => {

      });

      spec('spec 1.2', () => {
        assert(false);
      });

      spec('spec 1.3', () => {

      });
    });
  });

  xspec('ignored');

  suite('suite 2', () => {
    spec('spec 2', () => {
      assert(false);
    });
  });
});
