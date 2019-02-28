<template lang="pug">
  div.SopList.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 재난 대응 절차 목록
        SearchComp(
          v-model="searchData",
          :isTextSearch='true'
          :isDateSearch="false",
          @search="getSopList")
          template(slot="condition1", slot-scope="props")
            select.ui.dropdown(v-model="req.msfrtnKndCd")
              option(value="") 재난종류
              option(v-for="code in typeCode", value="code.cmmnCd") {{code.cmmnCdNm}}

          template(slot="condition2", slot-scope="props")
            select.ui.dropdown(v-model="req.crisisGnfdStepCd")
              option(value="") 위기발령단계
              option(v-for="code in stepCode", value="code.cmmnCd") {{code.cmmnCdNm}}
      div.sub-content
        div.content
          DataTable(
            v-model="sopList.selected"
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
              template(v-if="getUser.userCode == 'S0400100'")
                button.ui.button.large() 편집
                button.ui.button.large(@click="deleteSop") 삭제
                button.ui.button.large.green SOP실행
            div.btn-wrap.right
              template(v-if="getUser.userCode == 'S0400100'")
              button.ui.button.large.blue 재난절차생성

</template>

<script>
import DataTable from '@/components/DataTable'
import SearchComp from '@/components/SearchComp'
import { sopListHeader } from '@/setting'
import SopManageApi from '@/api/SopManage'
import { mapGetters, mapActions } from 'vuex'
import PublicCodeApi from '@/api/PublicCode'
import { codeGenerator } from '@/util'

export default {
  name: 'sop-list',
  data () {
    return {
      searchData: {},
      req: {
        msfrtnKndCd: "",
        crisisGnfdStepCd: "",
        sopTitle: ""
      },
      sopList: {
        selected: [],
        isfooter: true,
        isPagination: true,
        isListNumber: true,
        isSelect: true,
        itemkey: 'sopId',
        pageInfo: {},
        headers: sopListHeader.headers,
        sopListData: []
      },
      typeCode: [],
      stepCode: []
    }
  },
  components: {
    DataTable,
    SearchComp
  },
  created() {
    this.getCodeList('S090')
    this.getCodeList('S100')
    this.getSopList()
  },
  computed: {
    ...mapGetters([
      'getUser'
    ])
  },
  methods: {
    getSopList () {
      this.req.sopTitle = this.searchData.searchTexts
      const requestData = JSON.stringify(this.req)
      SopManageApi.getList(requestData).then(result => {
        console.log(result.data)
        this.sopList.sopListData = result.data.sopMgmtList
      }).catch(error => {
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    getSopItem () {
      const requestData = JSON.stringify({})
      SopManageApi.getItem(requestData).then(result => {
        console.log(result.data)
      }).catch(error => {
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    deleteSop () {
      const requestData = JSON.stringify({
        sopId: this.sopList.selected[0].sopId
      })
      SopManageApi.deleteItem(requestData).then(result => {
        console.log(result.data)
        this.getSopList()
      }).catch(error => {
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    getCodeList (code) {
      const requestData = JSON.stringify({
        cmmnCd: code
      })
      PublicCodeApi.getList(requestData).then(result => {
        console.log(code)
        if(code === 'S090') {
          this.typeCode = result.data.cmmnCdDetailList
        }
        if(code === 'S100') {
          this.stepCode = result.data.cmmnCdDetailList
        }
      }).catch(error => {
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    selectedItem(itemInfo) {
      this.sopList.selected = []
      if(!itemInfo.selected) {
        this.sopList.selected.push(this.sopList.sopListData[itemInfo.idx])
      }
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>
