const {
  saveRecord,
  updateRecord,
  RESULT,
} = require('./report');

const spec = async (title, callback) => {
  let resolve;
  // A promise to be resolved when the spec is done.
  // This is used to make the print method aware of which specs are done.
  const promise = new Promise((r) => { resolve = r; });
  saveRecord(title, promise);

  try {
    await callback();
    updateRecord(title, RESULT.SUCCESS);
  } catch (e) {
    updateRecord(title, RESULT.FAILURE, e);
  }

  return resolve && resolve();
};

const xspec = async (title) => {
  saveRecord(title, Promise.resolve());
  updateRecord(title, RESULT.IGNORED);
};

module.exports = {
  spec,
  xspec,
};
