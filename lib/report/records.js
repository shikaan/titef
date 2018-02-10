const {
  records, promises, RESULT, RESULTS,
} = require('./_const');

let LAST_SUITE;

const saveRecord = (title, promise) => {
  const suite = LAST_SUITE;

  if (!suite) {
    throw new TypeError('Missing LAST_SUITE!');
  }

  if (!title) {
    throw new TypeError('Missing record title!');
  }

  if (!records[suite]) {
    throw new TypeError(`Missing or null records list for ${suite}`);
  }

  records[suite][title] = {
    title,
    suite,
    result: RESULT.PENDING,
    payload: null,
  };

  promises[suite] = promises[suite] ? [...promises[suite], promise] : [promise];
};

const updateRecord = (title, result, payload) => {
  const suite = LAST_SUITE;

  if (!suite) {
    throw new TypeError('Missing LAST_SUITE!');
  }

  if (!RESULTS.includes(result)) {
    throw new TypeError(`Result should be one of ${RESULTS.join()}. Got ${result}.`);
  }
  records[suite][title] = Object.assign({}, records[suite][title], { result, payload });
};

const startSuite = (suite) => {
  LAST_SUITE = suite;
  records[suite] = {};
};

module.exports = {
  saveRecord,
  updateRecord,
  startSuite,
};
