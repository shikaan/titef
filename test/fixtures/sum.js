module.exports = (a, b) => {
  const saneA = Number.parseInt(a, 10);
  const saneB = Number.parseInt(b, 10);

  if (Number.isNaN(saneA)) {
    throw new TypeError('First argument is not number');
  }

  if (Number.isNaN(saneB)) {
    throw new TypeError('Second argument is not number');
  }

  return saneA + saneB;
};
