<template lang="pug">
  div.SensorHistory.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 센서탐지이력
        SearchDate(
          v-model="searchData", 
          :startDate="selectedDateStart", 
          :endDate="selectedDateEnd", 
          :isDateSearch="true",
          @search="getHistoryList")
        div.divide
      div.sub-content
        div.chart-wrapper()
          BarChart(v-if="isLoaded", :chart-data="chartData")
        div.content
          DataTable(
            v-model="sensorHistory.selected"
            :headers="sensorHistory.headers",
            :items="sensorHistory.sopHistoryData",
            :isFooter="sensorHistory.isfooter",
            :isListNumber="sensorHistory.isListNumber",
            :isPagination="sensorHistory.isPagination",
            :page="sensorHistory.pageInfo"
          ).ui.table.celled.selectable
            <template slot="items" slot-scope="props">
              tr
                td.center.aligned {{(sopHistory.pageInfo.currPage - 1) * 10 + props.idx + 1}}
                td {{props.item.prcpDt}}
                td {{props.item.manager}}
                td.center.aligned {{props.item.type}}
                td {{props.item.title}}
                td.ellipse {{props.item.location}}
                td {{props.item.endtime}}
            </template>
        div.footer
          div.btnSet
            div.btn-group.left
            div.btn-wrap.right
              button.ui.button.large.blue(@click="sensorDownload") 파일다운로드
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import SearchDate from '@/components/SearchDate.vue'
import { sensorHistoryTableHeader } from '@/setting'
import BarChart from '@/components/BarChart'
import { convertDateFormat } from '@/util'
import HistoryApi from '@/api/History'
import { codeGenerator } from '@/util'

export default {
  name: 'sensorhistory',
  components: {
    DataTable,
    SearchDate,
    BarChart
  },
  data () {
    return {
      searchData: {},
      selectedDateStart: new Date(),
      selectedDateEnd: new Date(),
      searchType: 'single',
      sensorHistory: {
        selected: [],
        isfooter: true,
        isPagination: false,
        isListNumber: true,
        pageInfo: {},
        headers: sensorHistoryTableHeader.headers,
        sopHistoryData: [],
      },
      chartData: {
        labels: [],
        datasets: [{
          label: '',
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: null,
          backgroundColor: null,
          hoverBackgroundColor: null,
          fill: false,
          lineTension: 0
        }]
      },
      isLoaded: false
    }
  },
  created () {
    this.initDate()
    this.getHistoryList(1)
  },
  mounted() {
  },
  methods: {
    getHistoryList (targetNum) {
      if(targetNum == undefined) {targetNum = 1}
      const requestData = JSON.stringify({
        prcpFromDt: this.searchData.start,
        prcpToDt: this.searchData.end,
        currPage: targetNum
      })
      HistoryApi.getSensorList(requestData)
      .then(result => {
        console.log(result)
        this.sensorHistory.sensorHistoryData = result.data.sensorDetctHistList
        result.data.param.totalCount = result.data.totCnt
        this.sensorHistory.pageInfo = result.data.param
        this.chartData.data.labels = result.data.alarmHistStats.labels
        this.chartData.data.datasets.data = result.data.alarmHistStats.data
        this.isLoaded = true
        
      })
      .catch(error => {
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    sensorDownload () {
      const requestData = JSON.stringify({
        prcpFromDt: this.searchData.start,
        prcpToDt: this.searchData.end,
      })
      HistoryApi.getSensorExcel(requestData)
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    initDate() {
      const today = new Date()
      const d = today.getDate()
      today.setDate(d-7)
      this.searchData.start = convertDateFormat(today, '')
      this.searchData.end = convertDateFormat(new Date(), '')
    }
  }

}
</script>

<style lang="less" scoped>
  .chart-wrapper {
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    // max-height: 25vh;
    width: 100%;
    height: 32%;
    margin-bottom: 20px;
    > div {
      height: 100%;
    }
  }
</style>
