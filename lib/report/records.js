const {
  records, promises, RESULT, RESULTS,
} = require('./_const');

const saveRecord = (title, suite, promise) => {
  if (title && suite) {
    if (!records[suite]) {
      records[suite] = {};
    }

    records[suite][title] = {
      title,
      suite,
      result: RESULT.PENDING,
      payload: null,
    };

    promises.push(promise);
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
