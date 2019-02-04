<template lang="pug">
  div.historyManage.main-container
    div.sub-wrapper
      div.sub-header
        div.title 공지사항
        div.divide
      div.sub-content
        div.content
          DataTable(
            v-model="selected"
            :headers="headers",
            :items="sopNoticData",
          ).ui.table.celled.selectable
            <template slot="items" slot-scope="props">
              tr
                td.center.aligned {{props.item.no}}
                td {{props.item.title}}
                td.ellipse {{props.item.manage}}
                td {{props.item.date}}
                td {{props.item.hit}}
            </template>
        div.footer
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import { noticeTableHeader } from '@/setting'

export default {
  name: 'notice-manage',
  components: {
    DataTable
  },
  data () {
    return {
      selected: [],
      headers: noticeTableHeader.headers,
      sopNoticData: []
    }
  }
}
</script>
