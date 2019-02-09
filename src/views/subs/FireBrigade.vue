<template lang="pug">
  div.FireBrigade.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 자위소방대관리
        SearchComp(v-model="searchData", :isTextSearch="true")
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
              :headers="fireBrigade.headers",
              :items="fireBrigade.fireBrigadeGroup",
              :isFooter="fireBrigade.isFooter"
              :isPagination="fireBrigade.isPagination"
              :isListNumber="fireBrigade.isListNumber",
              :page="fireBrigade.pageInfo"
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
import FireBrigadeApi from '@/api/FireBrigade'
import axios from 'axios'

export default {
  name: 'firebrigade',
  data () {
    return {
      fireBrigade: {
        headers: fireBrigadeGroupHeader.headers,
        fireBrigadeGroup: [],
        isFooter: true,
        isPagination: false,
        isListNumber: false,
        pageInfo: {}
      },
      treeviewData: [],
      rootActive: true,
      searchData: {}
    }
  },
  components: {
    DataTable,
    TreeView,
    SearchComp
  },
  created () {
    this.getList()
    this.getTreeList()
  },
  methods: {
    setNumbering (num) {
      return (this.pageInfo.currentPageNo - 1) * 10 + num
    },
    getList() {
      FireBrigadeApi.getAllFireman()
      .then(result => {
        console.log(result)
        this.fireBrigade.fireBrigadeGroup = result.slfdfnFbrdEmpInfoAllList
      })
      .catch(err => {
        console.log(err)
      })
    },
    getTreeList () {
      FireBrigadeApi.getTreeList()
      .then(result => {
        console.log(result)
        this.treeviewData = result.slfdfnFbrdTrList
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
