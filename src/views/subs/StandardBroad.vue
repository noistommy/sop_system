<template lang="pug">
  div.StandardBroad.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 표준 방송 관리
        SearchComp(
          v-model="searchData"
          :isDateSearch="false",
          :isTextSearch="true")
      div.sub-content.column
        div.content.section.section-1
            h3.title 표준방송관리
            div.contant-wrapper
              DataTable(
                v-model="standardBroad.selected"
                :headers="standardBroad.headers",
                :items="standardBroad.standardBroadData",
                :itemKey="standardBroad.itemkey",
                :isFooter="standardBroad.isfooter",
                :isPagination="standardBroad.isPagination",
                :page="standardBroad.pageInfo"
                :isListNumber="standardBroad.isListNumber",
              ).ui.table.celled.selectable
                <template slot="items" slot-scope="props">
                  tr(:active="props.selected", @click="selectedItem(props)" )
                    td {{props.item.brdcstTitle}}
                    td {{props.item.useYn}}
                </template>
        div.content.section.section-2
      div.sub-footer
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import DataList from '@/components/DataList.vue'
import SearchComp from '@/components/SearchComp.vue'
import { standardBroadHeader } from '@/setting'
import StandardBroadApi from '@/api/StandardBroad'


export default {
  name: 'standard-broad',
  data () {
    return {
      standardBroad: {
        selected: [],
        headers: standardBroadHeader.headers,
        standardBroadData: [],
        isfooter: true,
        isPagination: true,
        isListNumber: false,
        itemkey: 'brdcstSn',
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
    this.getBroadlist()
  },
  methods: {
    getBroadlist () {
      StandardBroadApi.getList()
      .then(result => {
        this.standardSms.standardSmsData = result.data.stdSmsList
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="less">
.StandardBroad {
  .content.section.section-1 {
    width: 35% !important;
  }
}
</style>
