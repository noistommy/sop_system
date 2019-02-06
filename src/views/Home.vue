<template lang="pug">
  div.home
    div MAIN PAGE
      router-link(:to="{ name: 'test-page'}" ).ui.button NOTICE
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
    }
  }
}

</script>
