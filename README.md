# vue2.0-tutorial
一个vue2.0的教程，带你一步一步学习vue2.0相关技术栈，在这里，你可以学到vue2.0组件式开发、使用vue-router开发SPA应用、使用vuex管理应用状态等。

## lesson01.vue-cli
vue-cli是vue官方提供的脚手架，可以快速根据配置生成项目，第一讲是vue2.0的入门，就从官方的`vue-cli`开始把，可以避免新手专注于学习vue相关语法，避免在环境配置方面浪费太多时间。

`vue-cli` github地址：[vue-cli](https://github.com/vuejs/vue-cli)

接下来就根据github的文档来安装vue-cli：
首先把vue-cli安装为全局包
````
$ npm install -g vue-cli
````
安装完毕后，进入你要生成项目的路径，使用vue-cli命令生成项目，vue-cli的生成项目的语法为：
````
$ vue init <template-name> <project-name>
````

template-name可选项如下
1. webpack - A full-featured Webpack + vue-loader setup with hot reload, linting, testing & css extraction.
2. webpack-simple - A simple Webpack + vue-loader setup for quick prototyping.
3. browserify - A full-featured Browserify + vueify setup with hot-reload, linting & unit testing.
4. browserify-simple - A simple Browserify + vueify setup for quick prototyping.
5. simple - The simplest possible Vue setup in a single HTML file

project-name为你生成项目的名称
举个栗子：
````
$ vue init webpack 01.vue-cli
````

回车后，项目生成的时候会提示你输入项目名称，是否需要安装vue-router等配置项，这里我们就按照默认项来，一路回车到底，项目就生成了，我们进入到项目01.vue-cli的目录
````
$ cd 01.vue-cli/
````

安装相关的依赖项，并运行项目
````
$ npm install
$ npm run dev
````

正常来说命令执行成功后，浏览器会自动打开[http://localhost:8080/#/](http://localhost:8080/#/)，显示模板项目的主页

