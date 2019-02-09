<template lang="pug">
  div.StandardSms.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 표준 문자 관리
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
              :headers="standardSms.headers",
              :items="standardSms.standardSmsData",
              :isFooter="standardSms.isfooter",
              :isListNumber="standardSms.isListNumber",
              :isPagination="standardSms.isPagination",
              :page="standardSms.pageInfo"
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
import { standardSmsHeader } from '@/setting'


export default {
  name: 'standard-sms',
  data () {
    return {
      standardSms: {
        headers: standardSmsHeader.headers,
        standardSmsData: [],
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
