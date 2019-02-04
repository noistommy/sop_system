<template lang="pug">
  div.SystemUser.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 운영자 관리
      div.sub-content
        div.content
          DataTable(
            v-model="selected"
            :headers="headers",
            :items="sopHistoryData",
            :isFooter="isfooter",
            :isListNumber="isListNumber",
            :isPagination="isPagination",
            :page="pageInfo"
          ).ui.table.celled.selectable
            <template slot="items" slot-scope="props">
              tr
                td.center.aligned {{props.item.no}}
                td {{props.item.date}}
                td {{props.item.manager}}
                td.center.aligned {{props.item.type}}
                td {{props.item.title}}
                td.ellipse {{props.item.location}}
                td {{props.item.endtime}}
            </template>
        div.footer
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import SearchComp from '@/components/SearchComp.vue'

export default {
  name: 'system-user',
  data () {
    return {
    }
  },
  components: {
    DataTable,
    SearchComp
  }
}
</script>

<style lang="less" scoped>

</style>
