const { readdirSync, statSync } = require('fs');
const { join, basename } = require('path');


class DirectoryWalker {
  /**
   * @param {string} directory
   * @param {{extensions: string}} options
   */
  constructor(directory, options) {
    this.directory = directory;
    this.options = DirectoryWalker.parseOptions(options);
  }

  /**
   * @private
   *
   * @param {{extensions: string}} options
   */
  static parseOptions(options) {
    return {
      extensions: options.extensions ? options.extensions.split(',') : [],
    };
  }

  /**
   * @private
   *
   * @param {string} filePath
   * @returns {boolean}
   */
  hasFileAllowedExtension(filePath) {
    const fileBaseName = basename(filePath);

    // Not using extname because we might want to capture extensions with
    // multiple dots (e.g. file.test.js) and extname in this case would
    // return only .js instead of .test.js
    const fileExtension = fileBaseName.substring(fileBaseName.indexOf('.') + 1);

    return this.options.extensions.some((extension) => fileExtension === extension);
  }

  /**
   * Returns the list (possibly) filtred of all the files in the directory
   *
   * @param {string} [rootDirectory]
   *
   *  @returns {string[]}
   */
  getFiles(rootDirectory = this.directory) {
    const items = readdirSync(rootDirectory);

    /**
    * Item can be either a file or a directory
    */
    return items.reduce((paths, item) => {
      const itemPath = join(rootDirectory, item);

      const stats = statSync(itemPath);

      if (stats.isDirectory()) {
        const childrenFilteredFiles = this.getFiles(itemPath);

        paths.push(...childrenFilteredFiles);
      } else {
        const fileHasAllowedExtension = this.hasFileAllowedExtension(itemPath);

        if (fileHasAllowedExtension) {
          paths.push(itemPath);
        }
      }

      return paths;
    }, []);
  }
}

module.exports = DirectoryWalker;
