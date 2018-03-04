const { join } = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BannerPlugin } = require('webpack');

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
  ],
};

const generateConfiguration = ({
  entry, output, additionalPlugins = [], externals,
}) => {
  const plugins = process.env.NODE_ENV === 'development'
    ? additionalPlugins
    : [
      new UglifyJsPlugin({
        test: /\.js($|\?)/i,
      }),
      ...additionalPlugins,
    ];

  return {
    target: 'node',
    entry,
    output,
    plugins,
    externals,
  };
};

module.exports = [
  generateConfiguration(libConfig),
  generateConfiguration(cliConfig),
];
