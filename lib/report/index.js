const { RESULT } = require('./_const');
const { printRecords } = require('./print');
const { updateRecord, saveRecord } = require('./records');

module.exports = {
  saveRecord,
  updateRecord,
  printRecords,
  RESULT,
};
