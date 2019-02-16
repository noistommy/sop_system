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
<<<<<<< HEAD
            :itemKey="systemUser.itemkey"
            :isFooter="systemUser.isfooter",
            :isSelect="systemUser.isSelect",
=======
            :isFooter="systemUser.isfooter",
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
            :isListNumber="systemUser.isListNumber",
            :isPagination="systemUser.isPagination",
            :page="systemUser.pageInfo"
          ).ui.table.celled.selectable
            <template slot="items" slot-scope="props">
<<<<<<< HEAD
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
=======
              tr
                td(v-if="systemUser.isListNumber").center.aligned {{props.idx+1}}
                td {{props.item.oprtrId}}
                td {{props.item.oprtrNm}}
                td {{props.item.clsfCdNm}}
                td {{props.item.ofcpsCdNm}}
                td.ellipse {{props.item.moblphonNo}}
                td {{props.item.oprtrFgCdNm}}
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
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
<<<<<<< HEAD
        isFooter: true,
        isPagination: true,
        isListNumber: true,
        isSelect: true,
        itemkey: 'oprtrId',
=======
        isFooter: false,
        idPagination: false,
        isListNumber: true,
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
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
<<<<<<< HEAD
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
=======
    SystemUser.getUsersList().then(result => {
      console.log(result)
      this.systemUser.systemUserData=result.oprtrInfoList
      if(this.systemUser.length >= result.param.pagePerCnt) {
        this.systemUser.isPagination = false
      } else {
        this.systemUser.pageInfo=result.param
        this.systemUser.pageInfo.totalPage = result.totalCount
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    // getUserList() {

    // }
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
  }
}
</script>

<style lang="less" scoped>

</style>
