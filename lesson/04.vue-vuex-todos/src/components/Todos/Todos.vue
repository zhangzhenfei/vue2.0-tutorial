<template>
  <section class="main">
    <input class="toggle-all" type="checkbox">
    <ul class="todo-list">
      <li v-for="todo in filteredTodos" class="todo" :key="todo.id" :class="{ completed: todo.completed, editing: todo == editedTodo }">
        <div class="view">
          <input class="toggle" type="checkbox" v-model="todo.completed">
          <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
          <button class="destroy" @click="removeTodo(todo)"></button>
        </div>
        <input class="edit" type="text" v-model="todo.title" v-todo-focus="todo == editedTodo" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)"
          @keyup.esc="cancelEdit(todo)">
      </li>
    </ul>
  </section>
</template>

<script>
  // import Store from '@/store/index'
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
        editedTodo: null // 记录当前编辑的todo
      }
    },
    computed: {
      filteredTodos: function () {
        return this.filterTodos()
      }
    },
    methods: {
      filterTodos () {
        let filteredTodos = []
        let filter = this.$store.state.route.params.filter
        if (filter && filters[filter]) {
          let filterFun = filters[filter]
          filteredTodos = filterFun(this.$store.state.todos)
        }
        return filteredTodos
      },

      editTodo: function (todo) {
        this.beforeEditCache = todo.title // 缓存编辑前title，在cancelEdit中会用到
        this.editedTodo = todo
      },

      removeTodo: function (todo) {
        this.$store.dispatch('removeTodo', todo)
      },

      doneEdit: function (todo) {
        if (!this.editedTodo) {
          return
        }
        this.editedTodo = null
        todo.title = todo.title.trim()
        if (!todo.title) {
          this.removeTodo(todo)
        }
      },

      cancelEdit: function (todo) {
        this.editedTodo = null
        todo.title = this.beforeEditCache
      }
    },

    directives: {
      'todo-focus': function (el, binding) {
        if (binding.value) {
          el.focus()
        }
      }
    }
  }

</script>
