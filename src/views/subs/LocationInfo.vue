<template lang="pug">
  div.LocationInfo.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 건물/층 관리
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
              :headers="locationInfo.headers",
              :items="locationInfo.sopHistoryData",
              :isFooter="locationInfo.isfooter",
              :isListNumber="locationInfo.isListNumber",
              :isPagination="locationInfo.isPagination",
              :page="locationInfo.pageInfo"
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
              :headers="locationFloor.headers",
              :items="locationFloor.locationFloorData",
              :isFooter="locationFloor.isfooter",
              :isListNumber="locationFloor.isListNumber",
              :isPagination="locationFloor.isPagination",
              :page="locationFloor.pageInfo"
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
import { locationInfoHeader, locationFloorHeader } from '@/setting'

export default {
  name: 'location-info',
  data () {
    return {
      locationInfo: {
        headers: locationInfoHeader.headers,
        locationInfoData: [],
        isFooter: false,
        idPagination: false,
        isListNumber: false,
        pageInfo: {} 
      },
      locationFloor: {
        headers: locationFloorHeader.headers,
        locationFloorData: [],
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
