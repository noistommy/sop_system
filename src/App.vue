<template>
  <div id="app">
    <v-dialog/>
    <vue-extend-layouts />
  </div>
</template>

<script>
import VueExtendLayouts from 'vue-extend-layout'

export default {
  name: 'App',
  components: {
    VueExtendLayouts
  },
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>

<style lang="less">

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
// Dialog Style
.vue-dialog {
  .dialog-content {
    padding: 0 !important;
    .dialog-c-title {
      background-color: #5d5e68;
      color: #fff;
      padding: .8em 1.2em;
    }
    .dialog-c-text {
      padding:20px;
    }
    .dialog-c-buttons {

    }
  }
}

</style>
