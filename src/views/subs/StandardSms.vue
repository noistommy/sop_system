<template lang="pug">
  div.StandardSms.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 표준 문자 관리
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
            h3.title 표준문자관리
            div.contant-wrapper
              DataTable(
                v-model="standardSms.selected"
                :headers="standardSms.headers",
                :items="standardSms.standardSmsData",
                :itemKey="standardSms.itemkey",
                :isFooter="standardSms.isfooter",
                :isPagination="standardSms.isPagination",
                :page="standardSms.pageInfo"
                :isListNumber="standardSms.isListNumber",
              ).ui.table.celled.selectable
                <template slot="items" slot-scope="props">
                  tr(:active="props.selected", @click="selectedItem(props)" )
                    td {{props.item.smsTitle}}
                    td {{props.item.useYn}}
                </template>
=======
            DataTable(
              v-model="selected"
              :headers="standardSms.headers",
              :items="standardSms.standardSmsData",
              :isFooter="standardSms.isfooter",
              :isListNumber="standardSms.isListNumber",
              :isPagination="standardSms.isPagination",
              :page="standardSms.pageInfo"
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
import { standardSmsHeader } from '@/setting'
<<<<<<< HEAD
import StandardSmsApi from '@/api/StandardSMS'
=======
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e


export default {
  name: 'standard-sms',
  data () {
    return {
      standardSms: {
<<<<<<< HEAD
        selected: [],
        headers: standardSmsHeader.headers,
        standardSmsData: [],
        isfooter: true,
        isPagination: true,
        isListNumber: false,
        itemkey: 'smsSn',
        pageInfo:{}
      },
      searchData: {}
=======
        headers: standardSmsHeader.headers,
        standardSmsData: [],
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
    this.getSmslist()
  },
  methods: {
    getSmslist () {
      StandardSmsApi.getList()
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

<style lang="less" >
.StandardSms {
  .content.section.section-1 {
    width: 35% !important;
  }
  .ld,.lh {
    width: 80% !important;
  }
 
}
</style>
