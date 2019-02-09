<template lang="pug">
  div.MemberGroup.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 조직도 관리
        SearchComp(v-model="searchData", :isTextSearch="true", @search="getList")
          template(slot="condition1", slot-scope="props")
            select.ui.dropdown
              option(value="00", default) 전제
              option(value="01") 팀명
              option(value="02") 이름
      div.sub-content
        div.content.row
          div.section.left-section
            div.treeView.list.level-0
                  TreeView(v-model="selectTeam" v-for="item in treeviewData" :treeItem="item", :isActive="rootActive", :level="1")
          div.section.right-section
            h3 정규직원
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
            ).ui.table.selectable
              <template slot="items" slot-scope="props">
                tr
                  td.center.aligned {{props.item.emplNm}}
                  td.center.aligned {{props.item.deptNm}}
                  td.center.aligned {{props.item.ofcpsCdNm}}
                  td.center.aligned.ellipse {{props.item.clsfCdNm}}
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
      selectTeam: '',
      searchData: {
        type: "00",
        value: ""
      },
      requestData: {
        currPage: 1
      }
    }
  },
  created () {
    this.getList()
    this.test2()
  },
  computed: {
  },
  methods: {
    setNumbering (num) {
      return (this.pageInfo.currentPageNo - 1) * 10 + num
    },
    getList (targetNum) {
      this.requestData.currPage = targetNum
      const request = JSON.stringify(this.requestData)
      const result = MemberApi.getItems(request)
      console.log(`MemberList:${result}`)
      this.memberGroup.memberGoupData = result.deptEmpInfoList
      this.memberGroup.pageInfo = result.param
      this.memberGroup.pageInfo.totalCount = result.totCnt
      // axios.post('http://172.16.10.202:18080/n3n.sop.OrgnztInfo.selectDeptEmpInfoList.do', JSON.stringify(this.requestData))
      //   .then(res => {
      //     this.memberGroup.memberGoupData = res.data.deptEmpInfoList
      //     this.memberGroup.pageInfo = res.data.param
      //     this.memberGroup.pageInfo.totalCount = res.data.totCnt
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    },
    test2 () {
      console.log('axios')
      axios.post('http://172.16.10.202:18080/n3n.sop.OrgnztInfo.selectOrgnztInfoTrList.do', {})
        .then(res => {
          console.log(res.data.trOrgnList)
          this.treeviewData = res.data.trOrgnList
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>

<style lang="less" scoped>

</style>
