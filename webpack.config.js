/*
 *./webpack.config.js
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: {
    bundle: './client/index.js',
    Diff2Html: './node_modules/diff2html/dist/diff2html-ui.js'
  },
  output: {
    path: path.resolve('docs'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css?$/,
        /*include: [
          path.resolve(__dirname, 'reuse/client/src/assets/fonts'),
          path.resolve(__dirname, 'reuse/client/src/components/icon')
        ],*/
        loader: 'style-loader!css-loader' // never use source maps on these files, exclude: /node_modules/
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery'
    })
  ],
  devServer: {
    inline: true,
    port: 8008
  },
  devtool: 'cheap-source-map'
};
