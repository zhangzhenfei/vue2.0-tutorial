<template>
  <header class="header">
    <h1>todos</h1>
    <input 
      class="new-todo" 
      autofocus autocomplete="off" 
      placeholder="What needs to be done?" >
  </header>

</template>

<script>
  export default {
    name: 'header',
    data () {
      return {
        tip: 'What needs to be done?'
      }
    }
  }

</script>
