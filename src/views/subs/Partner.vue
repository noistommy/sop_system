<template lang="pug">
  div.Partner.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 협력업체관리
        SearchComp(v-model="searchData", :isTextSearch="true")
          template(slot="condition1", slot-scope="props")
            select.ui.dropdown
              option 전제
              option 부서
              option 이름
      div.sub-content
        div.content.row
          div.section.left-section
            div.treeView-wrapper
              div.treeView.list.level-0
                    TreeView( v-for="item in treeviewData" :treeItem="item", :isActive="rootActive", :level="1")
          div.section.right-section
            h3 협력업체
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
import { partnerGroupeHeader } from '@/setting'
import axios from 'axios'

export default {
  name: 'partner',
  data () {
    return {
      headers: partnerGroupeHeader.headers,
      fireBrigadeGroup: [],
      isFooter: true,
      isPagination: false,
      isListNumber: false,
      pageInfo: {},
      treeviewData: [],
      rootActive: true,
<<<<<<< HEAD
      searchData: {},
      isEdit: false
=======
      searchData: {}
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
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
.transition (@type: all, @duration: 250ms, @Function: ease-out) {
  -webkit-transition: @arguments;
  -moz-transition: @arguments;
  -ms-transition: @arguments;
  -o-transition: @arguments;
  transition: @arguments;
}



</style>
