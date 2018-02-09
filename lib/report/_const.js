const records = {};

const RESULT = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  IGNORED: 'IGNORED',
};

const TEXT_FORMAT = {
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  RESET: '\x1b[0m',
  BOLD: '\x1b[1m',
};

const RESULTS = Object.values(RESULT);

module.exports = {
  records,
  RESULT,
  RESULTS,
  TEXT_FORMAT,
};
