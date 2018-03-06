const print = (...args) => {
  const line = [...args, '\n'];
  return process.stdout.write(line.map(String).join(''));
};

module.exports = () => {
  print(`Usage: titef [OPTIONS] [FILE]
Executes test files written in Titef framework.

Options:
  -h, --help            shows this help
  `);
};
