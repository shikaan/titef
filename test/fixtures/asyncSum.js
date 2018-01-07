module.exports = (a, b) => new Promise((resolve, reject) => {
  const saneA = Number.parseInt(a, 10);
  const saneB = Number.parseInt(b, 10);

  if (Number.isNaN(saneA)) {
    reject(new TypeError('First argument is not number'));
  }

  if (Number.isNaN(saneB)) {
    reject(new TypeError('Second argument is not number'));
  }

  resolve(saneA + saneB);
});
