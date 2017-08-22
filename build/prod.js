var path = require('path');
var config = require('./base');
var webpack = require('webpack');

module.exports = Object.assign({}, config, {
    entry: './src/VueQueryBuilder.vue',
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'vue-query-builder.js',
      library: ['vue-query-builder'],
      libraryTarget: 'umd'
    },
    devtool: false,
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
});