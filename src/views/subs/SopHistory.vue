<template lang="pug">
  div.SopEdit.sub-container
    div.sub-wrapper
      div.sub-header
        div.title SOP실행이력
        SearchComp(
          :startDate="selectedDateStart", 
          :endDate="selectedDateEnd", 
          :rangeDate="selectedDate",  
          :isRange="searchType",
          :isDateSearch="true")
      div.sub-content
        div.content
          DataTable(
            v-model="selected"
            :headers="sopHistory.headers",
            :items="sopHistory.sopHistoryData",
            :isFooter="sopHistory.isfooter",
            :isListNumber="sopHistory.isListNumber",
            :isPagination="sopHistory.isPagination",
            :page="sopHistory.pageInfo"
          ).ui.table.celled.selectable
            <template slot="items" slot-scope="props">
              tr
                td(v-if="isListNumber").center.aligned {{props.idx}}
                td {{props.item.date}}
                td {{props.item.manager}}
                td.center.aligned {{props.item.type}}
                td {{props.item.title}}
                td.ellipse {{props.item.location}}
                td {{props.item.endtime}}
            </template>
        div.footer
          //- button.ui.button SEND

</template>

<script>
import DataTable from '@/components/DataTable.vue'
import SearchComp from '@/components/SearchComp.vue'
import { sopHistoryTableHeader } from '@/setting'
import HistoryApi from '@/api/History'

export default {
  name: 'sophistory',
  components: {
    DataTable,
    SearchComp
  },
  data () {
    return {
      selectedDateStart: new Date(2019, 0, 27),
      selectedDateEnd: new Date(),
      selectedDate: {
        start: new Date(2019, 0, 23),
        end: new Date(2019, 0, 30)  
      },
      searchType: 'range',
      selected: [],
      sopHistory: {
        isfooter: true,
        isPagination: false,
        isListNumber: true,
        pageInfo: {},
        headers: sopHistoryTableHeader.headers,
        sopHistoryData: []
      }
    }
  },
  created () {
  },
  methods: {
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
  }
}
</script>

<style lang="less" scoped>
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
