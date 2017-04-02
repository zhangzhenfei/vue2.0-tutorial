import Vue from 'vue'
import Router from 'vue-router'
import Todos from '@/components/Todos/Todos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:filter',
      name: 'Todos',
      component: Todos
    }
  ]
})
