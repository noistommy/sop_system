<template lang="pug">
  div.StandardBroad.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 표준 방송 관리
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
=======
            DataTable(
              v-model="selected"
              :headers="standardBroad.headers",
              :items="standardBroad.standardBroadyData",
              :isFooter="standardBroad.isfooter",
              :isListNumber="standardBroad.isListNumber",
              :isPagination="standardBroad.isPagination",
              :page="standardBroad.pageInfo"
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
        div.content.section.section-2
      div.sub-footer
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import DataList from '@/components/DataList.vue'
import SearchComp from '@/components/SearchComp.vue'
import { standardBroadHeader } from '@/setting'
<<<<<<< HEAD
import StandardBroadApi from '@/api/StandardBroad'
=======
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e


export default {
  name: 'standard-broad',
  data () {
    return {
      standardBroad: {
<<<<<<< HEAD
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
=======
        headers: standardBroadHeader.headers,
        standardBroadData: [],
        isFooter: false,
        idPagination: false,
        isListNumber: false,
        pageInfo: {} 
      },
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
