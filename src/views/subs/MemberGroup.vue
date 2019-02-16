<template lang="pug">
  div.MemberGroup.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 조직도 관리
        SearchComp(v-model="searchData", :isTextSearch="true", @search="getList")
          template(slot="condition1", slot-scope="props")
            select.ui.dropdown(v-model="searchData.type")
              option(value="", default) 분류
              option(value="00") 전체
              option(value="01") 팀명
              option(value="02") 이름
      div.sub-content
        div.content.row
          div.section.left-section
            div.treeView-wrapper
              div.treeView.list.level-0
                    TreeView(v-model="selectTeam", @select="getItemInfo", v-for="item in treeviewData" :treeItem="item", :isActive="rootActive", :level="1", @search="getList")
          div.section.right-section
            h3.table-title {{selectTeam.title}}
              span.total 총 {{memberGroup.pageInfo.totalCount}}명
            DataTable(
              v-model="selected",
              :tableType="memberGroup.type",
              :headers="memberGroup.headers",
              :items="memberGroup.memberGoupData",
              :isFooter="memberGroup.isFooter"
              :isPagination="memberGroup.isPagination"
              :isListNumber="memberGroup.isListNumber",
              :page="memberGroup.pageInfo",
              @search="getList"
            ).ui.table
              <template slot="items" slot-scope="props">
                tr
                  td.center.aligned {{props.item.emplNm}}
                  td.center.aligned {{props.item.ofcpsCdNm}}
                  td.center.aligned.ellipse {{props.item.clsfCdNm}}
                  td.center.aligned {{props.item.deptNm}}
                  td.center.aligned {{props.item.moblphonNo}}
              </template>
        div.footer
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import TreeView from '@/components/TreeView.vue'
import SearchComp from '@/components/SearchComp.vue'
import { memberGroupeHeader } from '@/setting'
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'

import MemberApi from '@/api/Member'

export default {
  name: 'membergroup',
  components: {
    DataTable,
    TreeView,
    SearchComp
  },
  data () {
    return {
      memberGroup: {
        type: 'celled',
        headers: memberGroupeHeader.headers,
        memberGoupData: [],
        isFooter: true,
        isPagination: true,
        isListNumber: false,
        pageInfo: {}
      },
      selected: [],
      treeviewData: [],
      rootActive: true,
      selectTeam: {},
      searchData: {
        searchCnd: '',
        searchNm: '',
        childDeptId: '',
        upperDeptId: '',
        currPage: 1,
      }
    }
  },
  created () {
    this.getTreeList()
    
  },
  computed: {
  },
  methods: {
    setNumbering (num) {
      return (this.pageInfo.currentPageNo - 1) * 10 + num
    },
    getList (targetNum) {
      if(targetNum == undefined) {targetNum = 1}
      if(this.searchData.searchCnd == "00") {this.searchData.searchCnd = ""}
      this.searchData.currPage = targetNum
      this.searchData.childDeptId = this.selectTeam.childDeptId
      // this.searchData.upperDeptId = this.selectTeam.upperDeptId
      const requestData = JSON.stringify(this.searchData)

      MemberApi.getItems(requestData).then(result => {
        console.log(`memberdata: ${result.data}`)
        this.memberGroup.memberGoupData = result.data.deptEmpInfoList
        result.data.param.totalCount = result.data.totCnt
        this.memberGroup.pageInfo = result.data.param
      }).catch(error => {
        console.log(error)
      })
    },
    getTreeList () {
      // const request = JSON.stringify(this.requestData)
      MemberApi.getList().then(result => {
        console.log(`treedata: ${result.data}`)
        this.treeviewData = result.data.trOrgnList
        this.selectTeam = result.data.trOrgnList[0]
        this.getList(1)
      }).catch(error => {
        console.log(error)
      })
    },
    getItemInfo(item) {
        this.selectTeam = item
        this.getList(1)
    }
  }
}
</script>

<style lang="less" scoped>
.section {
  position:relative;
}
.treeView-wrapper {
  overflow-y: auto;
  height: 100%;
  .treeEdit {
    position: absolute;
    top:-100%;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    color: #fff;
    z-index: 999;
  }
}
</style>
