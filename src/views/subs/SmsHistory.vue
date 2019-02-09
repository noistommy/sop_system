<template lang="pug">
  div.SmsHistory.sub-container
    div.sub-wrapper
      div.sub-header
        div.title SMS 전송이력
        SearchComp(:startDate="selectedDateStart", :endDate="selectedDateEnd", :isDateSearch="true")
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
                td(v-if="isListNumber").center.aligned {{props.idx}}
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
import { smsHistoryTableHeader } from '@/setting'

export default {
  name: 'smshistory',
  data () {
    return {
      selectedDateStart: new Date(2019, 0, 27),
      selectedDateEnd: new Date(),
      searchType: 'range',
      selected: [],
      isfooter: true,
      isPagination: false,
      isListNumber: true,
      pageInfo: {},
      headers: smsHistoryTableHeader.headers,
      sopHistoryData: [
      ]
    }
  },components: {
    DataTable,
    SearchComp
  }
}
</script>

<style lang="less" scoped>

</style>
