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

```