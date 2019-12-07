# 基于webpack 4搭建的Vue移动端开发环境
## 写在前面
在使用Vue开发单页面的时候，我们大多数时候都是使用的官方CLI工具，现在的Vue CLI已经迭代到了4.X了，可以说很成熟稳定了，能满足大多数要求，而且上手简单。本着折腾摸索的精神，还是打算自己搭建一个开发环境，熟悉各个流程。
> 本文不涉及Webpack和babel知识的讲解，建议了解一下Webpack的基本知识来看这篇文章会更好理解。这个在网上能找到很多教程。关于node.js和npm安装在这里也不再赘述，相信做前端开发这个是电脑必备的。

我的node.js及npm版本如下：
```
node -v
v12.13.0

npm -v
v6.12.0
```
## 开始
### 1、初始化一个项目
首先你要新建一个文件夹，我这儿叫 `customized-vue-proj-mobile`，然后在你的文件夹右键打开git bash输入以下命令来初始化项目（需要安装git，当然用cmd也是可以的）：
```
npm init
```
执行完这个命令过后，会在目录生成一个 `package.json` 的文件，我的文件内容如下：
```
{
  "name": "customized-vue-proj-mobile",
  "version": "1.0.0",
  "description": "customized vue development environment",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/cookiepool/customized-vue-proj-mobile.git"
  },
  "keywords": [
    "vue",
    "mobile"
  ],
  "author": "LEE",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/cookiepool/customized-vue-proj-mobile/issues"
  },
  "homepage": "https://github.com/cookiepool/customized-vue-proj-mobile#readme"
}
```
> 这儿关于npm包管理也有很多知识点，这里不在展开，建议大家可以自行了解下

这样一个项目就先初始化完毕，接下来开始进入各种工具的安装来完成环境的搭建。

### 2、安装webpack
基于webpack的话肯定要先安装好webpack才能继续安装后续的，所以先来安装命令：
```
npm install webpack --save-dev
```
> - `--save-dev` 表示将包安装信息放入到 `package.json` 的 `devDependencies` 里面，这个不会用于生产环境，`-D` 等效于 `--save-dev`。
> - `--save` 表示将包安装信息放入到 `package.json` 的 `dependencies` 里面，这个会打包用于生产环境。`-S` 等效于 `--save`。

接下来还需要安装CLI，从webpack4开始必须要安装webpack cli才能执行webpack相关的命令
```
npm install webpack-cli -D
```
接下来输入 `npx webpack --help` 来测试webpack是否处于可用状态，如果输入这个命令后面板出现一大串配置帮助信息则代表webpack可用。

> npx 可以直接调用项目内部安装的模块，而不需要全局安装npm模块，如果上面的命令你不使用npx你会发现系统显示 `bash: webpack: command not found`。
---

现在在项目目录下新建一个src文件夹，里面新建一个main.js文件，在里面先随便写点js代码。然后在建立一个build文件夹，并新建一个webpack.config.js配置文件。这样一来我们的目录结构就是这个样子：

![1.png](https://i.loli.net/2019/12/07/CedKaiRHpPIxOyq.png)

文件建好了但是还没有内容，肯定跑不起来，接下来对webpack.config.js操作一番，这里我不叙述具体过程了（#滑稽保命），直接贴代码，里面我写了注释：
```
// build/webpack.config.js
// node.js里面自带的操作路径的模块
const path = require('path');

module.exports = {
    // 指定模式，这儿有none production development三个参数可选
    // 具体作用请查阅官方文档
    mode: 'development',
    // webpack打包的入口文件
    entry: {
        main: path.resolve(__dirname, '../src/main.js')
    },
    // webpack打包的输出相关的额配置
    output: {
        // 打包过后的文件的输出的路径
        path: path.resolve(__dirname, '../dist'),
        // 打包后生成的js文件，带hash值来保证文件的唯一性
        filename: 'js/[name].[hash:4].js',
        // 生成的chunk文件名
        chunkFilename: 'js/[name].[hash:4].js',
        // 资源的引用路径（这个跟你打包上线的配置有关系）
        publicPath: './'
    }
}
```
然后呢再把package.json改造一下，在scripts处添加一句 `dev` 这个命令：
```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "webpack ./src/main.js --config ./build/webpack.config.js"
},
```
一顿操作过后，我们开始来试一试这个命令能不能用，在控制台下输入:
```
npm run dev
```
稍等一会儿就会出现以下信息，则代表我们打包输出成功：

![2.png](https://i.loli.net/2019/12/07/jpS5kTZyzxDlGWC.png)

此时项目的结构变成这个样子：

![3.png](https://i.loli.net/2019/12/07/BAsWHbN17egQLoT.png)

环境搭建到这儿只能说webpack配置正常了，还有许多额外东西需要配置，比如以下

- babel，这个可以把ES6+转换为低浏览器可用的ES5，以及对一些新API做polyfill处理
- css预处理器，目前css预处理器有很多选择，这里我选择了scss来做配置，当然你不使用css预处理器也是可以的。
- 文件处理loader，这个主要是项目相关的图片、字体、音视频的处理。
- html文件自动创建，你打包好的js文件等需要正确的导入html才能正常使用。
- postcss，这个工具主要是处理css的，安装相关的插件可以实现一些功能，比如自动添加css3的前缀，移动开发中用到的px-to-rem或者px-to-vw等等。
- 热更新功能，在开发过程中自动响应我们的修改并更新，不需要手动刷新。
- 识别.vue文件，这个是让webpack识别.vue文件并转换成浏览器能使用的内容。
- 集成vue-router和vuex，做单页面路由不可少，状态管理根据需要来引入即可，不是必须要配置的东西。 