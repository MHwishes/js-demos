const path = require('path');
const {merge} = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.js');

const serverConfig = {
  target: 'node', // 排除node内置模块，fs、path
  mode: 'development',
  entry: './src/server.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build')
  },
  module:{
    rules:[{
      test:/\.css$/,
      use: [
        'isomorphic-style-loader',
        {
            loader: 'css-loader',
            options: {
              modules: true
            }
      }]
    }]
  },
  externals: [nodeExternals()] //排除node_modules模块
}
module.exports = merge(baseConfig, serverConfig)