<template lang="pug">
  div.modal
    div.modal-header {{title}}
    div.modal-content.treeSelector
      div.tree-editor-modal
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
              div.treeitem(v-for="(item, index) in selectTeamList",
              @click="getListInfo(item)",
              :class="{active:item.checked == 'Y'}")
                div.treecontent
                    div.treeheader()
                      div.item-wrapper
                        div {{item.deptNm}} 
                        div {{item.clsfNm}} 
                        div {{item.emplNm}} 
        div.btnSet
          div.btn-group.left
          div.btn-wrap.right
            button.ui.button(@click="sendReciever") 선택
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
  name: 'tree-reciever-modal',
  components: {
    TreeView
  },
  props: {
    title: String,
    text: String,
    value: Object,
    isActive: Boolean,
    stepNo: Number,
    stepSn: Number,
    recieveData: Array
  },
  data () {
    return {
      treeviewData: [],
      selectTeam: {},
      selectTeamInfo: {},
      selectTeamList: [],
      activeItem: true,
      recieveList: this.recieveData,
      isAllselect: false,
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
        this.checkPartList(this.treeviewData)
      }).catch(error => {
        const err = error
        console.log(err)
        // this.$emit('close')
        // this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    getTreeItem (request) {
      const requestData = JSON.stringify(request)
      SopManageApi.getRecieverList(requestData).then(result => {
       console.log(result.data)
       this.selectTeamList = result.data.empInfoPopupList
       this.selectTeamList.forEach((e, j) => {
          let isCheck = this.checkItem(e) 
          this.$set(e, 'checked', isCheck)
        })
      }).catch(error => {
        const err = error.response
        console.log(err)
        alert( err.data.msgValue)
      })
    },
    getItemInfo(item) {
      this.selectTeam = item
      item.selected = this.checkPartItem(item)
      this.selectTeamInfo.deptId = this.selectTeam.childDeptId
      this.getTreeItem(this.selectTeamInfo)
    },
    getListInfo(item) {
      if(item.checked == 'N') {
         this.recieveList.push({
            stepNo: this.stepNo,
            stepSn: this.stepSn,
            deptId: item.deptId,
            deptNm: item.deptNm,
            emplNo: item.emplNo
         })
         item.checked = 'Y'
      } else {
        this.recieveList.forEach((e, i) => {
          if(e.emplNo == item.emplNo) {
            this.recieveList.splice(i, 1)
          }
        })
        item.checked = 'N'
      }
      this.checkPartList(this.treeviewData)
    },
    checkPartList (list) {
      list.forEach(e=> {
        e.selected = this.checkPartItem(e)
        if(e.children.length > 0) {
          this.checkPartList(e.children)
        }
      })
    },
    checkPartItem (item) {
      let isChecked = 'N' 
      if(this.recieveList == []) return 'N'
      this.recieveList.forEach((e, i) => {
        if(e.deptId == item.childDeptId) {
          isChecked = 'Y'
          // this.selectPartList.push(e.deptNm)
        }
      })
      return isChecked
    },
    checkItem (item) {
      let isChecked = 'N' 
      if(this.recieveList == []) return 'N'
      this.recieveList.forEach((e, i) => {
        if(e.emplNo == item.emplNo) {
          isChecked = 'Y'
        }
      })
      return isChecked
    },
    selectAll() {
      this.selectTeamList.forEach(e => {
        if(this.checkItem(e) == 'Y') {
          e.checked = 'Y'
        } else {
          e.checked = 'Y'
          this.recieveList.push({
            stepNo: this.stepNo,
            stepSn: this.stepSn,
            deptId: e.deptId,
            deptNm: e.deptNm,
            deptNm: e.emplNm,
            emplNo: e.emplNo
         })
        }
      })
      this.checkPartList(this.treeviewData)
    },
    sendReciever () {
      this.$emit('reciever', this.recieveList)
      this.$emit('close')
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
      &.treeSelector {
        overflow-y: auto;
        background-color: #454545;
        .treeView-footer {
          padding-top: 20px;
        }
        .list.level-4 {
          display: block;
        }
      }
      .tree-editor-modal {
        display: flex;
        background-color: #454545;
        height: 90%;
        > div {
          color:#fff;
          width: 100%;
          padding: 10px;
          margin: 0 5px;
          .treeView-wrapper.select-part {
            width: 100%;
            height: 85%;
            .treeview {
              height: 90%;
            }
            .level-0 {
              .treeitem:hover {
                background-color: #58666d;
              }
              .treeitem.active {
                background-color: #80b1ca;
                  .treeheader {
                      color: #525252;
                      font-weight: bold;
                      span {
                        display: inline-block;
                        padding-right: 5px;
                      }
                  }
                }
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
            height: 45px;
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
