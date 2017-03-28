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
        console.log(value)
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

