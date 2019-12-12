
// build/webpack.prod.js
// 引入清除打包后文件的插件（最新版的需要解构，不然会报不是构造函数的错，而且名字必须写CleanWebpackPlugin）
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 引入配置合并插件
const merge = require('webpack-merge');
// 引入通用配置
const webpackCommonConfig = require('./webpack.config.js');
// 分析打包后模块分析插件
const webpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(webpackCommonConfig, {
  // 指定模式，这儿有none production development三个参数可选
  // 具体作用请查阅官方文档
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    new webpackBundleAnalyzer({
      analyzerMode: 'static'
    }),
  ]
});