<template>
  <section class="main">
    <input class="toggle-all" type="checkbox" >
    <ul class="todo-list">
      <li v-for="todo in filteredTodos"
        class="todo"
        :key="todo.id"
        :class="{ completed: todo.completed, editing: todo == editedTodo }">
        <div class="view">
          <input class="toggle" type="checkbox" v-model="todo.completed">
          <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
          <button class="destroy" @click="removeTodo(todo)"></button>
        </div>
        <input class="edit" type="text"
          v-model="todo.title"
          v-todo-focus="todo == editedTodo"
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          @keyup.esc="cancelEdit(todo)">
      </li>
    </ul>
  </section>
</template>

<script>
  import Store from '@/store/index'

  export default {
    name: 'todos',
    data () {
      return {
        filteredTodos: [], // 根据filter过滤后的todos
        editedTodo: null // 记录当前编辑的todo
      }
    },
    created () {
      this.filterTodos()
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
        this.filteredTodos = this.$store.getters[filter]
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
