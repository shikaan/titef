const {
  saveRecord,
  updateRecord,
  RESULT,
} = require('./report');

const spec = async (title, callback) => {
  saveRecord(title, 'test');

  try {
    await callback();
    updateRecord(title, 'test', RESULT.SUCCESS);
  } catch (e) {
    updateRecord(title, 'test', RESULT.FAILURE, e);
  }
};

const xspec = async (title) => {
  saveRecord(title, 'test');
  updateRecord(title, 'test', RESULT.IGNORED);
};

module.exports = {
  spec,
  xspec,
};
