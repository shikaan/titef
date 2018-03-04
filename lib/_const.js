const EVENT = {
  PROCESS: {
    EXIT: 'process:exit',
    EXIT_CODE: {
      FAILURE: 'process:exit-code:failure',
    },
  },
  DATABASE: {
    RECORDSET: {
      CREATE: 'database:recordset:create',
    },
    RECORD: {
      CREATE: 'database:record:create',
      UPDATE: 'database:record:update',
      CLOSE: 'database:record:close',
    },
    PROCESS: {
      ENDED: 'database:process:ended',
    },
  },
  SUITE: {
    STARTED: 'suite:started',
  },
  SPEC: {
    STARTED: 'spec:started',
    SUCCESS: 'spec:success',
    IGNORE: 'spec:ignore',
    FAILURE: 'spec:failure',
    ENDED: 'spec:ended',
  },
  REPORTER: {
    REPORT: {
      START: 'reporter:report:start',
      ENDED: 'reporter:report:ended',
    },
  },
};

const RESULT = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  IGNORED: 'IGNORED',
};

const RESULTS = Object.values(RESULT);


module.exports = {
  EVENT,
  RESULT,
  RESULTS,
};
