<template lang="pug">
  div.SensorType.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 장비유형 관리
        SearchComp(
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
              :headers="sensorType.headers",
              :items="sensorType.sensorTypeData",
              :isFooter="sensorType.isfooter",
              :isListNumber="sensorType.isListNumber",
              :isPagination="sensorType.isPagination",
              :page="sensorType.pageInfo"
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
          DataTable(
              v-model="selected"
              :headers="sensorByType.headers",
              :items="sensorByType.sensorByTypeData",
              :isFooter="sensorByType.isfooter",
              :isListNumber="sensorByType.isListNumber",
              :isPagination="sensorByType.isPagination",
              :page="sensorByType.pageInfo"
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
      div.sub-footer
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import SearchComp from '@/components/SearchComp.vue'
import { sensorTypeHeader, sensorByTypeHeader } from '@/setting'

export default {
  name: 'sensor-type',
  data () {
    return {
      sensorType: {
        headers: sensorTypeHeader.headers,
        sensorTypeData: [],
        isFooter: false,
        idPagination: false,
        isListNumber: false,
        pageInfo: {} 
      },
      sensorByType: {
        headers: sensorByTypeHeader.headers,
        sensorByTypeData: [],
        isFooter: false,
        idPagination: false,
        isListNumber: false,
        pageInfo: {} 
      },
      selected: []
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
