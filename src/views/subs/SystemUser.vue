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
            :isFooter="systemUser.isfooter",
            :isListNumber="systemUser.isListNumber",
            :isPagination="systemUser.isPagination",
            :page="systemUser.pageInfo"
          ).ui.table.celled.selectable
            <template slot="items" slot-scope="props">
              tr
                td(v-if="systemUser.isListNumber").center.aligned {{props.idx+1}}
                td {{props.item.oprtrId}}
                td {{props.item.oprtrNm}}
                td {{props.item.clsfCdNm}}
                td {{props.item.ofcpsCdNm}}
                td.ellipse {{props.item.moblphonNo}}
                td {{props.item.oprtrFgCdNm}}
            </template>
        div.footer
</template>

<script>
import DataTable from '@/components/DataTable.vue'
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
        isFooter: false,
        idPagination: false,
        isListNumber: true,
        pageInfo: {} 
      },
    }
  },
  components: {
    DataTable,
    SearchComp
  },
  created() {
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
  }
}
</script>

<style lang="less" scoped>

</style>
