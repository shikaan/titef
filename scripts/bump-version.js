const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const git = require('simple-git')(resolve(__dirname, '..'));

const packageJSONPath = resolve(__dirname, '../package.json');

// Get and cleans version number from first argument
const getVersion = () => {
  const raw = process.argv[2];
  if (raw && raw !== '') {
    if (Number.isNaN(Number.parseInt(raw[0], 10))) {
      return raw.slice(1);
    }
    return raw;
  }
  throw new Error('Missing version!');
};

const updatePackageJSON = () => {
  // Captures the version number in package.json as second capturing group
  const capturedVersion = /("version": ")(.*)(",)/;

  // Reads the content of the old package.json as string
  const oldPackageJSON = readFileSync(packageJSONPath, 'utf-8');

  // Replaces the string version in package.json with the provided one
  const newPackageJSON = oldPackageJSON.replace(capturedVersion, `$1${getVersion()}$3`);

  writeFileSync(packageJSONPath, newPackageJSON, 'utf-8');
};

const pushChanges = async () => {
  git.add(packageJSONPath);


};

