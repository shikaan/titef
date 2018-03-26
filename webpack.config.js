const { join } = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BannerPlugin, DefinePlugin } = require('webpack');

const libConfig = {
  entry: join(__dirname, 'lib', 'index.js'),
  output: {
    path: join(__dirname, 'dist'),
    filename: 'titef.js',
    libraryTarget: 'commonjs',
  },
};

const cliConfig = {
  entry: join(__dirname, 'lib', 'cli', 'index.js'),
  output: {
    path: join(__dirname, 'bin'),
    filename: 'titef.js',
    libraryTarget: 'commonjs',
  },
  plugins: [
    new BannerPlugin({
      banner: '#! /usr/bin/env node',
      raw: true,
    }),
    new DefinePlugin({
      VERSION: JSON.stringify(process.env.TRAVIS_TAG),
    }),
  ],
};

const generateConfiguration = ({
  entry, output, plugins = [], externals,
}) => ({
  target: 'node',
  entry,
  output,
  plugins: [
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
    }),
    ...plugins,
  ],
  externals,
});

module.exports = [
  generateConfiguration(libConfig),
  generateConfiguration(cliConfig),
];
