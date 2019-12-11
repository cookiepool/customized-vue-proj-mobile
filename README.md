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

### 3、配置相关工具
#### 3.1、ES6+转ES5
首先来一波安装命令，安装好相关的依赖：
```
npm install babel-loader @babel-core @babel/preset-env -D
```
- bable-loader 这个是用于webpack来处理babel的加载器，用于调用@babel/core的核心API来完成编译。
- @babel-core babel的核心，核心的api都在包含在这里。
- @babel/preset-env babel的一个预置环境。
> 参考我这篇文章来[了解一下babel](https://github.com/cookiepool/summary/issues/17)，当然社区上还有许多大佬写的文章，多看几篇可以了解的更加透彻。

- **修改webpack.config.js**

现在我们需要配置webpack来使其支持babel，这里就需要使用到刚才安装的babel-loader。在配置文件中加入以下代码：
```
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
```
- **在项目的根目录新建babel.config.js**

在文件中加入以下内容：
```
// babel.config.js
module.exports = {
  // 配置预置环境
  presets: [
    // 使用的规则
    "@babel/preset-env"
  ]
}
```
配置好后，去main.js里面写一些es6+的语法的js代码，然后执行 `npm run dev` 你会发现dist目录下生成的js文件语法都转换成es5的了，但是promise却没有转换，这里我们还需要polyfill。

- **配置polyfill并且按需引入**

输入以下命令安装必须的依赖：
```
npm install core-js@2 -S
```
安装完毕后去babel.config.js修改代码如下：
```
module.exports = {
  // 配置预置环境
  presets: [
    // 使用的规则
    ["@babel/preset-env", {
      // 这儿有false, entry, usage三个可选参数，usage可以按需引入polyfill
      "useBuiltIns": "usage",
      // 指定corejs版本
      "corejs": 2
    }]
  ]
}
```
这样一来你的js就可以运行在低版本浏览器里面了，比如Promise。

#### 3.2、配置css预处理器

还是先安装依赖
```
npm install sass-loader dart-sass css-loader style-loader -D
```
- style-loader 该loader主要是把css解析到html的style标签上。
- css-loader 该loader用来解析css，注意在调用style-loader和css-loader时，css-loader要先于style-loader执行，不然会报错，当你使用以下写法时：
```
use: [{loader: 'style-loader'}, {loader: 'css-loader'}]
```
因为loader加载是从右往左加载。（[为什么从右往左加载](https://blog.csdn.net/qq_37109325/article/details/80169289) ）这里的编译顺序是先用css-loader将css代码编译，再交给style-loader插入到网页里面去。所以css-loader在右，style-loader在左。

- sass-loader 该loader把scss或sass转换为css。
- dart-sass 这个工具类似于编译器，转换scss语法，结合到sass-loader使用，其实还有个node-sass可以使用。使用node-sass的话可以不用在webpack的配置文件里面指定，只需要用npm安装好node-sass即可，这儿我使用了dart-sass所以要在implementation中指定。

下载安装好依赖过后，在配置文件 `webpack.config.js` 中的 `module->rules` 里面加入以下代码：
```
{
  test: /\.(scss|sass)$/,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
    },
    {
      loader: 'sass-loader',
      options: {
        implementation: require('dart-sass')
      }
    }
  ]
}
```

#### 3.3、创建Html文件以及相关处理

首先在项目目录创建一个目录public，里面再创建一个index.html，作为单页面的唯一入口。代码如下：
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>customized-vue-proj-mobile</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```
此时目录结构变成如图所示

![4.png](https://i.loli.net/2019/12/08/jQhDNcRlqPKi12x.png)

创建好文件后我们需要一个插件来处理html文件，只有js文件正常导入到html文件我们的项目才能运行起来，输入以下命令来安装 `html-webpack-plugin`：
```
npm install html-webpack-plugin -D
```
安装完成后，再webpack配置文件的plugins中加入以下代码：
```
plugins: [
  new htmlWebpackPlugin({
    // 指定模板
    template: path.resolve(__dirname, '../public/index.html'),
    // 输出的文件
    filename: path.resolve(__dirname, '../dist/index.html')
  })
]
```

#### 3.4、配置字体、图片等文件的处理
开发过程肯定会遇到很多媒体文件，特别是图片，webapck有专门的loader来处理这些文件，先安装好依赖：
```
npm install url-loader file-loader -D
```
- url-loader和file-loader，这两个其实功能差不多，url-loader的好处就是当文件小于我们指定的大小时，它可以把媒体文件转换成base64编码，这样可以减少项目的图片请求，提高访问速度。

然后我们在webpack的配置文件中加入以下代码：
```
{
  test: /\.(jpe?g|png|gif)$/i,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 5120,
        // 当文件大于5KB时调用file-loader
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash:4].[ext]'
          }
        }
      }
    }
  ]
},
{
  test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 5120,
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'media/[name].[hash:4].[ext]'
          }
        }
      }
    }
  ]
},
{
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 5120,
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[hash:4].[ext]'
          }
        }
      }
    }
  ]
},
```
以上我们就配置好了媒体文件相关的处理。

#### 3.5、让webpack识别vue文件
安装依赖：
```
npm install vue-loader vue-template-compiler -D
```
然后安装vue核心
```
npm install vue -S
```
- vue-loader必须结合vue-template-compiler来使用，否则是不能完成转换的。

首先配置module里面的内容：
```
{
  test: /\.vue$/,
  use: [
    {
      loader: 'vue-loader',
      options: {
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    }
  ]
}
```
配置里面有个compilerOptions的参数preserveWhitespace为false，这个意思是当它的值为true时意味着编译好的渲染函数会保留所有 HTML 标签之间的空格。如果设置为 false，则标签之间的空格会被忽略。这能够略微提升一点性能但是可能会影响到内联元素的布局。具体参考此处：[链接](https://vue-loader.vuejs.org/zh/options.html#compileroptions)

配置好module后我们还要引入插件，这个是必须的
```
// 引入vue-loader插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// 添加到plugins中
new VueLoaderPlugin()
```
具体的大家可以参考此处：[链接](https://vue-loader.vuejs.org/zh/guide/)

然后我们还需要配置alias，这样可以减少路径过长引用的麻烦：
```
resolve: {
  alias: {
    // 写了这句，我们可以这样写代码 import Vue from 'vue', 并且引入的是vue/dist/vue.runtime.esm.js这个版本，不然默认引入的是vue.js。这个在github的vue官方仓库dist目录下有解释。
    'vue$': 'vue/dist/vue.runtime.esm.js',
    // 写了这句，我们可以这样写代码 import api from '@/api/api.js'，省去到处找路径定位到src的麻烦
    '@': path.resolve(__dirname, '../src')
  },
  // 添加一个 resolve.extensions 属性，方便我们引入依赖或者文件的时候可以省略后缀
  // 我们在引入文件时可以这样写 import api from '@/api/api'。
  extensions: ['*', '.js', '.vue']
},
```

#### 3.6、配置postcss
这个地方我配置了三个插件，autoprefixer、postcss-pxtorem、postcss-px-to-viewport，后两个你只需要配置其中一个即可，主要看你开发使用的rem还是vw，自行选择即可。
```
npm install postcss-loader autoprefixer postcss-pxtorem postcss-px-to-viewport -D
```
- postcss-loader 负责postcss相关的操作。
- autoprefixer 为浏览器添加不同的css3前缀。
- postcss-pxtorem px自动转换为rem。
- postcss-px-to-viewport px自动转换为vw|vh。

安装好依赖过后，在项目的根目录建立文件 `postcss.config.js`，然后在文件中输入以下内容：
```
module.exports = {
  plugins: {
    // 这个工具可以实现自动添加CSS3前缀
		"autoprefixer": {},
		// 如果你使用rem来实现移动端多设备适配，这个工具可以把px转换为rem
		/* "postcss-pxtorem": {
			rootValue: 37.5, // 指定转换倍率，我现在设置这个表示1rem=37.5px;
			propList: ['*'], // 属性列表，表示你要把哪些css属性的px转换成rem，这个*表示所有
			minPixelValue: 1, // 需要转换的最小值，一般1px像素不转换，以上才转换
			unitPrecision: 6, // 转换成rem单位的小数点后的保留位数
			selectorBalckList: ['van'], // 匹配不被转换为rem的选择器
			replace: true, // 替换包含rem的规则，而不是添加回退
			mediaQuery: false // 允许在媒体查询中转换px
		}, */
		// 如果你使用vw来实现移动端多设备适配，这个工具可以把px转换为vw
		"postcss-px-to-viewport": {
			unitToConvert: 'px', // 把什么单位转换成vw
			viewportWidth: 750, // 这个可以按照你的设计稿来设置，是750就设置750，375就设置成375
			unitPrecision: 6, // 转换成vw单位的小数点后的保留位数
			propList: ['*'], // 属性列表，表示你要把哪些css属性的px转换成vw，这个*表示所有
			viewportUnit: 'vw', // 使用的单位，目前可选单位有vw,vh。一般我们都有vw
			fontViewportUnit: 'vw', // 字体使用的单位
			selectorBlackList: [], // 匹配不被转换为vw的选择器
			minPixelValue: 1, // 需要转换的最小值，一般1px像素不转换，以上才转换
			mediaQuery: false, // 允许在媒体查询中转换px
			replace: true, // 替换包含vw的规则，而不是添加回退
			exclude: [], // 忽略一些文件，比如“node_modules”，可以是正则表达式
			landscape: false,  // ......
			landscapeUnit: 'vw', // ......
			landscapeWidth: 568 // ......
		}
  }
}
```
然后呢，webpack配置加上：
```
{
  test: /\.(scss|sass)$/,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
    },
    {
      loader: 'sass-loader',
      options: {
        implementation: require('dart-sass')
      }
    },
    {
      loader: 'postcss-loader'
    }
  ]
}
```

#### 3.7、配置热更新功能
安装依赖：
```
npm install webpack-dev-server -D
```
安装完成后，进行如下的配置：
```
// 引入webpack
const webpack = require('webpack');

// 配置devServer
devServer: {
  // 默认情况不设置这个只能通过localhost:9000来访问，现在可以通过本机局域网ip来访问，
  // 比如192.168.12.21:9000，手机在这个局网内也可以访问
  host: '0.0.0.0',
  hot: true,
  port: 9000,
  contentBase: './dist'
}

// 配置plugins
new webpack.NamedModulesPlugin(), // 辅助HotModuleReplacementPlugin插件
new webpack.HotModuleReplacementPlugin(), // 启用热更新必须的
```
### 4、定义环境变量
这个主要是定义这个玩意儿 `process.env.NODE_ENV` ，定义好这个我们一般可以来判断什么样的环境执行什么样的代码，我们知道webpack的打包环境和开发环境配置一般是不一样的，这里不展开，后面会讲。比如我们在入口main.js里面这样来写代码判断：
```
if(process.env.NODE_ENV === 'development'){ 
  //开发环境 do something
}else if(process.env.NODE_ENV === 'production') {
  //生产环境 do something
}
```
那么定义这个环境怎么操作呢，第一种是借助webpack的插件DefinePlugin，
- 使用DefinePlugin
我们在plugins里面加入以下代码：
```
new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('development')
  }
}),
```
那么我们最终打包过后访问到的process.env.NODE_ENV的值就是development。

另一种使用webpack4自己集成了的环境判断，我们只需要在配置文件里面生命mode即可，推荐使用这种

- 使用webpack4的mode参数
```
module.exports = {
  // 有none production development三个参数可选，不设置mode的话默认的process.env.NODE_ENV值为production
  mode: "development",
  entry: {}
  .....
}
```
有了上面的mode设置，我们照样能取到process.env.NODE_ENV的值。
关于process.env.NODE_ENV的知识点这里有几篇文章可以参考：
> [链接-1](https://juejin.im/post/5a4ed5306fb9a01cbc6e2ee2)
[链接-2](https://juejin.im/post/5868985461ff4b0057794959)
[链接-3](https://www.jianshu.com/p/83e8909fc1cd)

5、集成Vue全家桶
安装依赖
```
npm install vue vuex vue-router -S
```
安装完依赖过后，在src目录下新建一个App.vue的文件。写入以下代码：
```
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">

</style>
```
在src下再新建router、store两个目录，再目录下分别新建router.js和store.js。顺便再把其他文件夹也建好，如components、assets、views。现在我的目录结构如下图所示：

![4.png](https://i.loli.net/2019/12/11/QfgPOBXhT75CsUu.png)


main.js里面修改为如下代码：
```
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
```
建好这些文件过后其实后面的代码书写就跟脚手架搭建好的写法一样，这里就不在演示其它文件的代码怎么书写了，到时可以参考我的源代码。

这个时候，我们直接npm run dev的话会打包，所以我们需要修改一下package.json的scripts中的dev改成如下的代码：
```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "webpack-dev-server --config ./build/webpack.config.js"
},
```



