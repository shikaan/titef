/* eslint-disable prefer-arrow-callback */

const { suite, spec, xspec } = require('../lib');
const assert = require('assert');

suite('suite', function asdf() {
  spec('spec', function asdf2() {

  });
  suite('suite 1', function asdf3() {
    spec('spec 1', function asdf4() {
      assert(false);
    });
  });

  xspec('ignored');
});
