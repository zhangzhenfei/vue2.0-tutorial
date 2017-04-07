import Vue from 'vue'
import Vuex from 'vuex'
import uuid from 'uuid'

Vue.use(Vuex)

export default new Vuex.Store({
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
    All: state => state.todos,
    Active: state => state.todos.filter(todo => !todo.completed),
    Completed: state => state.todos.filter(todo => todo.completed),
    total: state => state.todos.length,
    remaining: state => state.todos ? state.todos.filter(todo => !todo.completed).length : 0
  }

})
