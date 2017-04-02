<template>

  <section class="main">
    <input class="toggle-all" type="checkbox" >
    <ul class="todo-list">
    </ul>
  </section>

</template>

<script>
  export default {
    name: 'todos',
    watch: {
      '$route': function (to, from) {
        console.log(to)
      }
    }
  }
</script>
