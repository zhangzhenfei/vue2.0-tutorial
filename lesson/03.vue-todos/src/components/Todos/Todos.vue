<template>
  <section class="main">
    <input class="toggle-all" type="checkbox" >
    <ul class="todo-list">
      <li v-for="todo in filteredTodos"
        class="todo"
        :key="todo.id"
        :class="{ completed: todo.completed }">
        <div class="view">
          <input class="toggle" type="checkbox" v-model="todo.completed">
          <label>{{ todo.title }}</label>
          <button class="destroy"></button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
  import Store from '@/store/index'
  // visibility filters
  const filters = {
    All: todos => todos,
    Active: todos => (todos.filter(todo => !todo.completed)),
    Completed: todos => (todos.filter(todo => todo.completed))
  }
  export default {
    name: 'todos',
    data () {
      return {
        filteredTodos: [] // 根据filter过滤后的todos
      }
    },
    created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.filterTodos()
      Store.todos.update(this.filterTodos.bind(this))
    },
    watch: {
       // 如果路由有变化，会再次执行该方法
      '$route': function (to) {
        Store.filter.save(to.params.filter)
        this.filterTodos()
      }
    },
    methods: {
      filterTodos () {
        let filter = this.$route.params.filter
        if (!filter) return
        const todos = Store.todos.fetch()
        const filterFun = filters[filter]
        if (!filterFun) return
        this.filteredTodos = filterFun(todos)
      }
    }
  }
</script>
