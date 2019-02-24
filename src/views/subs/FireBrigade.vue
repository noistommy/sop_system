<template lang="pug">
  div.FireBrigade.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 자위소방대관리
        SearchComp(v-model="searchData", :isTextSearch="true", @search="getTreeeList")
          template(slot="condition1", slot-scope="props")
            select.ui.dropdown(v-model="searchData.searchCnd")
              option(value="", default) 분류
              option(value="00") 전체
              option(value="01") 팀명
              option(value="02") 이름
        div.btnUpload
          button.ui.button.blue 파일업로드
          button.ui.button.blue 업로드샘플
      div.sub-content
        div.content.row
          div.section.left-section
            div.treeView-wrapper(:class="{editabled:isEdit}")
              div.treeView.list.level-0
                TreeView(
                  v-model="selectTeam",
                  @select="getItemInfo",
                  v-for="item in treeviewData",
                  treeItem="item",
                  :isActive="rootActive",
                  :level="1",
                  @search="getList")
            div.treeEdit
              div.btnSet
                button.ui.button.blue(@click="editpanel") 편집
              div.edit-wrapper
                div.ui.form.inverted
                  div.field
                    label 자위소방대명
                    input(type="text")
                  div.field
                    label 상위자위소방대명
                    input(type="text")
              
          div.section.right-section
            div.ui.grid
              div.seven.wide.column
                h3  자위소방대 
                //- h3 {{selectedTeam.childSlfdfnFbrdNm}}
                DataTable(
                  :headers="fireBrigade.headers",
                  :items="fireBrigade.fireBrigadeGroup",
                  :isFooter="fireBrigade.isFooter"
                  :isPagination="fireBrigade.isPagination"
                  :isListNumber="fireBrigade.isListNumber",
                  :page="fireBrigade.pageInfo"
                ).ui.table.celled.selectable
                  template(slot="items", slot-scope="props")
                    tr
                      td.center.aligned {{props.item.emplNm}}
                      td.center.aligned {{props.item.deptNm}}
                      td.center.aligned {{props.item.ofcpsCdNm}}
                      td.center.aligned.ellipse {{props.item.clsfCdNm}}
              div.two.wide.column
                div.btn-wrapper
                  button.ui.icon.button
                    i.arrow.left.icon
                  button.ui.icon.button
                    i.arrow.right.icon
              div.seven.wide.column
                h3 미배정목록
                DataTable(
                  :headers="fireBrigade.headers",
                  :items="fireBrigade.fireBrigadeGroup",
                  :isFooter="fireBrigade.isFooter"
                  :isPagination="fireBrigade.isPagination"
                  :isListNumber="fireBrigade.isListNumber",
                  :page="fireBrigade.pageInfo"
                ).ui.table.celled.selectable
                  template(slot="items", slot-scope="props")
                    tr
                      td.center.aligned {{props.item.emplNm}}
                      td.center.aligned {{props.item.deptNm}}
                      td.center.aligned {{props.item.ofcpsCdNm}}
                      td.center.aligned.ellipse {{props.item.clsfCdNm}}
            div.btnSet
              button.ui.button.large.blue 파일다운로드
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
      selectTeam: {},
      searchData: {
        searchCnd: '',
        searchNm: ''
      },
      isEdit: false
    }
  },
  components: {
    DataTable,
    TreeView,
    SearchComp
  },
  created () {
    this.getTreeList()
  },
  methods: {
    setNumbering (num) {
      return (this.pageInfo.currentPageNo - 1) * 10 + num
    },
    getList(targetNum) {
      if(targetNum == undefined) {targetNum = 1}
      if(this.searchData.searchCnd == "00") {this.searchData.searchCnd = ""}
      this.searchData.currPage = targetNum
      this.searchData.childDeptId = this.selectTeam.childDeptId
      const requestData = JSON.stringify(this.searchData)
      FireBrigadeApi.getAllFireman(requestData)
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
        this.treeviewData = result.data.slfdfnFbrdTrList
        this.selectTeam = result.data.slfdfnFbrdTrList[0]
        this.getList(1)
      })
      .catch(err => {
        console.log(err)
      })  
    },
    getItemInfo(item) {
        this.selectTeam = item
        this.getList(1)
    },
    testdialog () {
      this.$modal.show('dialog', {
        title: 'test'
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
.FireBrigade {
  .search-comp {
    right: 250px
  }
  .btnUpload {
    position: absolute;
    top:0;
    right:0;
  }
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
.section {
  position:relative;
}
.btn-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  button {
    display: inline-block;
    margin-top: 5px;
  }
}
</style>

