const STORAGE_FILTER_KEY = 'VUE_FILTER'
const STORAGE_TODOS_KEY = 'VUE_TODOS'
const MODEL = {
  FILTER: localStorage.getItem(STORAGE_FILTER_KEY) || 'All',
  TODOS: JSON.parse(localStorage.getItem(STORAGE_TODOS_KEY)) || []
}

export default {
  filter: {
    get: () => MODEL.FILTER,
    save: path => localStorage.setItem(STORAGE_FILTER_KEY, path)
  },
  todos: {
    fetch: () => MODEL.TODOS,
    save: () => {
      localStorage.setItem(STORAGE_TODOS_KEY, JSON.stringify(MODEL.TODOS))
    }
  }
}
