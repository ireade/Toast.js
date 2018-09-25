var path = require('path');
var webpack = require("webpack");

module.exports = {
  entry: './src/js/app.js',
  devtool: 'source-map',
	mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'Toast.min.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015'],
      }
    }]
  }
};