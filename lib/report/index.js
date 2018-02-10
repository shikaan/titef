const { RESULT } = require('./_const');
const { printRecords } = require('./print');
const { updateRecord, saveRecord, startSuite } = require('./records');

module.exports = {
  updateRecord,
  printRecords,
  RESULT,
  saveRecord,
  startSuite,
};
