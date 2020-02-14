const { readdirSync, statSync } = require('fs');
const { join } = require('path');

/**
 * Returns a list of usable extensions from a comma separated list
 * @param {string} extensions
 * @returns {[]string}
 */
function getExtensionsList(extensions) {
  return extensions ? extensions.split(',') : [];
}

/**
 * Returns the list (possibly) filtred of all the files in subfolders
 * given a rootDirectory
 *
 * @param {string} rootDirectory
 * @param {{extensions: string}} filters
 *
 * @returns {string[]}
 */
function getFiles(rootDirectory, filters = {}) {
  const items = readdirSync(rootDirectory);
  const extensions = getExtensionsList(filters.extensions);

  /**
   * Item can be either a file or a directory
   */
  return items.reduce((paths, item) => {
    const itemPath = join(rootDirectory, item);

    const stats = statSync(itemPath);

    if (stats.isDirectory()) {
      const childrenFilteredFiles = getFiles(itemPath, filters);

      paths.push(...childrenFilteredFiles);
    } else {
      const fileHasAllowedExtension = extensions.some(extension => itemPath.endsWith(extension));

      if (fileHasAllowedExtension) {
        paths.push(itemPath);
      }
    }

    return paths;
  }, []);
}

module.exports = { getFiles };
