const array = (() => {
  const x = [];

  for (let i = 0; i < 10000; i += 1) {
    x.push(Math.floor(Math.random() * 100000));
  }

  return x;
})();

const print = (...args) => {
  const line = [...args, '\n'];
  return process.stdout.write(line.map(String).join(''));
};

const toMilliseconds = ([seconds, nanoseconds]) => {
  const ns = (seconds * 1e9) + nanoseconds;
  return ns / 1e6;
};


module.exports = { array, print, toMilliseconds };
