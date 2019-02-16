<template lang="pug">
  div.SystemUser.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 운영자 관리
      div.sub-content
        div.content
          DataTable(
            v-model="selected"
            :headers="systemUser.headers",
            :items="systemUser.systemUserData",
            :itemKey="systemUser.itemkey"
            :isFooter="systemUser.isfooter",
            :isSelect="systemUser.isSelect",
            :isListNumber="systemUser.isListNumber",
            :isPagination="systemUser.isPagination",
            :page="systemUser.pageInfo"
          ).ui.table.celled.selectable
            <template slot="items" slot-scope="props">
              tr(:active="props.selected", @click="selectedItem(props)" )
                td.center.aligned
                  div.ui.checkbox
                    input(type="radio", :checked="props.selected")
                    label
                td(v-if="systemUser.isListNumber").center.aligned {{props.idx+1}}
                td.center.aligned {{props.item.oprtrId}}
                td {{props.item.oprtrNm}}
                td.center.aligned {{props.item.clsfCdNm}}
                td.center.aligned {{props.item.ofcpsCdNm}}
                td {{props.item.moblphonNo}}
                td.center.aligned {{props.item.oprtrFgCdNm}}
            </template>
        div.footer
          div.btnSet
            div.btn-group.left
              button.ui.button.large 편집
              button.ui.button.large 삭제
            div.btn-wrap.right
              button.ui.button.large.blue 신규등록
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import DataList from '@/components/DataList.vue'
import SearchComp from '@/components/SearchComp.vue'
import { systemUserHeader } from '@/setting'
import SystemUser from '@/api/Users'

export default {
  name: 'system-user',
  data () {
    return {
      selected: [],
      systemUser: {
        headers: systemUserHeader.headers,
        systemUserData: [],
        isFooter: true,
        isPagination: true,
        isListNumber: true,
        isSelect: true,
        itemkey: 'oprtrId',
        pageInfo: {} 
      },
    }
  },
  components: {
    DataTable,
    DataList,
    SearchComp
  },
  created() {
    this.getUsersList ()
  },
  methods: {
    getUsersList () {
      SystemUser.getList().then(result => {
        console.log(result)
        this.systemUser.systemUserData=result.data.oprtrInfoList
        if(this.systemUser.length >= result.data.param.pagePerCnt) {
          this.systemUser.isPagination = false
        } else {
          this.systemUser.pageInfo=result.data.param
          this.systemUser.pageInfo.totalPage = result.data.totalCount
        }
      }).catch(err => {
        console.log(err)
      })
    },
    selectedItem(itemInfo) {
      this.selected = []
      if(!itemInfo.selected) {
        this.selected.push(this.systemUser.systemUserData[itemInfo.idx])
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
