<template>
  <div id="app" class="todoapp">
    <MyHeader @addTodoHandle="addTodo" />
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
    <MyFooter @removeCompletedHandle="removeCompleted" :todos="todos"/>
  </div>
</template>

<script>
  import uuid from 'uuid'
  import MyHeader from './components/Header/Header'
  import MyFooter from './components/Footer/Footer'
  import Store from './store/index'
  export default {
    name: 'app',
    data () {
      return {
        todos: Store.todos.fetch() // 存储所有todos
      }
    },
    created () {
      let filter = this.$route.params.filter
      if (!filter) {
        this.$router.replace({ path: Store.filter.get() })
      }
    },
    methods: {
      addTodo (value) {
        value = value && value.trim()
        if (!value) {
          return
        }
        this.todos.push({
          id: uuid(),
          title: value,
          completed: false
        })
      },
      removeCompleted: function () {
        const completedTodos = this.todos.filter(todo => todo.completed)
        completedTodos.forEach(todo => this.todos.splice(this.todos.indexOf(todo), 1))
      }
    },
    // watch todos change for localStorage persistence
    watch: {
      todos: {
        handler: function (todos) {
          Store.todos.save()
        },
        deep: true
      }
    },
    components: {
      MyHeader, MyFooter
    }
  }

</script>

<style>
  @import '../node_modules/todomvc-app-css/index.css'
</style>
