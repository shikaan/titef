const assert = require('assert');
const mockFs = require('mock-fs');
const { join } = require('path');
const DirectoryWalker = require('./directory-walker');

suite('DirectoryWalker#getFiles', {
  afterEach() {
    mockFs.restore();
  },
}, () => {
  spec('returns nothing for empty root', () => {
    mockFs({
      '/root': {},
    });

    const dw = new DirectoryWalker('/root', {});
    const files = dw.getFiles();

    assert.equal(files.length, 0);
  });
  spec('throws if missing rootDirectory path', () => {
    const dw = new DirectoryWalker(null, {});
    assert.throws(() => dw.getFiles());
  });
  spec('returns an empty list if extension does not match', () => {
    mockFs({
      '/root': {
        'file1.ext': '',
        'file2.ext': '',
        'file3.ext': '',
      },
    });

    const dw = new DirectoryWalker('/root', { extensions: '.no-ext' });
    const files = dw.getFiles();

    assert.equal(files.length, 0);
  });

  spec('lists files with given extensions', () => {
    const root = '/root';

    mockFs({
      [root]: {
        'file1.ext': '',
        'file2.another.ext': '',
        'file3.yetanotherext': '',
      },
    });

    const dw = new DirectoryWalker(root, { extensions: 'ext,another.ext' });
    const files = dw.getFiles();

    assert.ok(files.includes(join(root, 'file1.ext')));
    assert.ok(files.includes(join(root, 'file2.another.ext')));
    assert.ok(!files.includes(join(root, 'file3.yetanotherext')));
  });
});
