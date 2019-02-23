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
            :page="smsHistory.pageInfo",
             @search="getHistoryList"
          ).ui.table.celled.selectable
            <template slot="items" slot-scope="props">
              tr
                td(v-if="smsHistory.isListNumber").center.aligned {{(smsHistory.pageInfo.currPage - 1) * 10 + props.idx + 1}}
                td {{props.item.regDt}}
                td {{props.item.buldNm}}
                td.center.aligned {{props.item.cnt}}
                td {{props.item.smsContents}}
                td.ellipse {{props.item.result}}
            </template>
        div.footer
          div.btnSet
            div.btn-group.left
            div.btn-wrap.right
              button.ui.button.large.blue(@click="smsDownload") 파일다운로드
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
    this.getHistoryList(1)
  },
  methods: {
    getHistoryList (targetNum) {
        if(targetNum == undefined) {targetNum = 1}
        const requestData = JSON.stringify({
          regFromDt: this.searchData.start,
          regToDt: this.searchData.end,
          currPage: targetNum
        })
      HistoryApi.getSMSList(requestData).then(result => {
        console.log(result)
        this.smsHistory.smsHistoryData = result.data.sopExecutSmsHistList
        result.data.param.totalCount = result.data.totCnt
        this.smsHistory.pageInfo = result.data.param
      })
      .catch(err => {
        console.log(err)
      })
    },
    smsDownload () { 
      const requestData = JSON.stringify({
        regFromDt: this.searchData.start,
        regToDt: this.searchData.end
      })
      HistoryApi.getSMSExcel(requestData).then(result => {
        console.log(result)
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
