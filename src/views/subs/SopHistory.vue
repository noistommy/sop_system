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
<<<<<<< HEAD
          @search="getHistoryList")
      div.sub-content
        div.content
          DataTable(
            v-model="sopHistory.selected"
            :headers="sopHistory.headers",
            :items="sopHistory.sopHistoryData",
            :itemKey="sopHistory.itemkey"
=======
          :isDateSearch="true")
      div.sub-content
        div.content
          DataTable(
            v-model="selected"
            :headers="sopHistory.headers",
            :items="sopHistory.sopHistoryData",
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
            :isFooter="sopHistory.isfooter",
            :isListNumber="sopHistory.isListNumber",
            :isPagination="sopHistory.isPagination",
            :page="sopHistory.pageInfo"
          ).ui.table.celled.selectable
            <template slot="items" slot-scope="props">
              tr
                td(v-if="isListNumber").center.aligned {{props.idx}}
<<<<<<< HEAD
                td {{props.item.executBeginDt}}
                td {{props.item.oprtrNm}}
=======
                td {{props.item.date}}
                td {{props.item.manager}}
                td.center.aligned {{props.item.type}}
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
                td {{props.item.title}}
                td.ellipse {{props.item.buldNm}} {{props.item.buldFloor}}
                td {{props.item.executEndDt}}
            </template>
        div.footer
          //- button.ui.button SEND

</template>

<script>
import DataTable from '@/components/DataTable.vue'
import SearchDate from '@/components/SearchDate.vue'
import { sopHistoryTableHeader } from '@/setting'
<<<<<<< HEAD
import { convertDateFormat } from '@/util'
=======
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
import HistoryApi from '@/api/History'

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
<<<<<<< HEAD
      sopHistory: {
        selected: [],
        isfooter: true,
        isPagination: true,
        isListNumber: true,
        pageInfo: {},
        headers: sopHistoryTableHeader.headers,
        sopHistoryData: [],
        itemkey: 'rn'
=======
      searchType: 'range',
      selected: [],
      sopHistory: {
        isfooter: true,
        isPagination: false,
        isListNumber: true,
        pageInfo: {},
        headers: sopHistoryTableHeader.headers,
        sopHistoryData: []
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
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
<<<<<<< HEAD
    getHistoryList () {
      const requestData = JSON.stringify({
        executEndFromDt: this.searchData.start,
        executEndToDt: this.searchData.end,
      })
      HistoryApi.getSOPList(requestData)
      .then(result => {
          console.log(result)
          this.sopHistory.sopHistoryData = result.data.sopExecutEndHistList
          result.data.param.totalCount = result.data.totCnt
          this.sopHistory.pageInfo = result.data.param
        })
        .catch(err => {
          console.log(err)
        })
    }
=======
    // getHistoryList () {
    //   historyApi.getSOPHistory()
    //   .then(result => {
    //     console.log(`MemberList:${result}`)
    //       this.sopHistory.sopHistoryData = result.deptEmpInfoList
    //       this.sopHistory.pageInfo = result.param
    //       this.sopHistory.pageInfo.totalCount = result.totCnt
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
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
