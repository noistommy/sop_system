<template lang="pug">
  div.PublicCode.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 공통코드 관리
        SearchComp(
<<<<<<< HEAD
          v-model="searchData"
=======
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
          :isDateSearch="false",
          :isTextSearch="true")
      div.sub-content.column
        div.content.section.section-1
<<<<<<< HEAD
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
=======
            DataTable(
              v-model="selected"
              :headers="publicCode.headers",
              :items="publicCode.publicCodeData",
              :isFooter="publicCode.isfooter",
              :isListNumber="publicCode.isListNumber",
              :isPagination="publicCode.isPagination",
              :page="publicCode.pageInfo"
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
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
<<<<<<< HEAD
=======
        div.content.section.section-2
          DataTable(
              v-model="selected"
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
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
      div.sub-footer
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import DataList from '@/components/DataList.vue'
import SearchComp from '@/components/SearchComp.vue'
import { publicCodeHeader, publicCodeDetailHeader } from '@/setting'
<<<<<<< HEAD
import PublicCodeApi from '@/api/PublicCode'
=======
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e

export default {
  name: 'public-code',
  data () {
    return {
      publicCode: {
<<<<<<< HEAD
        selected: [],
        headers: publicCodeHeader.headers,
        publicCodeData: [],
        isListNumber: false,
        itemkey: 'cmmnCd'
      },
      publicCodeDetail: {
        selected: [],
=======
        headers: publicCodeHeader.headers,
        publicCodeData: [],
        isFooter: false,
        idPagination: false,
        isListNumber: false,
        pageInfo: {} 
      },
      publicCodeDetail: {
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
        headers: publicCodeDetailHeader.headers,
        publicCodeDetailData: [],
        isFooter: false,
        idPagination: false,
        isListNumber: false,
        pageInfo: {} 
      },
<<<<<<< HEAD
      searchData: {}
=======
      selected: []
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
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
