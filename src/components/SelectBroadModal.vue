<template lang="pug">
  div.StandardBroadModal.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 표준 방송 선택
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
                          :formType="formType",
                          :rownum='3',
                          :maxLength='500',
                          v-model="standardBroadDetail.brdcstContents",
                          @input="returnText")
                    tr
                      td.center.aligned 
                        span 파라미터1
                      td.visibleTd
                        div.fields
                          div.field.six.wide
                            label
                            select(:id="1", v-model="standardBroadDetail.cmmnCd1", @change="insertValueName")
                              option(disabled, value="")
                              option(v-for="param in paramList", :value="param.cmmnCd", :key="param.cmmnCd") {{param.cmmnCdNm}}
                          div.field.ten.wide
                            label
                            input(type="text", placeholder='EX.', v-model="standardBroadDetail.userData1")
                    tr
                      td.center.aligned 
                        span 파라미터2
                      td.visibleTd
                        div.fields
                          div.field.six.wide
                            label
                            select(:id="2",v-model="standardBroadDetail.cmmnCd2", @change="insertValueName")
                              option(v-for="param in paramList", :value="param.cmmnCd", :key="param.cmmnCd") {{param.cmmnCdNm}}
                          div.field.ten.wide
                            label
                            input(type="text", placeholder='EX.', v-model="standardBroadDetail.userData2")
                    tr
                      td.center.aligned 
                        span 파라미터3
                      td.visibleTd
                        div.fields
                          div.field.six.wide
                            label
                            select(:id="3",v-model="standardBroadDetail.cmmnCd3", @change="insertValueName")
                              option(v-for="param in paramList", :value="param.cmmnCd", :key="param.cmmnCd") {{param.cmmnCdNm}}
                          div.field.ten.wide
                            label
                            input(type="text", placeholder='EX.', v-model="standardBroadDetail.userData3")
                    tr
                      td.center.aligned 
                        span 파라미터4
                      td.visibleTd
                        div.fields
                          div.field.six.wide
                            label
                            select(:id="4",v-model="standardBroadDetail.cmmnCd4", @change="insertValueName")
                              option(v-for="param in paramList", :value="param.cmmnCd", :key="param.cmmnCd") {{param.cmmnCdNm}}
                          div.field.ten.wide
                            label
                            input(type="text", placeholder='EX.', v-model="standardBroadDetail.userData4")
                    tr
                      td.center.aligned 
                        span 파라미터5
                      td.visibleTd
                        div.fields
                          div.field.six.wide
                            label
                            select(:id="5",v-model="standardBroadDetail.cmmnCd5", @change="insertValueName")
                              option(v-for="param in paramList", :value="param.cmmnCd", :key="param.cmmnCd") {{param.cmmnCdNm}}
                          div.field.ten.wide
                            label
                            input(type="text", placeholder='EX.', v-model="standardBroadDetail.userData5")
                    tr
                      td.center.aligned 
                        span 사용여부
                      td
                        div.ui.toggle.checkbox
                          input(type="checkbox",
                          true-value="Y",
                          false-value="N",
                          v-model="standardBroadDetail.useYn")
                          label 허용
            div.btnSet
                div.btn-wrap.right
                div.btn-group.left
                  button.ui.button.blue(@click="getSelectData") 선택
                  button.ui.button(@click="$emit('close')") 취소
          
          
      div.sub-footer
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import DataList from '@/components/DataList.vue'
import DataForm from '@/components/DataForm.vue'
import CheckTextCount from '@/components/CheckTextCount.vue'
import SearchComp from '@/components/SearchComp.vue'
import { standardBroadHeader } from '@/setting'
import StandardBroadApi from '@/api/StandardBroad'
import PublicCodeApi from '@/api/PublicCode'
import CheckMediaModal from '@/components/CheckMediaModal.vue'
import { codeGenerator } from '@/util'
import { setTimeout } from 'timers';


export default {
  name: 'standard-broad-modal',
  props: {
    title: String,
    data: Object
  },
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
        pageInfo:{}
      },
      standardBroadDetail: {
      },
      newBroadDetail: {},
      searchData: {},
      paramList: [],
      formType: 'textarea',
      textArea:'S0800100'
    }
  },
  components: {
    DataTable,
    DataList,
    SearchComp,
    DataForm,
    CheckTextCount,
  },
  created () {
    this.getCodeList('S080')
    this.getBroadlist()
  },
  mounted () {
    $('.ui.dropdown').dropdown('restore defaults')
  },
  updated () {
   
  },
  computed: {
    alarmYn () {
      return this.standardBroadDetail.useYn == 'Y'
    }
  },
  methods: {
    getBroadlist () {
      const requestData = JSON.stringify(this.searchData)
      StandardBroadApi.getList(requestData)
      .then(result => {
        console.log('broad', result.data)
        this.standardBroad.standardBroadData = result.data.stdBrdcstList
        this.standardBroad.selected[0] = this.standardBroad.standardBroadData[0]
        this.getBroadItem()
      })
      .catch(error => {
        const err = error.response
        console.log(err)
        this.$emit('close')
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
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
        const err = error.response
        console.log(err)
        this.$emit('close')
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    selectedItem(itemInfo) {
      this.standardBroad.selected = []
      if (!itemInfo.selected) {
        this.standardBroad.selected.push(this.standardBroad.standardBroadData[itemInfo.idx])
        this.getBroadItem()
      }
    },
    getCodeList (code) {
       const requestData = JSON.stringify({
         cmmnCd: code
       })
       PublicCodeApi.getItem(requestData).then(result => {
         console.log(result)
         this.paramList = result.data.cmmnCdDetailInfo
       }).catch(error => {
          const err = error.response
          console.log(err)
          this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
       })
    },
    returnText (text) {
      this.standardBroadDetail.brdcsContents = text
    },
    insertValueName (event) {
      this.paramList.forEach(e => {
        if(e.cmmnCd == event.target.value) {
          this.standardBroadDetail[`inputParam${event.target.id}`] = e.cmmnCdNm
          this.standardBroadDetail[`userData${event.target.id}`] = e.userData1
          if (this.standardBroadDetail.brdcsContents.indexOf(e.cmmnCdNm) < 0) {
            this.standardBroadDetail.brdcsContents = `${this.standardBroadDetail.brdcsContents}\r\n${e.cmmnCdNm}`
          }
        }
      })
    },
    getSelectData () {
      this.$emit('select', this.standardBroadDetail)
      this.$emit('close')
    }
  }
}
</script>


<style lang="less">
.StandardBroadModal {
  .section {
    .contant-wrapper {
      height: 93%;
    }
  }
  .content.section.section-1 {
    width: 30% !important;
    .ui.table td {
      // background-color: #fff;
    }
  }
  .ld,.lh {
    width: 80% !important;
  }
  .ui.form td {
    .fields {
      margin: 0;
    }
    &.visibleTd {
      overflow: visible;
    }
  }
 
}
</style>
