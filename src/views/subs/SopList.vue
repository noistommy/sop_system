<template lang="pug">
  div.SopList.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 재난 대응 절차 목록
        SearchComp(
          v-model="searchData",
          :isTextSearch='true'
          :isDateSearch="false")
          template(slot="condition1", slot-scope="props")
            select.ui.dropdown(v-model="contData_1")
              option(value="00", default) 전제
              option(value="01") OPtion1
              option(value="02") OPTION2

          template(slot="condition2", slot-scope="props")
            select.ui.dropdown(v-model="contData_2")
              option(value="00", default) 전제
              option(value="01") OPtion1
              option(value="02") OPTION2
      div.sub-content
        div.content
          DataTable(
            v-model="selected"
            :headers="sopList.headers",
            :items="sopList.sopListData",
            :itemKey="sopList.itemkey",
            :isFooter="sopList.isfooter",
            :isListNumber="sopList.isListNumber",
            :isSelect="sopList.isSelect",
            :isPagination="sopList.isPagination",
            :page="sopList.pageInfo"
          ).ui.table.celled.selectable
            <template slot="items" slot-scope="props">
              tr(:active="props.selected", @click="selectedItem(props)" )
                td.center.aligned
                  div.ui.checkbox
                    input(type="checkbox", :checked="props.selected")
                    label
                td.center.aligned {{props.idx + 1}}
                td.center.aligned {{props.item.sopId}}
                td.center.aligned {{props.item.msfrtnKndCdNm}}
                td.center.aligned {{props.item.crisisGnfdStepNm}}
                td.ellipse {{props.item.sopTitle}}
            </template>
        div.footer
          div.btnSet
            div.btn-group.left
              button.ui.button.large 편집
              button.ui.button.large 삭제
              button.ui.button.large.green SOP실행
            div.btn-wrap.right
              button.ui.button.large.blue 생성

</template>

<script>
import DataTable from '@/components/DataTable'
import SearchComp from '@/components/SearchComp'
import { sopListHeader } from '@/setting'
import SopManageApi from '@/api/SopManage'

export default {
  name: 'sop-list',
  data () {
    return {
      contData_1: "00",
      contData_2: "00",
      selected: [],
      searchData: {},
      sopList: {
        isfooter: true,
        isPagination: true,
        isListNumber: true,
        isSelect: true,
        itemkey: 'sopId',
        pageInfo: {},
        headers: sopListHeader.headers,
        sopListData: []
      }
    }
  },
  components: {
    DataTable,
    SearchComp
  },
  created() {
    this.getSopList()
  },
  methods: {
    getSopList () {
      SopManageApi.getList().then(result => {
        console.log(result.data)
        this.sopList.sopListData = result.data.sopMgmtList
      })
    },
    deleteSop () {
      SopManageApi.deleteItem().then(result => {
        console.log(result.data)
        this.sopList.sopListData = result.data.sopMgmtList
      })
    },
    selectedItem(itemInfo) {
      this.selected = []
      if(!itemInfo.selected) {
        this.selected.push(this.sopList.sopListData[itemInfo.idx])
      }
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>
