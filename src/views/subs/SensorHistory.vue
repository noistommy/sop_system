<template lang="pug">
  div.SensorHistory.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 센서탐지이력
        SearchComp(
          v-model="searchData", 
          :startDate="selectedDateStart", 
          :endDate="selectedDateEnd", 
          :isDateSearch="true")
        div.divide
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
import { sensorHistoryTableHeader } from '@/setting'

export default {
  name: 'sensorhistory',
  components: {
    DataTable,
    SearchComp
  },
  data () {
    return {
      selected: [],
      searchData: {},
      selectedDateStart: new Date(2019, 0, 27),
      selectedDateEnd: new Date(),
      searchType: 'range',
      isfooter: true,
      isPagination: false,
      isListNumber: true,
      pageInfo: {},
      headers: sensorHistoryTableHeader.headers,
      sopHistoryData: [
      ]
    }
  }
}
</script>

<style lang="less" scoped>

</style>
