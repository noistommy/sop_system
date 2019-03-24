<template lang="pug">
  div.SopEdit.sub-container
    div.sub-wrapper
      div.sub-header
        div.title SOP실행이력
        SearchDate(
          v-model="searchData",
          :startDate="selectedDateStart", 
          :endDate="selectedDateEnd",   
          :isRange="searchType",
          @search="getHistoryList")
      div.sub-content
        div.content
          DataTable(
            v-model="sopHistory.selected"
            :headers="sopHistory.headers",
            :items="sopHistory.sopHistoryData",
            :itemKey="sopHistory.itemkey"
            :isFooter="sopHistory.isfooter",
            :isListNumber="sopHistory.isListNumber",
            :isSelect="sopHistory.isSelect",
            :isPagination="sopHistory.isPagination",
            :page="sopHistory.pageInfo",
            @search="getHistoryList"
          ).ui.table.celled.selectable
            <template slot="items" slot-scope="props">
              tr
                td(v-if="sopHistory.isListNumber").center.aligned {{(sopHistory.pageInfo.currPage - 1) * 10 + props.idx + 1}}
                td.center.aligned {{props.item.executDt}}
                td.center.aligned {{props.item.msfrtnKndCdNm}}
                td.center.aligned {{props.item.crisisGnfdStepCdNm}}
                td.ellipse {{props.item.sopTitle}}
                td {{props.item.buldNm}} {{props.item.buldFloor}}
                td {{props.item.oprtrId}}
            </template>
        div.footer
          div.btnSet
            div.btn-group.left
            div.btn-wrap.right
              button.ui.button.large.blue(@click="sopDownload") 파일다운로드

</template>

<script>
import DataTable from '@/components/DataTable.vue'
import SearchDate from '@/components/SearchDate.vue'
import { sopHistoryTableHeader } from '@/setting'
import { convertDateFormat } from '@/util'
import HistoryApi from '@/api/History'
import { codeGenerator } from '@/util'

export default {
  name: 'sophistory',
  components: {
    DataTable,
    SearchDate
  },
  data () {
    return {
      selectedDateStart: new Date(),
      selectedDateEnd: new Date(),
      searchType: 'single',
      searchData: {
        start: '',
        end: ''
      },
      sopHistory: {
        selected: [],
        isfooter: true,
        isPagination: true,
        isListNumber: true,
        isSelect: false,
        pageInfo: {},
        headers: sopHistoryTableHeader.headers,
        sopHistoryData: [],
        itemkey: 'rn'
      }
    }
  },
  created () {
    this.initDate()
    console.log(this.searchData.start)
    this.getHistoryList(1)
  },
  methods: {
    getHistoryList (targetNum) {
      if(targetNum == undefined) {targetNum = 1}
      const requestData = JSON.stringify({
      executEndFromDt: this.searchData.start,
      executEndToDt: this.searchData.end,
      currPage: targetNum
    })
    HistoryApi.getSOPList(requestData)
    .then(result => {
        console.log(result)
        this.sopHistory.sopHistoryData = result.data.sopExecutEndHistList
        result.data.param.totalCount = result.data.totCnt
        this.sopHistory.pageInfo = result.data.param
      })
      .catch(error => {
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    sopDownload () {
      const requestData = JSON.stringify({
        executEndFromDt: this.searchData.start,
        executEndToDt: this.searchData.end,
      })
      HistoryApi.sopHistoryDownload(requestData)
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

<style lang="less">
.sub-container {
  .search-wrapper-content {
    display: flex;
    flex-direction: column;
    height: 80%;
    padding: 10px 20px;
    .titleBar {
      padding-top: 10px;
      position: relative;
      .title {
        float: left;
        font-size: 1.8em;
        font-weight: bold;
        position: relative;
        display: inline;
        line-height: 1em
      }
      .resultDate {
        font-size: 0.6em;
        position: absolute;
        width: 200px;
        left: 120%;
        bottom: -5px;
        .circleIcon {
          width:12px;
          height:12px;
          display: inline-block;
          border-radius: 20px;
          background-color: #fff;
          border:5px solid #454545;
          line-height: 1em;
          i {
            margin: 0;
            padding-top: 1px;
          }
        }
        .dataText {
          margin-left: 5px;
        }
      }
      .fileSave {
        position: absolute;
        right: 0;
      }
    }
    .discript {
      font-size: 1em;
      font-weight: bold;
      margin: 15px 0;
    }
    .content {
      border:1px solid rgba(34, 36, 38, 0.15);
      background-color: #fff;
      flex-grow: 0;
      height: 100%;
      padding: 25px 35px;
    }

  }
}
</style>
