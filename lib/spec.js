const {
  TEXT_FORMAT,
  print,
  getErrorName,
} = require('./_utils');

const spec = async (title, callback) => {
  try {
    if (callback[Symbol.toStringTag] === 'AsyncFunction') {
      try {
        await callback();
      } catch (e) {
        throw e;
      }
    } else {
      callback();
    }
    print(TEXT_FORMAT.GREEN, `[ ✔ ] ${title}`);
  } catch (e) {
    const message = e.toString().split(':').slice(-1)[0];
    print(TEXT_FORMAT.RED, `[ ✕ ] ${title}`);
    if (e.code === 'ERR_ASSERTION' || /^AssertionError/.test(e.toString())) {
      const operator = getErrorName(e.operator);
      const expected = getErrorName(e.expected);
      const actual = getErrorName(e.actual);

      print(`ASSERTION ERROR:${message}`);

      if (operator === 'fail') {
        print(`  Expected: ${expected}`);
        print(`  Actual:   ${actual}`);
      }
    } else {
      print(`UNHANDLED ERROR:${message}`);
      print(e);
    }
  }
};

const xspec = async (title) => {
  print(TEXT_FORMAT.YELLOW, `[ - ] ${title}`);
};

module.exports = {
  spec,
  xspec,
};
