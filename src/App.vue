<template>
  <div id="app">
    <vue-extend-layouts />
  </div>
</template>

<script>
import VueExtendLayouts from 'vue-extend-layout'
import Modal from '@/components/Modal.vue'

export default {
  name: 'App',
  components: {
    VueExtendLayouts
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
.full {
  width:100%;
  height:100%;
}
.ellips {
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
</style>
