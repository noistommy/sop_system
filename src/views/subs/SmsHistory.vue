<template lang="pug">
  div.SmsHistory.sub-container
    div.sub-wrapper
      div.sub-header
        div.title SMS 전송이력
        SearchDate(
          v-model="searchData",
          :startDate="selectedDateStart", 
          :endDate="selectedDateEnd"
          :isRange="searchType",
          @search="getHistoryList")
      div.sub-content
        div.content
          DataTable(
            v-model="smsHistory.selected"
            :headers="smsHistory.headers",
            :items="smsHistory.smsHistoryData",
            :itemKey="smsHistory.itemkey",
            :isFooter="smsHistory.isfooter",
            :isListNumber="smsHistory.isListNumber",
            :isPagination="smsHistory.isPagination",
            :page="smsHistory.pageInfo"
          ).ui.table.celled.selectable
            <template slot="items" slot-scope="props">
              tr
                td(v-if="isListNumber").center.aligned {{props.idx}}
<<<<<<< HEAD
                td {{props.item.regDt}}
                td {{props.item.buldNm}}
                td.center.aligned {{props.item.cnt}}
                td {{props.item.smsContents}}
                td.ellipse {{props.item.result}}
=======
                td {{props.item.date}}
                td {{props.item.manager}}
                td.center.aligned {{props.item.type}}
                td {{props.item.title}}
                td.ellipse {{props.item.location}}
                td {{props.item.endtime}}
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
            </template>
        div.footer
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import SearchDate from '@/components/SearchDate.vue'
import { smsHistoryTableHeader } from '@/setting'
import { convertDateFormat } from '@/util'
import HistoryApi from '@/api/History'

export default {
  name: 'smshistory',
  components: {
    DataTable,
    SearchDate,
  },
  data () {
    return {
      selectedDateStart: new Date(2019, 0, 27),
      selectedDateEnd: new Date(),
      searchType: 'single',
            searchData: {
              start: '',
              end: ''
            },
      smsHistory: {
        selected: [],
        isfooter: true,
        isPagination: true,
        isListNumber: true,
        pageInfo: {},
        headers: smsHistoryTableHeader.headers,
        smsHistoryData: [],
        itemkey: 'rn'
      }
    }
  },
  created () {
    // const initDate
    this.searchData.start = convertDateFormat(new Date(), '')
    this.searchData.end = convertDateFormat(new Date(), '')
    this.getHistoryList()
  },
  methods: {
    getHistoryList () {
      const requestData = JSON.stringify({
        regFromDt: this.searchData.start,
        regToDt: this.searchData.end,
      })
      HistoryApi.getSMSList(requestData)
      .then(result => {
          console.log(result)
          this.smsHistory.smsHistoryData = result.data.sopExecutSmsHistList
          result.data.param.totalCount = result.data.totCnt
          this.smsHistory.pageInfo = result.data.param
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
