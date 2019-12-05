# 基于webpack 4搭建的移动端开发环境
## 写在前面
在使用Vue开发单页面的时候，我们大多数时候都是使用的官方CLI工具，现在的Vue CLI已经迭代到了4.X了，可以说很成熟稳定了，能满足大多数要求，而且上手简单。本着折腾摸索的精神，还是打算自己搭建一个开发环境，熟悉各个流程。
> 本文不涉及Webpack和babel知识的讲解，建议了解一下Webpack的基本知识来看这篇文章会更好理解。这个在网上能找到很多教程。关于node.js和npm安装在这里也不再赘述，相信做前端开发这个是颠佬必装的。

我的node.js及npm版本如下：
```
node -v
v12.13.0

npm -v
v6.12.0
```
## 开始
### 1、初始化一个项目
首先你要新建一个文件夹，我这儿叫`customized-vue-proj-mobile`，然后在你的文件夹打开`git bash`输入以下命令来初始化项目：
```
npm init
```
执行完这个命令过后，会在目录生成一个`package.json`的文件，我的文件内容如下：
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

