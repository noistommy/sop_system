<template lang="pug">
  div.modal
    div.modal-header {{title}}
    div.modal-content.treeEditor
      div.tree-editor
        div.select-part
          h3 부서 선택
          div.treeView-wrapper
            div.treeView.list.level-0
              TreeView(
                v-model= "selectTeam",
                @select="getItemInfo",
                v-for="item in treeviewData",
                :treeItem="item",
                :isActive="activeItem",
                :isSelect ="false"
                :level="1")
        div.select-person
          div.select-part-name 
            div.title {{selectTeam.title ? selectTeam.title : '수신자선택'}}
            button.ui.right.floated.button.blue.mini(@click="selectAll") 전체 
          div.treeView-wrapper.select-part
            div.treeView.list.level-0
              TreeView(
                  v-model= "selectTeamList",
                  @select="getListInfo",
                  v-for="item in selectTeamList.deptEmpInfoPopupList",
                  :treeItem="item",
                  :isActive="activeItem"
                  :isSelect ="true"
                  :level="1",
                  :selectYn="recieverSelect")
          //- div.ui.list
          //-   div.item(v-for="item in selectTeamList.emplTrList")
              //- div {{emplNm}}
        div.btnSet
          div.btn-group.left
          div.btn-wrap.right
            button.ui.button 선택
            button.ui.button(@click="$emit('close')") 취소
    div.modal-close(@click="$emit('close')")
        div.close X
</template>

<script>
import MemberApi from '@/api/Member'
import SopManageApi from '@/api/SopManage'
import TreeView from '@/components/TreeView'
import { codeGenerator } from '@/util'

export default {
  name: 'treeview-modal',
  components: {
    TreeView
  },
  props: {
    type: String,
    title: String,
    text: String,
    target: Object,
    value: Object,
    isActive: Boolean
  },
  data () {
    return {
      treeviewData: [],
      selectTeamList: [],
      createTeam: {
        slfdfnFbrdNm: '',
        upperSlfdfnFbrdId: ''
      },
      selectTeam: {},
      selectTeamList: {},
      editTeam: this.target,
      activeItem: true,
      selectTeamInfo: {
        slfdfnFbrdId: ''
      },
      recieverList: [],
      recieverSelect: false
    }
  },
  created () {
    this.getTreeList()
  },
  methods: {
    getTreeList () {
      const request = JSON.stringify({})
      SopManageApi.getRecieverTree(request).then(result => {
        this.treeviewData = result.data.deptTrList
        this.selectTeam = result.data.deptTrList[0]
        this.selectTeamInfo.deptId = this.selectTeam.childDeptId
        this.getTreeItem(this.selectTeamInfo)
      }).catch(error => {
        const err = error
        console.log(err)
        // this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    // getTreeList () {
    //   // const request = JSON.stringify(this.requestData)
    //   MemberApi.getTree().then(result => {
    //     this.treeviewData = result.data.trOrgnList
    //     this.selectTeam = result.data.trOrgnList[0]
    //     this.getTreeItem(this.selectTeamInfo)
    //   }).catch(error => {
    //     const err = error.response
    //     console.log(err)
    //     this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
    //   })
    // },
    getTreeItem (request) {
      const requestData = JSON.stringify(request)
      SopManageApi.getRecieverList(requestData).then(result => {
       console.log(result.data)
       this.selectTeamList = result.data
      }).catch(error => {
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    getItemInfo(item) {
      this.selectTeam = item
      this.selectTeamInfo.deptId = this.selectTeam.childDeptId
      this.getTreeItem(this.selectTeamInfo)
      this.recieverSelect = false
    },
    getListInfo(item) {
      let checkitem = false
      this.recieverList.forEach((e, i) => {
        if(e.emplNo == item.emplNo) {
          this.recieverList.splice(i, 1)
          checkitem = true
        }
      })
      if(!checkitem) {
        this.recieverList.push(item)
      }
    },
    selectAll() {
      this.recieverSelect = !this.recieverSelect
      this.selectTeamList.deptEmpInfoPopupList.forEach(e => {
        this.getListInfo(e)
      })
    }
  } 
}
</script>

<style lang="less">
.modal {
    background-color: #fff;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    .modal-header {
        background-color: #5d5e68;
        color: #fff;
        padding: .8em 1.2em;
        font-weight: 700;
    }
    .modal-content {
      flex-grow: 1;
      padding: 15px;
      &.treeEditor {
        overflow-y: auto;
        background-color: #454545;
        .treeView-footer {
          padding-top: 20px;
        }
      }
      .tree-editor {
        display: flex;
        background-color: #454545;
        height: 90%;
        > div {
          color:#fff;
          width: 100%;
          padding: 10px;
          margin: 0 5px;
          .treeView-wrapper {
            width: 100%;
            height: 85%;
            .treeview {
              height: 90%;
            }
            .level-0 {
              border:0;
            }
          }
          .editor-wrapper {
            position: relative;
            flex-grow: 1;
            padding: 10px;
            color: #fff;
            .content{
              padding: 10px;
              border: 1px solid rgba(139, 139, 139, 0.493);
            }
            .ui.form input {
              background-color: rgba(0, 0, 0, 0.2);
              color:#fff;
            }
          }
        }
        .select-person {
          .select-part-name {
            font-size: 1.2rem;
            height: 20px;
            padding-bottom: 10px;
            .title {
              float: left;
              padding: 5px 0
            }
          }
        }
      }
    }
    .treeView-footer {
      background-color: #454545;
      height: 15%;
      padding: 10px;

    }
    .modal-close {
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 2px 4px;
        border-radius: 3px;
        color: #fff;
        // background-color: #fff;
        font-size: 1rem;
        i {
          margin:0;
        }
        &:hover {
          background-color: #fff;
          color: #5d5e68;
        }
    }
    &.small {width: 300px;}
    &.large {width: 600px;}
    &.full {width: 90%;}
}
</style>
