<template lang="pug">
  div.FireBrigade.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 자위소방대관리
        SearchComp(v-model="searchData", :isTextSearch="true", @search="getTreeList")
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
                  :treeItem="item",
                  :isActive="rootActive",
                  :level="1",
                  @search="getList")
            div.treeEdit
              div.btnSet
                button.ui.left.floated.button.mini.inverted(@click="activeTreeView('new')") 등록
                button.ui.right.floated.button.mini.inverted(@click="activeTreeView('edit')") 편집
              div.edit-wrapper
                div.ui.form.inverted
                  div.field
                    label 자위소방대명
                    input(type="text", v-model="uploadTreeData.childSlfdfnFbrdNm")
                  div.field
                    label 상위자위소방대명
                    input(type="text", v-model="uploadTreeData.upperSlfdfnFbrdNm")
              
          div.section.right-section
            div.file-movement
              div.files_1
                h3 {{selectTeam.title}}
                div.data-list-wrap
                  DataList(
                    v-model="fireBrigade.selected"
                    :headers="fireBrigade.headers",
                    :items="fireBrigade.fireBrigadeGroup",
                    :itemKey="fireBrigade.itemkey",
                    :isListNumber="fireBrigade.isListNumber",
                    :isTitle="fireBrigade.isTitle"
                  )
                    template(slot="items", slot-scope="props")
                      div.item.lr.listitem(:class="{active:props.selected}", @click.stop="selectedleftItems(props)" )
                        .ld {{props.item.emplNm}}
                        .ld {{props.item.clsfCdNm}}
                        .ld {{props.item.ofcpsCdNm}}
                        .ld {{props.item.deptNm}}
              div.movement-btn
                div.btn-wrapper
                  button.ui.icon.button
                    i.arrow.left.icon
                  button.ui.icon.button
                    i.arrow.right.icon
              div.files_2
                h3 미배정목록
                div.data-list-wrap
                  DataList(
                    v-model="offFireBrigade.selected"
                    :headers="offFireBrigade.headers",
                    :items="offFireBrigade.offFireBrigadeGroup",
                    :itemKey="offFireBrigade.itemkey",
                    :isListNumber="offFireBrigade.isListNumber",
                    :isTitle="offFireBrigade.isTitle"
                  )
                    template(slot="items", slot-scope="props")
                      div.item.lr.listitem(:class="{active:props.selected}", @click.stop="selectedrightItems(props)" )
                        .ld {{props.item.emplNm}}
                        .ld {{props.item.clsfCdNm}}
                        .ld {{props.item.ofcpsCdNm}}
                        .ld {{props.item.deptNm}}
            
            div.btnSet
                div.btn-wrap.right
                div.btn-group.left
                  button.ui.button.blue 저장
                  button.ui.button(@click="getList") 취소
        div.footer
          //- div.btnSet
          //-   button.ui.button.right.floated.large.blue 파일다운로드
          
          

</template>

<script>
import DataTable from '@/components/DataTable.vue'
import DataList from '@/components/DataList.vue'
import TreeView from '@/components/TreeView.vue'
import SearchComp from '@/components/SearchComp.vue'
import TreeModal from '@/components/TreeModal.vue'
import { fireBrigadeGroupHeader } from '@/setting'
import FireBrigadeApi from '@/api/FireBrigade'
import axios from 'axios'
import { codeGenerator } from '@/util'

export default {
  name: 'firebrigade',
  data () {
    return {
      fireBrigade: {
        selected: [],
        headers: fireBrigadeGroupHeader.headers,
        fireBrigadeGroup: [],
        isListNumber: false,
        isTitle: false,
        itemkey: 'emplNo'
      },
      offFireBrigade: {
        selected: [],
        headers: fireBrigadeGroupHeader.headers,
        offFireBrigadeGroup: [],
        isListNumber: false,
        isTitle: false,
        itemkey: 'emplNo'
      },
      FireBrigadeDetail: {},
      treeviewData: [],
      rootActive: true,
      selectTeam: {},
      searchData: {
        searchCnd: '',
        searchNm: ''
      },
      isEdit: false,
      uploadTreeData: {}
    }
  },
  components: {
    DataTable,
    DataList,
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
    getList() {
      if(this.searchData.searchCnd == "00") {this.searchData.searchCnd = ""}
      this.searchData.childSlfdfnFbrdId = this.selectTeam.childSlfdfnFbrdId
      const requestData = JSON.stringify(this.searchData)
      FireBrigadeApi.getDetail(requestData)
      .then(result => {
        console.log(result)
        this.initedSelect()
        this.fireBrigade.fireBrigadeGroup = result.data.slfdfnFbrdEmpInfoList
        this.offFireBrigade.offFireBrigadeGroup = result.data.fbrdAsignTrgetList
        this.fireBrigadeDetail = result.data.slfdfnFbrdDetailInfo
      })
      .catch(error => {
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    getTreeList () {
      FireBrigadeApi.getTreeList()
      .then(result => {
        console.log(result)
        this.treeviewData = result.data.slfdfnFbrdTrList
        this.selectTeam = result.data.slfdfnFbrdTrList[0]
        this.getList()
      })
      .catch(error => {
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })  
    },
    selectedleftItems(itemInfo) {
      if(itemInfo.selected) {
        this.selected.forEach((e, i) => {
          if(e[this.itemkey] == itemInfo.item[this.itemkey]) {
            this.fireBrigade.selected.splice(i, 1)
          }
        })
      } else {
        this.fireBrigade.selected.push(this.fireBrigade.fireBrigadeGroup[itemInfo.idx])
      }
    },
    selectedrightItems(itemInfo) {
      if(itemInfo.selected) {
        this.offFireBrigade.selected.forEach((e, i) => {
          if(e[this.itemkey] == itemInfo.item[this.itemkey]) {
            this.offFireBrigade.selected.splice(i, 1)
          }
        })
      } else {
        this.offFireBrigade.selected.push(this.offFireBrigade.offFireBrigadeGroup[itemInfo.idx])
      }
      
    },
    getItemInfo(item) {
        this.selectTeam = item
        this.uploadTreeData = item
        this.getList(1)
    },
    editpanel () {
      this.isEdit = !this.isEdit
    },
    initedSelect () {
      this.fireBrigade.selected= []
      this.offFireBrigade.selected= []
    },
    activeTreeView (editType) {
      this.$modal.show(TreeModal, {
        title: '자위소방대',
        data: this.treeviewData,
        target: this.selectTeam,
        type: editType
      },{
        width: '700px',
        height: '50%'
      })
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
  .section.left-section {
    display: flex;
    flex-direction: column;
    overflow: hidden !important;
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
  .file-movement {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: row;
    .movement-btn {
      padding: 0 10px;
      width: 10%;
    }
    .files_2{
      width: 45%;
      .data-list-wrap {
        width: 100%;
        height: 90%;
      }
    }
    .files_1 {
      width: 45%;
      .data-list-wrap {
        width: 100%;
        height: 90%;
      }
    }
  }
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

