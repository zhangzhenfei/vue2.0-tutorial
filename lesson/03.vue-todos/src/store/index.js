const STORAGE_FILTER_KEY = 'VUE_FILTER'
const STORAGE_TODOS_KEY = 'VUE_TODOS'
const listeningUpdateHandle = [] // 观察需要更新的方法

export default {
  filter: {
    get: () => localStorage.getItem(STORAGE_FILTER_KEY),
    save: path => localStorage.setItem(STORAGE_FILTER_KEY, path)
  },
  todos: {
    fetch: () => JSON.parse(localStorage.getItem(STORAGE_TODOS_KEY)),
    save: todos => {
      localStorage.setItem(STORAGE_TODOS_KEY, JSON.stringify(todos))
      listeningUpdateHandle.forEach(fun => fun())
    },
    update: callback => listeningUpdateHandle.push(callback)
  }
}
