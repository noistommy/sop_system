<template lang="pug">
  div.home
    div.ui.grid
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
    
</template>

<script>
import { mapActions } from 'vuex'
import DataTable from '@/components/DataTable.vue'
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
      }
    }
  },
  components: {
    DataTable
  },
  created() {
  }
  
}

</script>

<style lang="less" scoped>
.home {
  padding: 1rem;
  .mainContent {
    padding: 10px;
    background-color: #fff;
    .header {

    }
    .content {
      
    }
  }
}
</style>

