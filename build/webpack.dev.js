// build/webpack.dev.js
// 引入webpack
const webpack = require('webpack');
// 引入webpack通用配置
const webpackCommonConfig = require('./webpack.config.js');
// 引入配置合并插件
const merge = require('webpack-merge');
// 引入控制台提示插件（针对webpack-dev-server）
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(webpackCommonConfig, {
  // 指定模式，这儿有none production development三个参数可选
  // 具体作用请查阅官方文档
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader', // 开发环境还是使用style-loader，不然无法及时响应样式变化
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass')
            }
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }
    ]
  },
  plugins: [
    // 辅助HotModuleReplacementPlugin插件，给模块增加标识
    // 生产环境可以用new webpack.HashedModuleIdsPlugin()
    new webpack.NamedModulesPlugin(),
    // 启用热更新必须的
    new webpack.HotModuleReplacementPlugin(),
    new friendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: 127.0.0.1:9200`]
      }
    })
  ],
  devServer: {
    // 默认情况不设置这个只能通过localhost:9000来访问，现在可以通过本机局域网ip来访问，
    // 比如192.168.12.21:9000，手机在这个局网内也可以访问
    host: '0.0.0.0',
    hot: true,
    port: 9200,
    contentBase: './dist',
    clientLogLevel: "error", // 关闭在浏览器控制台显示消息的功能，可能的值有 none, error, warning 或者 info（默认值）。这里我设置为只显示错误消息
    overlay: {
      errors: true,
      warnings: true
    },
    quiet: true
  }
});