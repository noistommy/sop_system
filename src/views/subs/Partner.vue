<template lang="pug">
  div.Partner.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 협력업체관리
        SearchComp(v-model="searchData", :isTextSearch="true", @search="searchList")
          template(slot="condition1", slot-scope="props")
            select.ui.dropdown(v-model="searchData.searchCnd")
              option(value="", default) 분류
              option(value="00") 전체
              option(value="01") 팀명
              option(value="02") 이름
      div.sub-content
        div.content.row
          div.section.left-section
            div.treeView-wrapper(:class="{editabled:isEdit}")
              div.treeView.list.level-0
                TreeView(
                  v-model="selectTeam",
                  v-for="item in treeviewData",
                  :treeItem="item",
                  :isActive="rootActive",
                  :level="1",
                  @search="getPartnerItem")
            div.treeEdit
            div.btnSet
              div.btn-group.left
                button.ui.button.mini(@click="activeTreeView('new')") 등록
              div.btn-wrap.right
                button.ui.button.mini(@click="activeTreeView('edit')") 편집
          div.section.right-section
            h3 {{selectTeam.ccpyNm}}
            DataTable(
              v-model="partner.selected",
              :headers="partner.headers",
              :items="partner.partnerData",
              :itemKey="partner.itemkey",
              :isFooter="partner.isFooter"
              :isPagination="partner.isPagination"
              :isListNumber="partner.isListNumber",
              :page="partner.pageInfo"
            ).ui.table.celled.selectable
              <template slot="items" slot-scope="props">
                tr(:active="props.selected", @click="selectedItem(props)" )
                  td.center.aligned {{props.item.emplNm}}
                  td.center.aligned {{props.item.deptNm}}
                  td.center.aligned {{props.item.ofcpsCdNm}}
                  td.center.aligned.ellipse {{props.item.clsfCdNm}}
              </template>
            div.btnSet
              button.ui.button.large.blue(@click="createPartner()") 신규등록
              button.ui.button.large.blue(@click="updatePartner()") 편집
        div.footer
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import TreeView from '@/components/TreeView.vue'
import SearchComp from '@/components/SearchComp.vue'
import PartnerEditor from '@/components/PartnerEditor.vue'
import TreeModalPartner from '@/components/TreeModalPartner.vue'
import { partnerGroupeHeader } from '@/setting'
import PartnerApi from '@/api/Partner'
import { codeGenerator } from '@/util'

export default {
  name: 'partner',
  data () {
    return {
      partner: {
        selected:[],
        headers: partnerGroupeHeader.headers,
        partnerData: [],
        isFooter: true,
        isPagination: true,
        isListNumber: false,
        itemkey: 'moblphonNo',
        pageInfo: {},
      },
      partnerDetailInfo: {},
      treeviewData: [],
      rootActive: true,
      selectTeam: {},
      searchData: {
        searchCnd: '',
        searchNm: '',
        currPage: 1
      },
      isEdit: false
    }
  },
  components: {
    DataTable,
    TreeView,
    SearchComp,
    PartnerEditor
  },
  created () {
    this.getPartnerList()
  },
  methods: {
    initSearch () {
      this.searchData = {
        searchCnd: '',
        searchNm: '',
        currPage: 1
      }
    },
    getPartnerList () {
      if(this.searchData.searchCnd == "00") {this.searchData.searchCnd = ""}
      const requestData = JSON.stringify(this.searchData)
      console.log(this.searchData)
      PartnerApi.getAllList(requestData).then(result => {
        console.log(result)
        this.treeviewData = result.data.ccpyTrList
        this.partner.partnerData = result.data.ccpyEmpList
        result.data.param.totalCount = result.data.totCnt
        this.partner.pageInfo = result.data.param
        this.initSearch()
      }).catch(error => {
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    searchList () {
      this.getPartnerList()
    },
    getPartnerItem () {
      const requestData = JSON.stringify({
        ccpyId: this.selectTeam.ccpyId,
        currPage: 1
      })
      PartnerApi.getDetail(requestData).then(result => {
        console.log(result)
        this.partnerDetailInfo = result.data.ccpyDetailInfo
        this.partner.partnerData = result.data.ccpyEmpList
        result.data.param.totalCount = result.data.totCnt
        this.partner.pageInfo = result.data.param
      }).catch(error => {
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    selectedItem(itemInfo) {
      this.partner.selected = []
      if(!itemInfo.selected) {
        this.partner.selected.push(this.partner.partnerData[itemInfo.idx])
      }
    },
    createPartner () {
      let partnerdata = {
        title: '협력업체사원',
        type: 'new',
        data: {
          ccpyId: '',
          emplNm: '',
          clsfNm: '',
          moblphonNo: ''
        }
      }
      this.$modal.show(PartnerEditor, partnerdata, { height: 'auto', draggable: true})
    },
    updatePartner () {
      let partnerdata = {
        title: '협력업체사원',
        type: 'edit',
        data: {
          ccpyId: '',
          emplNm: '',
          clsfNm: '',
          moblphonNo: ''
        }
      }
      if(this.partner.selected[0] == undefined || this.partner.selected[0] == []) {
        this.$modal.show('dialog',{
          title: '선택오류',
          text: '선택된 데이터가 없습니다'
        }) 
      } else {
        partnerdata.data = this.partner.selected[0]
        this.$modal.show(PartnerEditor, partnerdata, { height: 'auto', draggable: true})
      }
    },
    activeTreeView (editType) {
      this.$modal.show(TreeModalPartner, {
        title: '협력업체',
        data: this.treeviewData,
        target: this.selectTeam,
        type: editType
      },{
        width: '700px',
        height: '50%'
      })
    },
    editpanel () {
      this.isEdit = !this.isEdit
    }
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
.Partner {
  .left-section {
    display: flex;
    flex-direction: column;
    .treeView-wrapper {
      overflow-y: auto;
      height: 90%;
      .transition();
      &.editabled {
        height: 50%;
      }
    }
    .treeEdit {
      flex-grow: 1;
      position: relative;
      // background-color: rgba(0, 0, 0, .5);
      color: #fff;
      .edit-wrapper {
        position:absolute;
        top: 80px;
        width: 100%;
        padding: 10px;
        .ui.form input {
          background-color: rgba(0, 0, 0, 0);
          color:#fff;
        }
      }
    }
  }
}



</style>
