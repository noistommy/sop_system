<template lang="pug">
  div.StandardSms.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 표준 문자 관리
        SearchComp(
          v-model="searchData"
          :isDateSearch="false",
          :isTextSearch="true")
      div.sub-content.column
        div.content.section.section-1
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
        div.content.section.section-2
          h3.title 표준문자 상세정보
          div.contant-wrapper
            div.section_1
              div.ui.form.tiny
                table.ui.table.celled
                  tbody
                    tr
                      td.center.aligned
                        span 문자제목
                      td
                        input(type="text")
                        label
                    tr
                      td.center.aligned 
                        span 문자내용
                      td
                        textarea(rows='3')
                        label
                    tr
                      td.center.aligned 
                        span 파라미터1
                      td
                        div.fields
                          div.field.six.wide
                            label
                            select.ui.dropdown
                          div.field.ten.wide
                            label
                            input(type="text", placeholder='EX.')
                    tr
                      td.center.aligned 
                        span 파라미터2
                      td
                        div.fields
                          div.field.six.wide
                            label
                            select.ui.dropdown
                          div.field.ten.wide
                            label
                            input(type="text", placeholder='EX.')
                    tr
                      td.center.aligned 
                        span 파라미터3
                      td
                        div.fields
                          div.field.six.wide
                            label
                            select.ui.dropdown
                          div.field.ten.wide
                            label
                            input(type="text", placeholder='EX.')
                    tr
                      td.center.aligned 
                        span 파라미터4
                      td
                        div.fields
                          div.field.six.wide
                            label
                            select.ui.dropdown
                          div.field.ten.wide
                            label
                            input(type="text", placeholder='EX.')
                    tr
                      td.center.aligned 
                        span 파라미터5
                      td
                        div.fields
                          div.field.six.wide
                            label
                            select.ui.dropdown
                          div.field.ten.wide
                            label
                            input(type="text", placeholder='EX.')
                    tr
                      td.center.aligned 
                        span 사용여부
                      td
                        div.ui.toggle.checkbox(@click="toggleCheck")
                          input(type="checkbox", :checked="alarmYn")
                          label 허용
            div.btnSet
                div.btn-wrap.right
                  button.ui.button.large.blue 신규등록
                div.btn-group.left
                  button.ui.button.large.blue 저장
                  button.ui.button.large 취소
          
      div.sub-footer
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import DataList from '@/components/DataList.vue'
import SearchComp from '@/components/SearchComp.vue'
import { standardSmsHeader } from '@/setting'
import StandardSmsApi from '@/api/StandardSMS'


export default {
  name: 'standard-sms',
  data () {
    return {
      standardSms: {
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
    width: 30% !important;
  }
  .ld,.lh {
    width: 80% !important;
  }
  .ui.form td .fields {
    margin: 0;
  }
 
}
</style>
