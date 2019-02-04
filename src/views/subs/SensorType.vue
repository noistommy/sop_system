<template lang="pug">
  div.SensorType.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 장비유형 관리
        SearchComp(
          :startDate="selectedDateStart", 
          :endDate="selectedDateEnd", 
          :rangeDate="selectedDate",  
          :isRange="searchType",
          :isDateSearch="false",
          :isTextSearch="true")
          template( slot="condition1", slot-scope="props")
            select.ui.dropdown
              option 1
              option 2
              option 3
      div.sub-content.column
        div.content.section.section-1
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
        div.content.section.section-2
      div.sub-footer
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import SearchComp from '@/components/SearchComp.vue'

export default {
  name: 'sensor-type',
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
