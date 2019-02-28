<template lang="pug">
  div.SopRun
    h1 SOP RUN
</template>

<script>

export default {
  name: 'sop-run',
  data () {
    return {
    }
  },
  created () {
    console.log(this.$route.params)
  }
}
</script>

<style lang="less" scoped>

</style>
