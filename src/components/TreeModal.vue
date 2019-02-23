<template lang="pug">
  div.modal
    div.modal-header {{title}}
    div.modal-content.treeview
      div.treeView-wrapper
        div.treeView.list.level-0
          TreeView(
            v-model= "selectTeam",
            @select="getItemInfo",
            v-for="item in treeviewData",
            :treeItem="item",
            :isActive="activeItem"
            :level="1")
    div.treeView-footer
      button.ui.button.basic.olive {{selectTeam.childDeptNm}} 선택
      div.selectedName 
    div.modal-close(@click="$emit('close')")
        div.close X
</template>

<script>
import MemberApi from '@/api/Member'
import TreeView from '@/components/TreeView'

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

      treeviewData: this.data,
      selectTeam: {},
      activeItem: true
    }
  },
  created () {
    this.getTreeList()
  },
  methods: {
    getTreeList () {
      // const request = JSON.stringify(this.requestData)
      MemberApi.getTree().then(result => {
        console.log(result.data)
        this.treeviewData = result.data.trOrgnList
      }).catch(error => {
        console.log(error)
      })
    },
    getItemInfo(item) {
      this.selectTeam = item
      this.$emit('selectedTeam', this.selectTeam)
    }
  } 
}
</script>

<style lang="less">
.modal {
    background-color: #fff;
    // border: 1px solid #5d5e68;
    // border-radius: 5px;
    // box-shadow: 0 0 10px rgba(0, 0, 0, .5);
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
      &.treeview {
        overflow-y: auto;
        // height: 80%;
        background-color: #454545;
        .treeView-footer {
          padding-top: 20px;
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
