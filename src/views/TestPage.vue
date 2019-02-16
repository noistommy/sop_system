<template lang="pug">
  div.home
    div MAIN PAGE
      div.ui.grid
       
        div.six.wide.column
            div.ui.list
              div.item
                .content
                  div.ui.grid
                    .col.col-1.two.wide.column title
                    .col.col-2.three.wide.column title
                    .col.col-3.nine.wide.column title
              div.item
                .content
                  div.ui.grid
                    .col.col-1.two.wide.column title
                    .col.col-2.three.wide.column title
                    .col.col-3.nine.wide.column title
              div.item
                .content
                  div.ui.grid
                    .col.col-1.two.wide.column title
                    .col.col-2.three.wide.column title
                    .col.col-3.nine.wide.column title
                //- .extra
                //-   .ui.right.float.button extra
               
        div.six.wide.column
            div.ui.segment
<<<<<<< HEAD
              //- div.treeEdit(:class="{editable:isEdit}")
              //-   div.editor
              //-     div.title 상세정보 수정
              //-     div.insertForm
              //-       div.field
              //-         div.text-input
              //-           label 협력업체명
              //-           input(type="text", placehold="협력업체명")
              //-       div.field
              //-         div.text-input
              //-           label 협력업체명
              //-           input(type="text")
              //-       div.field
              //-         div.select
              //-           label 상위협력업체
              //-           select.ui.dropdown
                  //- div.field
                  //-   label 상위협력업체
                  //-   input(type="text")
                  //- div.field
                  //-   label 사용여부
                  //-   input(type="text")
              //- div.controlMenu.header
              //-     div(@click.stop="isEdit=!isEdit").textBtn 
              //-       i.icon.plus
              //-       span 신규
              div.treeView-wrapper
                div.treeView.list.level-0
                  TreeView( v-for="item in treeviewData" :treeItem="item", :isActive="true", :level="1")
=======
              div.treeView.list.level-0
                TreeView( v-for="item in treeviewData" :treeItem="item", :isActive="true", :level="1")
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e

        div.eight.wide.column
          div.table-wrapper
            data-table(
<<<<<<< HEAD
              v-model="selected",
              :items="testData",
              :itemKey="itemkey"
=======
              v-model="selected"
              :items="testData"
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
            ).ui.table.selectable
              <template slot="items" slot-scope="props">
                tr(:active="props.selected", @click="selectedItems(props)" )
                  td
                    div.ui.checkbox
<<<<<<< HEAD
                      input(type="checkbox", :checked="props.selected")
=======
                      input(type="checkbox", name="selected", :checked="props.selected")
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
                      label
                  td.center.aligned {{props.item.name}}
                  td.center.aligned {{props.item.username}}
                  td.center.aligned {{props.item.email}}
                  td.center.aligned.ellipse {{props.item.website}}
                  td.center.aligned {{props.item.phone}}
              </template>
<<<<<<< HEAD
        div.ten.wide.column
          //- DataList(v-model="selected", :headers="headers", :isListNumber="isListNumber", :items="testData")
          //-   <template slot="items" slot-scope="props">
          //-     div.item.lr.listitem(:active="props.selected", @click="selectedItems(props)" )
          //-       .ld.center.aligned(v-if="isListNumber")
          //-         div.ui.checkbox
          //-           input(type="checkbox", name="selected", :checked="props.selected")
          //-           label
          //-       .ld.center.aligned {{props.item.name}}
          //-       .ld.center.aligned {{props.item.username}}
          //-       .ld.center.aligned {{props.item.email}}
          //-       .ld.center.aligned.ellipse {{props.item.website}}
          //-       .ld.center.aligned {{props.item.phone}}
          //-   </template>
          //- div.tablelist
          //-   div.lhead.ui.relaxed.divided.list
          //-     div.item.tablelistitem.th
          //-       div.cell.center 인사
          //-       div.cell.center 누가
          //-       div.cell.center 뭐
          //-   div.lbody.ui.relaxed.divided.list
          //-     div.item( v-for="item in 10").tablelistitem
          //-       div.cell 안녕하세요
          //-       div.cell 저는
          //-       div.cell 사람입니다
=======
        div.six.wide.column
          div.tablelist
            div.lhead.ui.relaxed.divided.list
              div.item.tablelistitem.th
                div.cell.center 인사
                div.cell.center 누가
                div.cell.center 뭐
            div.lbody.ui.relaxed.divided.list
              div.item( v-for="item in 10").tablelistitem
                div.cell 안녕하세요
                div.cell 저는
                div.cell 사람입니다
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
        div.six.wide.column
          button(@click.stop="test").ui.button TEST
          button(@click.stop="test2").ui.button TEST2
          button(@click="getAsync").ui.button {{getData}}
          button(@click="secondgetAsync1").ui.button {{getData1}}
          button(@click="setModalData(modalData)").ui.button MODAL
          button(@click="show").ui.button VUEJSMODAL
          button(@click="showDialog").ui.button DIALOG
          router-link(:to="{ name: 'notice-manage'}" ).ui.button NOTICE
          Pagination( :totalCount="pageInfo.totalCount",
            :currentPage="pageInfo.currentPage",
            :recordCountPerPage="pageInfo.recordCountPerPage",
            :startRow="pageInfo.startRow",
            :endRow="pageInfo.endRow",
            @currpage="setCurrentPage" )

    

    v-date-picker(mode='range', v-model='selectedDate')
      div.ui.left.icon.input(:type='inputState.type', slot-scope='props')
        input(type='text', 
        :value='props.inputValue', 
        :placeholder='inputState.message',
        @input='props.updateValue($event.target.value, { formatInput: false, hidePopover: false })',
        @change='props.updateValue($event.target.value, { formatInput: true, hidePopover: false })', 
        expanded)
        <i class="calendar alternate outline icon"></i>
    
<<<<<<< HEAD
    //- modals-container(name='testmodal')
    //- v-dialog
=======
    modals-container
    v-dialog
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
</template>

<script>
// import { createNamespacedHelpers } from 'vuex'
import { mapActions, mapGetters } from 'vuex'
import DataTable from '@/components/DataTable.vue'
<<<<<<< HEAD
import DataList from '@/components/DataList.vue'
=======
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
import Pagination from '@/components/Pagination.vue'
import Modal from '@/components/Modal.vue'
import TreeView from '@/components/TreeView.vue'
import SearchComp from '@/components/SearchComp.vue'
import About from '@/views/About.vue'
import axios from 'axios'

import TestApi from '@/api/Test'

// const { mapGetters } = createNamespacedHelpers('getData')

export default {
  name: 'home',
  components: {
    DataTable,
<<<<<<< HEAD
    DataList,
=======
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
    Pagination,
    Modal,
    TreeView,
    SearchComp,
    About
  },
  data () {
    return {
      selectedDateStart: new Date(2019, 0, 27),
      selectedDateEnd: new Date(2019, 0, 30),
      selectedDate: {
        start: new Date(2019, 0, 23),
        end: new Date(2019, 0, 30)  
      },
      // selectedValue: null,
      childLevel : 0,
      modalData: {
        type: '',
        title: '테스트 제목',
        isVisilbe: true
      },
      pageInfo: {
        totalCount: 301,
        currentPage: 1,
        recordCountPerPage: 10,
        startRow: 0,
        endRow: 10
      },
<<<<<<< HEAD
      isListNumber: false,
      selected: [],
      itemkey: 'id',
      // selected: [true, true, true, false, false, false],
      headers: [
        { text: '이름', align: 'center', value: 'emplNm', size: '1' },
        { text: '직급', align: 'center', value: 'ofcpsCdNm', size: '1' },
        { text: '직위', align: 'center', value: 'clsfCdNm', size: '1' },
        { text: '부서', align: 'center', value: 'deptNm', size: '1' },
        { text: '휴대전화번호', align: 'center', value: 'moblphonNo', size: '2' }
=======
      selected: [],
      // selected: [true, true, true, false, false, false],
      headers: [
        { text: '이름', align: 'center', value: 'emplNm', size: '' },
        { text: '직급', align: 'center', value: 'ofcpsCdNm', size: '' },
        { text: '직위', align: 'center', value: 'clsfCdNm', size: '' },
        { text: '부서', align: 'center', value: 'deptNm', size: '' },
        { text: '휴대전화번호', align: 'center', value: 'moblphonNo', size: 'four' }
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
      ],
      testData: [
      ],
      treeviewData: [
      ],
<<<<<<< HEAD
      titleText: 'Modal title',
      isEdit: false
=======
      titleText: 'Modal title'
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
    }
  },
  created () {
    console.log(this.$store.getters.getDataTest)
<<<<<<< HEAD
    this.test()
=======
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
  },
  mounted() {
    $('.ui.dropdown').dropdown();
    $('.ui.checkbox').checkbox();
  },
  computed: {
    ...mapGetters([
      'getData',
      'getData1'
    ]),
    inputState() {
      if (!this.selectedValue) {
        return {
          type: 'is-danger',
          message: 'Date required.'
        }
      }
      return {
        type: 'is-primary',
        message: ''
      }
    }
  },
    updated () {
<<<<<<< HEAD
=======
    console.log(this)
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
  },
  methods: {
    ...mapActions('getData', [
      'getAsync',
      'getAsync1'
    ]),
    ...mapActions('getDataTest', {
      secondgetAsync: 'getAsync',
      secondgetAsync1: 'getAsync'

    }),
    ...mapActions([
      'setModalData'
    ]),
    activeSelected (index) {
      console.log(index)
      this.selected[index] = !this.selected[index]
      console.log(this.selected[index])
    },
    test () {
      axios.get('https://jsonplaceholder.typicode.com/users', {
      })
        .then(res => {
          console.log(res)
          this.testData = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
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
    setCurrentPage (page) {
      console.log(page)
      this.pageInfo.currentpage = page
    },
    show() {
      this.$modal.show(About, {
        title: this.titleText
      })
    },
    showDialog() {
      this.$modal.show('dialog', {
        title: 'ALERT',
        text: 'Can you build Dialog Component?',
        buttons: [
          {
            title: '확인',
            default: true,
            handler: () => {
              alert('check')
              this.$modal.hide('dialog')
              }
          },
          {
            title: '취소'
          }
        ]
      })
    },
    selectedItems(itemInfo) {
<<<<<<< HEAD
      const id = this.itemkey
      console.log(itemInfo.item[id])
      if(itemInfo.selected) {
        this.selected.forEach((e, i) => {
          if(e[id] == itemInfo.item[id]) {
=======
      console.log(itemInfo)
      if(itemInfo.selected) {
        this.selected.forEach((e, i) => {
          if(e.id == itemInfo.item.id) {
            console.log(e.id)
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
            this.selected.splice(i, 1)
          }
        })
      } else {
        this.selected.push(this.testData[itemInfo.idx])
      }
      
    },
    selectedItem(itemInfo) {
      this.selected = []
      if(!itemInfo.selected) {
        this.selected.push(this.testData[itemInfo.idx])
        
      }
    }
  }
}
</script>

<style lang="less">
.border-radius (@tl: 0px, @bl: 0px, @tr: 0px, @br: 0px) {
  border-top-left-radius: @tl;
  border-bottom-left-radius: @bl;
  border-top-right-radius: @tr;
  border-bottom-right-radius: @br;
}

  .tablelist {
    width: 100%;
    .lhead.list,
    .lbody.list {
      // box-shadow: inset 0 0px 50px -20px rgba(0, 0, 0, .35);
      margin: 0;
      border: 1px solid rgba(34,36,38,.15);
      .border-radius(0, 5px, 0, 5px);
      .tablelistitem.item {
        padding: 0 !important;
        display: flex;
        .cell {
          border-right: 1px solid rgba(34,36,38,.15);
          padding: .9rem 1.2rem;
          width: 20%;
          &:last-child {
            border:0;
            flex-grow: 1;

          }
          &.center {text-align: center;}
          &.left {text-align: left;}
          &.right {text-align: right;}
        }
        &.th {
          background-color: #f9fafb;
          font-weight: bold;
        }
      }
    }
    .lhead.list {
      .border-radius(5px, 0, 5px, 0);
      border-bottom: 0
    }
    .lbody.list {
      .border-radius(0, 5px, 0, 5px);
      overflow-y: auto;
      max-height: 400px;
    }
    ::-webkit-scrollbar {
      width:0;
      position: absolute;
      top:0;
      right: 0;
    }
  }
  .testdatepicker {
    position: relative;
    width: 45%;
    display: flex;
    > div {
      padding-right: 15px !important;
    }
    .button {
      position: absolute;
      right: 0;
    }
  }
<<<<<<< HEAD
  

  .section {
  position:relative;
  .controlMenu {
    margin-bottom: 5px;
    .textBtn {
      cursor: pointer;
      padding: .3em 1.2em;
      float:right;
      display: inline-block;
      color: #fff;
      background-color: #454545;
      &:hover {
        background-color: #565656;
      }
    }
  }
}
.treeView-wrapper {
  max-height: auto;
  overflow-y: auto;
  height: 100%;
}
.treeEdit {
  // display: none;
  position: absolute;
  top:0;
  left: -100%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .8);
  color: #efefef;
  z-index: 999;
  opacity: 0;
  padding: 20px;
  &.editable {
    // display: block;
    left: 0;
    opacity: 1;
  }
  .editor {
    color: #fff;
    .title {
      margin-bottom:10px;
      font-size: 1.2rem;
    }
    .insertForm {
      padding:15px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 5px;
      .field {
        padding-bottom: 15px;
        .text-input {
          border-bottom: 1px solid rgba(255, 255, 255, 0.4);
        }
          label {
            display: block;
            font-size: .9rem;
          }
          input {
            display: block;
            background-color: rgba(255, 255, 255, 0);
            box-shadow: none;
            border-style: none;
            min-height: 32px;
            width: 100%;
            color: #fff;
            vertical-align: top;
            padding: .67em 1em;
            outline: 0;
            font-size: 1em;
            line-height: 1.2em
          }
      }
    }
  }
}
=======
  tr[active] {
    background-color: #aaa;
  }


>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
  // .table-wrapper {
  //   width:100%;
  //   height: 400px;
  //   overflow-y: auto;
  //   // border:  1.2px solid rgba(143, 143, 143, 0.15);
  //   margin: 0; 
  //   padding: 0;
  // }
  // .tableset th{
  //   min-width: 150px;
  //   &:last-child {
  //     min-width: 200px;
  //   }
  // }
  // table.datatable {
  //   width: 100%;
  //   tbody {
  //     height: 300px;
  //     overflow-y: auto;
  //     width: 100%;
  //   }
  //   thead.tbody,tr,td,th {
  //     display: block;
  //   }
  //   tbody {
  //     td {
  //       float:left;
  //     }
  //   }
  //   thead {
  //     tr{
  //       th {
  //         float:left;
  //       }
  //     }
  //   }
  // }
<<<<<<< HEAD
.ld, .lh {
}
=======

>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
</style>
