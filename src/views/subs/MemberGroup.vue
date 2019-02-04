<template lang="pug">
  div.MemberGroup.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 조직도 관리
        SearchComp(:isTextSearch="true")
          template(slot="condition1", slot-scope="props")
            select.ui.dropdown
              option 전제
              option 부서
              option 이름
      div.sub-content
        div.content.row
          div.section.left-section
            div.treeView.list.level-0
                  TreeView( v-for="item in treeviewData" :treeItem="item", :isActive="rootActive", :level="1")
          div.section.right-section
            h3 정규직원
            DataTable(
              :tableType="type",
              :headers="headers",
              :items="memberGoupData",
              :isFooter="isFooter"
              :isPagination="isPagination"
              :isListNumber="isListNumber",
              :page="pageInfo"
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

export default {
  name: 'membergroup',
  components: {
    DataTable,
    TreeView,
    SearchComp
  },
  data () {
    return {
      type: 'celled',
      headers: memberGroupeHeader.headers,
      memberGoupData: [],
      isFooter: true,
      isPagination: true,
      isListNumber: false,
      pageInfo: {},
      treeviewData: [],
      rootActive: true
    }
  },
  created () {
    this.test()
    this.test2()
    this.getAsync()
    console.log(this.pageInfo)
  },
  computed: {
    ...mapGetters([
      'getData',
      'getData1'
    ]),
  },
  methods: {
    ...mapActions('getData', [
      'getAsync',
      'getAsync1'
    ]),
    setNumbering (num) {
      return (this.pageInfo.currentPageNo - 1) * 10 + num
    },
    test () {
      axios.post('http://172.16.10.202:18080/n3n.sop.OrgnztInfo.selectDeptEmpInfoList.do', {
      })
        .then(res => {
          console.log(this.pageInfo)
          this.memberGoupData = res.data.deptEmpInfoList
          this.pageInfo = res.data.param
          this.pageInfo.totalCount = res.data.totCnt
          console.log(this.pageInfo)
        })
        .catch(err => {
          console.log(err)
        })
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
