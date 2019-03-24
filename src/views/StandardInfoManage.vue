<template lang="pug">
  div.standardInfoManage
    Tabs(:menu-list="tabMenuList")
</template>

<script>
import { standardInfoMenuList } from '@/setting'
import Tabs from '@/components/Tabs.vue'

export default {
  name: 'sop-manage',
  components: {
    Tabs
  },
  data () {
    return {
      tabMenuList: standardInfoMenuList
    }
  }
}
</script>
