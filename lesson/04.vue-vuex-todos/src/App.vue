<template>
  <div id="app" class="todoapp">
    <MyHeader />
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
    <MyFooter />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import MyHeader from './components/Header/Header'
  import MyFooter from './components/Footer/Footer'
  import Store from './store/index'
  
  export default {
    name: 'app',
    computed: mapState({
      todos: state => state.todos
    }),
    created () {
      let filter = this.$route.params.filter
      if (!filter) {
        this.$router.replace({ path: Store.filter.get() })
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
