import Vue from 'vue'
import Vuex from 'vuex'
import uuid from 'uuid'

Vue.use(Vuex)

export default new Vuex.Store({
  // 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。
  // 这能保证所有的状态变更都能被调试工具跟踪到。
  strict: process.env.NODE_ENV !== 'production',
  state: {
    todos: [] // 存储所有todos
  },
  mutations: {
    ADD_TODO (state, todoContent) {
      state.todos.push({
        id: uuid(),
        title: todoContent,
        completed: false
      })
    },
    REMOVE_TODO (state, todo) {
      var todos = state.todos
      todos.splice(todos.indexOf(todo), 1)
    },
    CLEAR_COMPLETE_TODOS (state) {
      const completedTodos = state.todos.filter(todo => todo.completed)
      completedTodos.forEach(todo => state.todos.splice(state.todos.indexOf(todo), 1))
    }
  },
  actions: {
    addTodo ({ commit }, todoContent) {
      commit('ADD_TODO', todoContent)
    },
    removeTodo ({ commit }, todo) {
      commit('REMOVE_TODO', todo)
    },
    clearCompleted ({ commit }) {
      commit('CLEAR_COMPLETE_TODOS')
    }

  },
  getters: {
    total: state => state.todos.length,
    remaining: state => state.todos ? state.todos.filter(todo => !todo.completed).length : 0
  }

})
