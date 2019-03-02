<template lang="pug">
  div.modal
    div.modal-header {{title}}
    div.modal-content.treeEditor
      div.multi-select-editor
        div.multi-select-wrapper
          div.ui.list 
            div.item 전체
            div.item(v-for="local in locationData") {{local.displayNm}}
              div.floors
                div.ui.horizontal.list.celled
                  div.item(v-for="floor in local.buldFloor") {{floor.floorNm}}
    div.modal-close(@click="$emit('close')")
        div.close X
</template>

<script>
import FireBrigadeApi from '@/api/FireBrigade'
import TreeView from '@/components/TreeView'
import { codeGenerator } from '@/util'

export default {
  name: 'treeview-modal',
  components: {
    TreeView
  },
  props: {
    title: String,
    text: String,
    data: Array,
    value: Object,
    isActive: Boolean
  },
  data () {
    return {
      locationData: [
        {
          buldId:	0,
          buldNm:	'BUILDING1',
          displayNm: 'BUILDING1',
          buldFloor:	[
            {floorNm: '1F'},
            {floorNm: '2F'},
            {floorNm: '3F'},
            {floorNm: '4F'}
          ]
          
        },
        {
          buldId:	1,
          buldNm:	'BUILDING2',
          displayNm: 'BUILDING2',
          buldFloor:	[
            {floorNm: '1F'},
            {floorNm: '2F'}
          ]
          
        },
        {
          buldId:	2,
          buldNm:	'BUILDING3',
          displayNm: 'BUILDING3',
          buldFloor:	[
            {floorNm: '1F'},
            {floorNm: '2F'},
            {floorNm: '3F'},
            {floorNm: '4F'},
            {floorNm: '1F'},
            {floorNm: '2F'},
            {floorNm: '3F'},
            {floorNm: '4F'}
          ]
          
        },
      ],
      selectTeam: {},
      activeItem: true
    }
  },
  created () {
    this.getTreeList()
  },
  methods: {
    getTreeList () {
      FireBrigadeApi.getTreeList()
      .then(result => {
        console.log(result)
        this.treeviewData = result.data.slfdfnFbrdTrList
      })
      .catch(error => {
        this.$emit('close')
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })  
    },
    createTreeItem () {
      const requestData = JSON.stringify(this.createTeam)
      FireBrigadeApi.createItem(requestData)
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        this.$emit('close')
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })  
    },
    getItemInfo(item) {
      if(this.type == 'new') {
        this.createTeam.upperSlfdfnFbrdNm = item.childSlfdfnFbrdNm
      }else {
        this.editTeam.upperSlfdfnFbrdNm = item.childSlfdfnFbrdNm
      }
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
        height: 100%;
        .treeView-wrapper {
          width: 50%;
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
