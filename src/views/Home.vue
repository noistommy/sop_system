<template lang="pug">
  div.home
    div.ui.grid
<<<<<<< HEAD
      div.ten.wide.column
        div.main-wrapper
          div.btn-link
            router-link(:to="{ name: 'sophistory' }").ui.button.basic.small 자세히보기
          div.header 
            h3 SOP 실행이력
          div.mainContent
            div.content
              DataTable(
                v-model="selected"
                :headers="mainSopHistory.headers",
                :items="mainSopHistory.sopHistoryData",
                :isFooter="mainSopHistory.isfooter",
                :isListNumber="mainSopHistory.isListNumber",
                :isPagination="mainSopHistory.isPagination",
                :page="mainSopHistory.pageInfo"
              ).ui.table.celled.selectable
                <template slot="items" slot-scope="props">
                  tr
                    td.center.aligned(v-if="mainSopHistory.isListNumber") {{props.idx+1}}
                    td {{props.item.date}}
                    td {{props.item.manager}}
                    td.center.aligned {{props.item.type}}
                    td {{props.item.title}}
                    td.ellipse {{props.item.location}}
                    td {{props.item.endtime}}
                </template>
            router-link(:to="{ name: 'test-page'}" ).ui.button NOTICE
      div.six.wide.column
        div.main-wrapper
          div.btn-link
            router-link(:to="{ name: 'sensorhistory' }").ui.button.basic.small 자세히보기
          div.header 
            h3 센서탐지분석
          div.mainContent
            div.content.chart-wrapper
              PieChart(:data="chartData.data", :options="chartData.options")
      div.ten.wide.column
        div.main-wrapper
          div.btn-link
            router-link(:to="{ name: 'smshistory' }").ui.button.basic.small 자세히보기
          div.header 
            h3 SMS전송이력
          div.mainContent
            div.content
              DataTable(
                v-model="selected"
                :headers="mainSmsHistory.headers",
                :items="mainSmsHistory.smsHistoryData",
                :isFooter="mainSmsHistory.isfooter",
                :isListNumber="mainSmsHistory.isListNumber",
                :isPagination="mainSmsHistory.isPagination",
                :page="mainSmsHistory.pageInfo"
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
      div.six.wide.column
        div.main-wrapper
          div.btn-link
            router-link(:to="{ name: 'notice-manage' }").ui.button.basic.small 자세히보기
          div.header 
            h3 공지사항
          div.mainContent
            div.content
              div.ui.list.celled
                div.item(v-for="item in 2")
                  div.right.floated.content
                    div 2019.0101
                  div.content
                    div 내용
                
=======
      div.eight.wide.column
        div.mainContent
          h3.header SOP 실행이력
          div.content
            DataTable(
              v-model="selected"
              :headers="mainSopHistory.headers",
              :items="mainSopHistory.sopHistoryData",
              :isFooter="mainSopHistory.isfooter",
              :isListNumber="mainSopHistory.isListNumber",
              :isPagination="mainSopHistory.isPagination",
              :page="mainSopHistory.pageInfo"
            ).ui.table.celled.selectable
              <template slot="items" slot-scope="props">
                tr
                  td.center.aligned(v-if="mainSopHistory.isListNumber") {{props.idx+1}}
                  td {{props.item.date}}
                  td {{props.item.manager}}
                  td.center.aligned {{props.item.type}}
                  td {{props.item.title}}
                  td.ellipse {{props.item.location}}
                  td {{props.item.endtime}}
              </template>
          router-link(:to="{ name: 'test-page'}" ).ui.button NOTICE
      div.eight.wide.column
        div.mainContent
          h3.header 센서탐지분석
      div.eight.wide.column
        div.mainContent
          h3.header SOP 실행이력
          div.content
            DataTable(
              v-model="selected"
              :headers="mainSmsHistory.headers",
              :items="mainSmsHistory.smsHistoryData",
              :isFooter="mainSmsHistory.isfooter",
              :isListNumber="mainSmsHistory.isListNumber",
              :isPagination="mainSmsHistory.isPagination",
              :page="mainSmsHistory.pageInfo"
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
      div.eight.wide.column
        div.mainContent content4
    
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
</template>

<script>
import { mapActions } from 'vuex'
import DataTable from '@/components/DataTable.vue'
<<<<<<< HEAD
import PieChart from '@/components/PieChart'
=======
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
import { mainSopHistoryHeader, mainSmsHistoryHeader } from '@/setting'

export default {
  name: 'home',
  data () {
    return {
      selected: [],
      mainSopHistory: {
        isfooter: false,
        isPagination: false,
        isListNumber: true,
        pageInfo: {},
        headers: mainSopHistoryHeader.headers,
        sopHistoryData: []
      },
      mainSmsHistory: {
        isfooter: false,
        isPagination: false,
        isListNumber: true,
        pageInfo: {},
        headers: mainSmsHistoryHeader.headers,
        smsHistoryData: []
<<<<<<< HEAD
      },
      chartData: {
        data: {
          labels: ["Red", "Blue"],
          datasets: [{
            labels: 'Test Chart',
            data: [80, 20],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
          }]
        },
        options: {

        }
      } 
    }
  },
  components: {
    DataTable,
    PieChart
=======
      }
    }
  },
  components: {
    DataTable
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
  },
  created() {
  }
  
}

</script>

<style lang="less" scoped>
.home {
<<<<<<< HEAD
  padding: 10px 30px;
  .main-wrapper {
    position: relative;
    width: 100%;
    
    .btn-link {
      position: absolute;
      top: 9px;
      right: 7px;
    }
    .header {
      padding: 20px 0 20px 0;
    }
    .mainContent {
      min-height: 330px;
      max-height: 330px;
      padding: 20px;
      background-color: #fff;
    }
    .chart-wrapper {
        width: 60%;
        padding: 20px;
        margin: 0 auto;
    }
=======
  padding: 1rem;
  .mainContent {
    padding: 10px;
    background-color: #fff;
    .header {

    }
    .content {
      
    }
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
  }
}
</style>

