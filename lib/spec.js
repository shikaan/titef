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
  saveRecord(title, 'test', promise);

  try {
    await callback();
    updateRecord(title, 'test', RESULT.SUCCESS);
  } catch (e) {
    updateRecord(title, 'test', RESULT.FAILURE, e);
  }

  return resolve && resolve();
};

const xspec = async (title) => {
  saveRecord(title, 'test', Promise.resolve());
  updateRecord(title, 'test', RESULT.IGNORED);
};

module.exports = {
  spec,
  xspec,
};
