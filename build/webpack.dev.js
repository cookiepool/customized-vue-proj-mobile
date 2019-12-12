// build/webpack.dev.js
// 引入webpack
const webpack = require('webpack');
// 引入webpack通用配置
const webpackCommonConfig = require('./webpack.config.js');
// 引入配置合并插件
const merge = require('webpack-merge');

module.exports = merge(webpackCommonConfig, {
  // 指定模式，这儿有none production development三个参数可选
  // 具体作用请查阅官方文档
  mode: "development",
  plugins: [
    // 辅助HotModuleReplacementPlugin插件
    new webpack.NamedModulesPlugin(),
    // 启用热更新必须的
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    // 默认情况不设置这个只能通过localhost:9000来访问，现在可以通过本机局域网ip来访问，
    // 比如192.168.12.21:9000，手机在这个局网内也可以访问
    host: '0.0.0.0',
    hot: true,
    port: 9200,
    contentBase: './dist'
  }
});