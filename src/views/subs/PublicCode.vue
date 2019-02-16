<template lang="pug">
  div.PublicCode.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 공통코드 관리
        SearchComp(
          v-model="searchData"
          :isDateSearch="false",
          :isTextSearch="true")
      div.sub-content.column
        div.content.section.section-1
            DataList(
              v-model="publicCode.selected"
              :headers="publicCode.headers",
              :items="publicCode.publicCodeData",
              :isListNumber="publicCode.isListNumber",
              :itemKey="publicCode.itemkey"
            ).ui.table.celled.selectable
              <template slot="items" slot-scope="props">
                div.item.lr.listitem(:class="{active:props.selected}", @click="selectedItem(props)" )
                  .ld {{props.item.cmmnCd}}
                  .ld {{props.item.cmmnCdNm}}
                  .ld.center.aligned {{props.item.useYn}}
              </template>
        div.content.section.section-2
          DataTable(
              v-model="publicCodeDetail.selected"
              :headers="publicCodeDetail.headers",
              :items="publicCodeDetail.publicCodeDetailData",
              :isFooter="publicCodeDetail.isfooter",
              :isListNumber="publicCodeDetail.isListNumber",
              :isPagination="publicCodeDetail.isPagination",
              :page="publicCodeDetail.pageInfo"
            ).ui.table.celled.selectable
              <template slot="items" slot-scope="props">
                tr
                  td.center.aligned {{props.item.no}}
                  td {{props.item.date}}
                  td {{props.item.manager}}
                  td.center.aligned {{props.item.type}}
                  td {{props.item.title}}
                  td.ellipse {{props.item.location}}
                  td {{props.item.endtime}}
              </template>
      div.sub-footer
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import DataList from '@/components/DataList.vue'
import SearchComp from '@/components/SearchComp.vue'
import { publicCodeHeader, publicCodeDetailHeader } from '@/setting'
import PublicCodeApi from '@/api/PublicCode'

export default {
  name: 'public-code',
  data () {
    return {
      publicCode: {
        selected: [],
        headers: publicCodeHeader.headers,
        publicCodeData: [],
        isListNumber: false,
        itemkey: 'cmmnCd'
      },
      publicCodeDetail: {
        selected: [],
        headers: publicCodeDetailHeader.headers,
        publicCodeDetailData: [],
        isFooter: false,
        idPagination: false,
        isListNumber: false,
        pageInfo: {} 
      },
      searchData: {}
    }
  },
  components: {
    DataTable,
    DataList,
    SearchComp
  },
  created () {
    this.getCodeList()
    
  },
  methods: {
    getCodeList () {
      PublicCodeApi.getList().then(result => {
        console.log(result)
        this.publicCode.publicCodeData = result.data.cmmnCdList
      }).catch(error => {
        console.log(`${error}`)
      })
    },
    selectedItem(itemInfo) {
      this.publicCode.selected = []
      this.publicCode.selected.push(this.publicCode.publicCodeData[itemInfo.idx])
    }
  }
}
</script>

<style lang="less">
.PublicCode {
  .content.section.section-1 {
    width: 25% !important;
  }
  .ld {
    width: 60% !important;
  }
  .lh {
    width: 60% !important;
  }
}
</style>
