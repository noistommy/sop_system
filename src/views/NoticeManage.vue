<template lang="pug">
  div.historyManage.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 공지사항
      div.sub-content
        div.content
          DataTable(
            v-model="selected"
            :headers="headers",
            :items="sopNoticData",
            :itemKey="itemkey"
            :isFooter="isfooter",
            :isPagination="isPagination",
            :page="pageInfo"
            :isListNumber="isListNumber",
          ).ui.table.celled
            <template slot="items" slot-scope="props">
              tr(:active="props.selected", @click="selectedItem(props)" )
                td.center.aligned {{props.idx+1}}
                td.ellipse {{props.item.noticeTitle}}
                td.center.aligned {{props.item.ntceDt}}
                td.center.aligned {{props.item.frstRegNm}}
                td.center.aligned {{props.item.frstRegDt}}
                td.center.aligned {{props.item.hit}}
              tr.extended(v-if="isExtended", :class="{active:props.selected}", @click.prevent)
                td(:colspan="props.colspan")
                  div.notice-wrapper
                    div.notice-content {{props.item.noticeContents}}
                      
            </template>
        div.footer
          div.btnSet
            div.btn-group.left
              button.ui.button.large(@click="editItem") 수정
              button.ui.button.large(@click="deleteNoticeItem") 삭제
            div.btn-wrap.right
              button.ui.button.large.blue(@click="newItem") 신규등록
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import InsertNotice from '@/components/InsertNotice.vue'
import { noticeTableHeader } from '@/setting'
import NoticeApi from '@/api/Notice'

export default {
  name: 'notice-manage',
  components: {
    DataTable
  },
  data () {
    return {
      selected: [],
      headers: noticeTableHeader.headers,
      sopNoticData: [],
      isfooter: true,
      isPagination: true,
      isListNumber: true,
      pageInfo: {},
      itemkey: 'noticeSn',
      isExtended: true
    }
  },
  created () {
    this.getNoticeList()
  },
  methods: {
    getNoticeList() {
      NoticeApi.getList().then(result => {
        this.sopNoticData = result.data.noticeList
        result.data.param.totalCount = result.data.totCnt
        this.pageInfo = result.data.param
      })
      .catch(error => {
        console.log(error)
      })
    },
    deleteNoticeItem() {
      const requestData = JSON.stringify({ noticeSn: this.selected[0].noticeSn })
      NoticeApi.deleteItem(requestData).then(result => {
        console.log('success')
        location.reload()
      })
      .catch(error => {
        console.log(error)
      })
    },
    selectedItem(itemInfo) {
      this.selected = []
      if(!itemInfo.selected) {
        this.selected.push(this.sopNoticData[itemInfo.idx])
        
      }
    },
    editItem() {
      this.$modal.show(InsertNotice, {
        type: 'edit',
        title: '수정하기',
        noticeId: this.selected[0].noticeId
      },{
        height: "auto"
      })
    },
    newItem() {
      this.$modal.show(InsertNotice, {
        type: 'new',
        title: '작성하기',
        noticeId: ''
      },{
        height: "auto"
      })
    }
  }
}
</script>

<style lang="less">
.transition (@type: all, @duration: 250ms, @Function: ease-out) {
  -webkit-transition: @arguments;
  -moz-transition: @arguments;
  -ms-transition: @arguments;
  -o-transition: @arguments;
  transition: @arguments;
}

.extended{
  background-color: rgba(173, 173, 173, 0.01);
  td {
    border-top: 0 !important;
    border-bottom: 0 !important;
    padding: 0 !important;
  }
  .notice-wrapper {
    .transition();
    height: 0;
    .notice-content {
      padding: 1rem 5rem;
      max-height: 150px;
      overflow-y: auto;
    }
  }
  &.active {
    .notice-wrapper {
      .transition();
      height: 150px;
    }
  }
}

</style>
