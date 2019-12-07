// build/webpack.config.js
// node.js里面自带的操作路径的模块
const path = require("path");

module.exports = {
  // 指定模式，这儿有none production development三个参数可选
  // 具体作用请查阅官方文档
  mode: "development",
  // webpack打包的入口文件
  entry: {
    main: path.resolve(__dirname, "../src/main.js")
  },
  // webpack打包的输出相关的额配置
  output: {
    // 打包过后的文件的输出的路径
    path: path.resolve(__dirname, "../dist"),
    // 打包后生成的js文件，带hash值来保证文件的唯一性
    filename: "js/[name].[hash:4].js",
    // 生成的chunk文件名
    chunkFilename: "js/[name].[hash:4].js",
    // 资源的引用路径（这个跟你打包上线的配置有关系）
    publicPath: "./"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }	
        ]
      }
    ]
  }
};
