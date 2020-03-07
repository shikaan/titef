const assert = require('assert');
const { promisify } = require('util');

const { readFile } = require('fs');
const { join } = require('path');
const { suite, spec, xspec } = require('..');

suite('AsyncNode', () => {
  const dummyPath = join(__dirname, 'fixtures', 'dummy');
  spec('should read dummy file', async () => {
    const result = await promisify(readFile)(dummyPath, 'utf-8');
    assert.deepStrictEqual(result, 'dummy dummy dummy');
  });

  xspec('ignore this', () => {});

  spec('should fail assertion', async () => {
    const result = await promisify(readFile)(dummyPath, 'utf-8');
    assert.deepStrictEqual(result, 'dummy! dummy! dummy!');
  });

  spec('unhandled', async () => {
    const result = await promisify(readFile)('not even a path', 'utf-8');
    assert.deepStrictEqual(result, 'dummy! dummy! dummy!');
  });

  spec('should throw', async () => {
    const fn = async () => {
      await promisify(readFile)('not even a path', 'utf-8');
    };

    await assert.rejects(fn, Error);
  });
});
