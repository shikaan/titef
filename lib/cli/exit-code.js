// FIXME: one day we'll move everything to an event handled application, but this is not that day.

let exitCode = 0;

const getExitCode = () => exitCode;
const setExitCode = (value) => {
  exitCode = value;
};

module.exports = {
  getExitCode,
  setExitCode,
};
