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
                    td.center.aligned {{props.item.useYn}}
                </template>
        div.content.section.section-2
          h3.title 표준방송 상세정보
          div.contant-wrapper
            div.section_1
              div.ui.form.tiny
                table.ui.table.celled
                  tbody
                    tr
                      td.center.aligned
                        span 방송제목
                      td
                        input(type="text", v-model="standardBroadDetail.brdcstTitle")
                        label
                    tr
                      td.center.aligned 
                        span 방송내용
                      td
                        check-text-count(
                          :formType="'textarea'",
                          :rownum='5',
                          :maxLength='500',
                          v-model="standardBroadDetail.brdcstContents")
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
                  button.ui.button.large.blue(@click="createBroadItem") 신규등록
                div.btn-group.left
                  button.ui.button.large.blue(@click="updateBroadItem") 저장
                  button.ui.button.large(@click="getBroadItem") 취소
          
      div.sub-footer
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import DataList from '@/components/DataList.vue'
import SearchComp from '@/components/SearchComp.vue'
import CheckTextCount from '@/components/CheckTextCount.vue'
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
      standardBroadDetail: {},
      searchData: {}
    }
  },
  components: {
    DataTable,
    DataList,
    SearchComp,
    CheckTextCount
  },
  created () {
    this.getBroadlist()
  },
  computed: {
    alarmYn () {
      return this.standardBroadDetail.useYn == 'Y'
    }
  },
  methods: {
    getBroadlist () {
      StandardBroadApi.getList()
      .then(result => {
        this.standardBroad.standardBroadData = result.data.stdBrdcstList
        this.standardBroad.selected[0] = this.standardBroad.standardBroadData[0]
        this.getBroadItem()
      })
      .catch(error => {
        console.log(error)
      })
    },
    getBroadItem () {
      const requestData = JSON.stringify({
        brdcstSn: this.standardBroad.selected[0].brdcstSn
      })
      StandardBroadApi.getDetail(requestData)
      .then(result => {
        this.standardBroadDetail = result.data
      })
      .catch(error => {
        console.log(error)
      })
    },
    updateBroadItem () {
      const requestData = JSON.stringify(this.standardBroadDetail)
      StandardBroadApi.updateDetail(requestData)
      .then(result => {
        console.log(result)
        this.getBroadlist()
      })
      .catch(error => {
        console.log(error)
      })
    },
    createBroadItem () {
      this.standardBroadDetail = {
          brdcstSn:null,
          brdcstTitle:'',
          brdcstContents:'',
          useYn:"N",
          cmmnCd1:'',
          inputParam1:'',
          userData1:'',
          cmmnCd2:'',
          inputParam2:'',
          userData2:'',
          cmmnCd3:'',
          inputParam3:'',
          userData3:'',
          cmmnCd4:'',
          inputParam4:'',
          userData4:'',
          cmmnCd5:'',
          inputParam5:'',
          userData5:'',
          vrifyYn:''
      }
    },
    selectedItem(itemInfo) {
      this.standardBroad.selected = []
      if (!itemInfo.selected) {
        this.standardBroad.selected.push(this.standardBroad.standardBroadData[itemInfo.idx])
        this.getBroadItem()
      }
    },
    toggleCheck () {
      this.standardBroadDetail.useYn = this.standardBroadDetail.useYn == 'Y' ? 'N' : 'Y'
    }
  }
}
</script>

<style lang="less">
.StandardBroad {
  .content.section.section-1 {
    width: 30% !important;
  }
  .ui.form td .fields {
    margin: 0;
  }
}
</style>
