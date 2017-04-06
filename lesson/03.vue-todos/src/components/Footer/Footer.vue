<template>
  <footer class="footer">
    <span class="todo-count">
      <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
    </span>
    <ul class="filters">
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <li><router-link to="/All" active-class="selected" exact replace>All</router-link></li>
      <li><router-link to="/Active" active-class="selected" exact replace>Active</router-link></li>
      <li><router-link to="/Completed" active-class="selected" exact replace>Completed</router-link></li>
    </ul>
    <button class="clear-completed">
        Clear completed
    </button>
  </footer>
</template>

<script>
  export default {
    name: 'footer',
    // 声明 props
    props: ['remaining'],
    filters: {
      pluralize: function (n) {
        return n === 1 ? 'item' : 'items'
      }
    }
  }
</script>
