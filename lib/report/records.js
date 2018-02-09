const { records, RESULT, RESULTS } = require('./_const');

const saveRecord = (title, suite) => {
  if (title && suite) {
    if (!records[suite]) {
      records[suite] = {};
    }

    records[suite][title] = {
      title,
      specification: suite,
      result: RESULT.PENDING,
      payload: null,
    };
  }
};

const updateRecord = (title, suite, result, payload) => {
  if (!RESULTS.includes(result)) {
    throw new TypeError(`Result should be one of ${RESULTS.join()}. Got ${result}.`);
  }
  records[suite][title] = Object.assign({}, records[suite][title], { result, payload });
};

module.exports = {
  saveRecord,
  updateRecord,
};
