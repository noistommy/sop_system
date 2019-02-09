<template lang="pug">
  div.PublicCode.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 공통코드 관리
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
              :headers="publicCode.headers",
              :items="publicCode.publicCodeData",
              :isFooter="publicCode.isfooter",
              :isListNumber="publicCode.isListNumber",
              :isPagination="publicCode.isPagination",
              :page="publicCode.pageInfo"
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
              :headers="publicCodeDetail.headers",
              :items="publicCodeDetail.publicCodeDetailData",
              :isFooter="publicCodeDetail.isfooter",
              :isListNumber="publicCodeDetail.isListNumber",
              :isPagination="publicCodeDetail.isPagination",
              :page="publicCodeDetail.pageInfo"
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
import { publicCodeHeader, publicCodeDetailHeader } from '@/setting'

export default {
  name: 'public-code',
  data () {
    return {
      publicCode: {
        headers: publicCodeHeader.headers,
        publicCodeData: [],
        isFooter: false,
        idPagination: false,
        isListNumber: false,
        pageInfo: {} 
      },
      publicCodeDetail: {
        headers: publicCodeDetailHeader.headers,
        publicCodeDetailData: [],
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
