const { join } = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  target: 'node',
  entry: {
    bundle: join(__dirname, 'lib', 'index.js'),
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: 'titef.js',
    libraryTarget: 'commonjs',
  },
  plugins: [
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
    }),
  ],
};
