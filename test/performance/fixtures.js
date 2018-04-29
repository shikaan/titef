class Statistics {
  constructor() {
    this.sample = [];
  }

  get std() {
    const n = this.sample.length;

    const num = this.sample.reduce((sum, value) => sum + ((value - this.mean) ** 2));

    return Math.sqrt(num / (n - 1));
  }

  get mean() {
    const n = this.sample.length;
    return this.sample.reduce((sum, value) => sum + value) / n;
  }
}

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

module.exports = { Statistics, array, print };
