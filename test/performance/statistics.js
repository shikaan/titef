class Statistics {
  constructor() {
    this.sample = [];
  }

  get std() {
    const n = this.sample.length;

    const num = this.sample.reduce((sum, value) => sum + Math.pow(value - this.mean, 2));

    return Math.sqrt(num / (n - 1));
  }

  get mean() {
    const n = this.sample.length;
    return this.sample.reduce((sum, value) => sum + value) / n;
  }
}

module.exports = Statistics;
