<template lang="pug">
  div.FireBrigade.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 자위소방대관리
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
            h3 자위소방대
            DataTable(
              :headers="headers",
              :items="fireBrigadeGroup",
              :isFooter="isFooter"
              :isPagination="isPagination"
              :isListNumber="isListNumber",
              :page="pageInfo"
            ).ui.table.celled.selectable
              <template slot="items" slot-scope="props">
                tr
                  td.center.aligned {{props.item.emplNm}}
                  td.center.aligned {{props.item.deptNm}}
                  td.center.aligned {{props.item.ofcpsCdNm}}
                  td.center.aligned.ellipse {{props.item.clsfCdNm}}
              </template>
        div.footer
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import TreeView from '@/components/TreeView.vue'
import SearchComp from '@/components/SearchComp.vue'
import { fireBrigadeGroupHeader } from '@/setting'
import axios from 'axios'

export default {
  name: 'firebrigade',
  data () {
    return {
      headers: fireBrigadeGroupHeader.headers,
      fireBrigadeGroup: [],
      isFooter: true,
      isPagination: false,
      isListNumber: false,
      pageInfo: {},
      treeviewData: [],
      rootActive: true
    }
  },
  components: {
    DataTable,
    TreeView,
    SearchComp
  },
  created () {
    this.test2()
  },
  methods: {
    setNumbering (num) {
      return (this.pageInfo.currentPageNo - 1) * 10 + num
    },
    test2 () {
      console.log('axios')
      axios.post('http://172.16.10.202:18080/n3n.sop.SlfdfnFbrdInfo.selectSlfdfnFbrdTrList.do', {})
        .then(res => {
          console.log(res.data.slfdfnFbrdTrList)
          this.treeviewData = res.data.slfdfnFbrdTrList
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
