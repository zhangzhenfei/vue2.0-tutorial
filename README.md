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

让我们来在模板项目上加一点官网案例，熟悉一下vue语法以及应用，项目源码放在了src目录下，这里我们可以发现项目结构如下：
````
|src // 源码路径
|--assets // 静态资源
|--components // vue组件目录
|----Hello.vue 
|--router // 路由目录
|----index.js
|--App.vue // vue root components
|--main.js // 项目入口
````
分析一下App.vue文件
````html
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>
````
可以发现Hello.vue作为App.vue的子组件，所以我们这里直接在hello.vue上写测试代码，这里我们实现一个小小的需求，界面上有两个元素，一个文本域，一个输入框，文本域的内容根据输入框的输入信息自动更新。

打开Hello.vue，尝试在`<templete></templete>`中的`<div class="hello">...</div>`节点后增加一个`<div id="demo"></div>`
界面立即响应变化，报错了，报错信息如下：
>Component template should contain exactly one root element. If you are using v-if on multiple elements, use v-else-if to chain them instead.

组件的templete不允许包含超过一个根元素，这个和react的jsx控制规则是一样的，所以我们把`<div id="demo"></div>`移动到`<div class="hello">...</div>`中，作为其子元素
````html
<div id="hello">
...
    <div id="demo">
      <p>{{ message }}</p>
      <input type="text" v-model="message"/>
    </div>
</div>
````
在script中，我们加了一个message，使其数据可响应
````javascript
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      message: ''
    }
  }
}
````

so，我们就完成了这个简单的需求，是不是非常easy，vue帮我们处理了数据与DOM之间的更新与变化，界面上所有的东西都可以看做是数据的映射，只要操作数据，界面会根据组件的配置自动更新，使我们能把精力放在行为和业务上，大大提高了编码生产力，同时，vue会很聪明的处理更新的队列，把同一个事物里的变化只做一次提交，而且只修改DOM变化的部分。

好了，您也来试试把。

````
$ cd lesson/01.vue-cli
$ npm install
$ npm run dev
````
![01.vue-cli](./static/images/01.png)

## lesson02.vue-router
这一节中，我们将学习vue，vue-router的集成和应用，做一个简单的SPA。
首先说一下路由的概念，为什么要有前端路由呢，使用前端路由是为了把多页应用改造成单页应用，单页应用利用浏览器的地址模拟了多页应用不同地址渲染不同功能的需求，同时避免了路由跳转的时候重新请求服务端获取数据重新渲染页面。

这节课的需求是：在界面上定义两个链接，点击其中一个链接渲染对应的vue子组件页面
对于vue-router不熟的同学可以先看看概念：[vue-router](https://router.vuejs.org/zh-cn/)

现在我们来分析一下，我们需要定义链接的组件应该是根组件App.vue，偷懒一下，直接把官网的demo拷进去
````html
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <p>
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <router-link to="/foo">Go to Foo</router-link>
      <router-link to="/bar">Go to Bar</router-link>
    </p>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>
````

界面定义好了，那么我们需要写两个组件：Foo&Bar，组件放在components下
````javascript
// Bar.vue
<template>
  <div>{{msg}}</div>
</template>

<script>
export default {
  name: 'bar',
  data () {
    return {
      msg: 'bar page'
    }
  }
}
</script>
````

````javascript
// Foo.vue
<template>
  <div>{{msg}}</div>
</template>

<script>
export default {
  name: 'foo',
  data () {
    return {
      msg: 'foo page'
    }
  }
}
</script>
````

组件也定义好了，怎么把组件和路由关联起来呢，打开router/index.js，把组件注册到路由中
````javascript
import Vue from 'vue'
import Router from 'vue-router'
import Foo from '../components/Foo'
import Bar from '../components/Bar'
import Hello from '../components/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
})

````

打开项目，效果是不是出来啦
````
$ cd lesson/02.vue-router
$ npm install
$ npm run dev
````
![02.vue-router](./static/images/02.png)

## lesson03.vue-todos
这一节，将会一步一步从零开始，完成一个todos应用，这个也是官网的例子，当应用从简单变复杂，我们要怎么去实现呢，这里我们只使用vue和vue-router来实现todos的增删改查，使用vue-router实现todos的过滤功能。

初始化应用并启动

````
$ cd lesson
$ vue init webpack 03.vue-todos
$ cd vue-todos
$ npm install
$ npm run dev
````

浏览器自动打开并显示主页说明初始化成功

首先分析一下todos这个功能，从功能上可以划分为三个部分
1. 头部（Header）
2. 内容展示部分（Todos）
   2.1 列表项（todo-item）
3. 脚部过滤条件部分（Footer）

![components.png](./static/images/04.png)

![framework.png](./static/images/05.png)

那么我们就先把组件定义出来
components/Header/Header.vue
````html
<template>
  <header class="header">
    <h1>todos</h1>
    <input 
      class="new-todo" 
      autofocus autocomplete="off" 
      placeholder="What needs to be done?" >
  </header>

</template>

<script>
  export default {
    name: 'header',
    data () {
      return {
        tip: 'What needs to be done?'
      }
    }
  }
</script>
````

components/Todos/Todos.vue
````html
<template>

  <section class="main">
    <input class="toggle-all" type="checkbox">
    <ul class="todo-list">
    </ul>
  </section>

</template>

<script>
  export default {
    name: 'todos'
  }

</script>
````

components/Footer/Footer.vue
````html
<template>
  <footer class="footer">
    <span class="todo-count">
        2 items left
      </span>
    <ul class="filters">
      <li><a href="#/all">All</a></li>
      <li><a href="#/active">Active</a></li>
      <li><a href="#/completed">Completed</a></li>
    </ul>
    <button class="clear-completed">
        Clear completed
    </button>
  </footer>
</template>

<script>
  export default {
    name: 'footer',
    data () {
      return {
        remain: '2 items left'
      }
    }
  }
</script>
````

组件定义好之后，我们需要在App.vue顶级组件中组合起来
components/Todos/Todos.vue
````html
<template>

  <section class="main">
    <input class="toggle-all" type="checkbox">
    <ul class="todo-list">
    </ul>
  </section>

</template>

<script>
  export default {
    name: 'todos'
  }

</script>
````

App.vue
````html
<template>
  <div id="app" class="todoapp">
    <Header />
    <Todos />
    <Footer />
  </div>
</template>

<script>
  import Header from './components/Header/Header'
  import Footer from './components/Footer/Footer'
  import Todos from './components/Todos/Todos'
  export default {
    name: 'app',
    components: {
      Header, Footer, Todos
    }
  }

</script>

````

好了，我们运行一下项目看看效果
````
$ npm run dev
````

![demo](./static/images/06.png)

基本框架是出来了，但是缺少样式，非常难看，我们把官方的todos的样式安装一下
````
npm install --save todomvc-app-css
````
如果需要import css，并打包成js，需要安装下面三个loader
````
cnpm install style-loader --save-dev
cnpm install css-loader --save-dev
cnpm install file-loader --save-dev
````



然后在App.vue中加上
````html
<style>
  @import '../node_modules/todomvc-app-css/index.css'
</style>
````

重新运行项目，发现官方的样式全都加上去啦，现在我们又学会了一种引入第三方css的方法
![import](./static/images/07.png)

现在我们打开浏览器控制台，发现了几个报错
````
Do not use built-in or reserved HTML elements as component id:
````

组件名字不要使用内置的或保留HTML元素为组件id,让我们修改App.vue的script部分如下
````javascript
<script>
  import MyHeader from './components/Header/Header'
  import MyFooter from './components/Footer/Footer'
  import Todos from './components/Todos/Todos'
  export default {
    name: 'app',
    components: {
      MyHeader, MyFooter, Todos
    }
  }

</script>
````

现在我们开始思考Todos应用的状态数据，大概如下：
````javascript
{
    todos: [], // 存储所有todos
    visibility: 'all' // 存储当前过滤条件
}
````

那么，我们就在App.vue中先把这些数据定义在data中

> 注意，vue2.0中，组件的data定义只接受 `function`

````javascript
export default {
    name: 'app',
    data () {
      return {
        todos: [], // 存储所有todos
        visibility: 'all' // 存储当前过滤条件
      }
    },
    components: {
      MyHeader, MyFooter, Todos
    }
  }
````

那么我们要怎么监听MyHeader的输入框，并且获取数据放入todos中呢，根据vue组件间的通信规则：

> 在 Vue.js 中，父子组件的关系可以总结为 **props down, events up** 。父组件通过 **props** 向下传递数据给子组件，子组件通过 **events** 给父组件发送消息。

首先改造Header组件，使其能够监听input的键盘回车时间，并且主动触发对应的自定义事件发送消息给父组件

````html
<template>
  <header class="header">
    <h1>todos</h1>
    <input 
      class="new-todo" 
      autofocus 
      autocomplete="off" 
      placeholder="What needs to be done?" 
      v-model="newTodo"
      @keyup.enter="addTodo">
  </header>
</template>

<script>
  export default {
    name: 'header',
    data () {
      return {
        newTodo: '' // 使用v-model将input的vulue属性绑定到newTodo
      }
    },
    methods: {
      addTodo () {
        // 主动触发addTodoHandle方法，'addTodoHandle'为向父组件传递的数据
        this.$emit('addTodoHandle', this.newTodo) 
      }
    }
  }
</script>

````



我们需要把MyHeader组件绑定一个addTodoHandle事件，给App发送消息，App.vue

````html
<template>
  <div id="app" class="todoapp">
    <MyHeader @addTodoHandle="addTodo"/>
    <Todos />
    <MyFooter />
  </div>
</template>

<script>
  import MyHeader from './components/Header/Header'
  import MyFooter from './components/Footer/Footer'
  import Todos from './components/Todos/Todos'
  export default {
    name: 'app',
    data () {
      return {
        todos: [], // 存储所有todos
        visibility: 'all' // 存储当前过滤条件
      }
    },
    methods: {
      addTodo (value) {
        console.log(value) // 输出看看子组件发送的消息内容
      }
    },
    components: {
      MyHeader, MyFooter, Todos
    }
  }

</script>

<style>
  @import '../node_modules/todomvc-app-css/index.css'
</style>


````

我们在template中加了`@addTodoHandle="addTodo"`监听了组件的addTodoHandle方法，绑定到App的methods中的addTodo方法，所以子组件使用`this.$emit('addTodoHandle')`会触发父组件的`addTodo`回调方法，addTodo方法中，我们将子组件emit的数据打印出来，现在运行程序，在input中输入一些内容，按回车可以看到控制台打印的数据。

![addTodo](./static/images/08.png)


测试
