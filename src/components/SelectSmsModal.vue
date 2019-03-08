<template lang="pug">
  div.StandardSmsModal.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 표준 문자 선택
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
                    td.center.aligned {{props.item.useYn}}
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
                        div.text-title {{standardSmsDetail.smsTitle}}
                        //- input(type="text", v-model="standardSmsDetail.smsTitle")
                        //- label
                    tr
                      td.center.aligned 
                        span 문자내용
                      td
                        div.text-contents {{standardSmsDetail.smsContents}}
                        //- check-text-count(
                        //-   :formType="formType",
                        //-   :rownum='3',
                        //-   :maxLength='500',
                        //-   v-model="standardSmsDetail.smsContents",
                        //-   @input="returnText")
                    tr
                      td.center.aligned 
                        span 파라미터1
                      td.visibleTd
                        div.fields
                          div.field.six.wide
                            div.pram-name [{{standardSmsDetail.inputParam1}}]
                            //- label
                            //- select(:id="1", v-model="standardSmsDetail.cmmnCd1", @change="insertValueName")
                            //-   option(disabled, value="")
                            //-   option(v-for="param in paramList", :value="param.cmmnCd", :key="param.cmmnCd") {{param.cmmnCdNm}}
                          div.field.ten.wide
                            span {{standardSmsDetail.userData1}}
                            //- label
                            //- input(type="text", placeholder='EX.', v-model="standardSmsDetail.userData1")
                    tr
                      td.center.aligned 
                        span 파라미터2
                      td.visibleTd
                        div.fields
                          div.field.six.wide
                            div.code-name [{{standardSmsDetail.inputParam2}}]
                          //-   label
                          //-   select(:id="2",v-model="standardSmsDetail.cmmnCd2", @change="insertValueName")
                          //-     option(v-for="param in paramList", :value="param.cmmnCd", :key="param.cmmnCd") {{param.cmmnCdNm}}
                          div.field.ten.wide
                            span {{standardSmsDetail.userData2}}
                            //- label
                            //- input(type="text", placeholder='EX.', v-model="standardSmsDetail.userData2")
                    tr
                      td.center.aligned 
                        span 파라미터3
                      td.visibleTd
                        div.fields
                          div.field.six.wide
                            div.code-name [{{standardSmsDetail.inputParam3}}]
                            //- label
                            //- select(:id="3",v-model="standardSmsDetail.cmmnCd3", @change="insertValueName")
                            //-   option(v-for="param in paramList", :value="param.cmmnCd", :key="param.cmmnCd") {{param.cmmnCdNm}}
                          div.field.ten.wide
                            span {{standardSmsDetail.userData3}}
                            //- label
                            //- input(type="text", placeholder='EX.', v-model="standardSmsDetail.userData3")
                    tr
                      td.center.aligned 
                        span 파라미터4
                      td.visibleTd
                        div.fields
                          div.field.six.wide
                            div.code-name [{{standardSmsDetail.inputParam4}}]
                            //- label
                            //- select(:id="4",v-model="standardSmsDetail.cmmnCd4", @change="insertValueName")
                            //-   option(v-for="param in paramList", :value="param.cmmnCd", :key="param.cmmnCd") {{param.cmmnCdNm}}
                          div.field.ten.wide
                            span {{standardSmsDetail.userData4}}
                            //- label
                            //- input(type="text", placeholder='EX.', v-model="standardSmsDetail.userData4")
                    tr
                      td.center.aligned 
                        span 파라미터5
                      td.visibleTd
                        div.fields
                          div.field.six.wide
                            div.code-name [{{standardSmsDetail.inputParam5}}]
                            //- label
                            //- select(:id="5",v-model="standardSmsDetail.cmmnCd5", @change="insertValueName")
                            //-   option(v-for="param in paramList", :value="param.cmmnCd", :key="param.cmmnCd") {{param.cmmnCdNm}}
                          div.field.ten.wide
                            span {{standardSmsDetail.userData5}}
                            //- label
                            //- input(type="text", placeholder='EX.', v-model="standardSmsDetail.userData5")
                    tr
                      td.center.aligned 
                        span 사용여부
                      td
                        div {{standardSmsDetail.useYn == 'Y' ? '사용' : '사용안함'}}
                        //- div.ui.toggle.checkbox
                        //-   input(type="checkbox",
                        //-   true-value="Y",
                        //-   false-value="N",
                        //-   v-model="standardSmsDetail.useYn")
                        //-   label 허용
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
import { standardSmsHeader } from '@/setting'
import StandardSmsApi from '@/api/StandardSMS'
import PublicCodeApi from '@/api/PublicCode'
import CheckMediaModal from '@/components/CheckMediaModal.vue'
import { codeGenerator } from '@/util'
import { setTimeout } from 'timers';


export default {
  name: 'standard-sms-modal',
  props: {
    title: String,
    data: Object,
    stepNo: Number,
    stepSn: Number,
    type: String
  },
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
      standardSmsDetail: {
      },
      newSmsDetail: {},
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
    this.getSmslist()
  },
  mounted () {
    $('.ui.dropdown').dropdown('restore defaults')
  },
  updated () {
   
  },
  watch : {
    smsData () {
      console.log(this.smsData.smsContents)
    }
  },
  computed: {
    alarmYn () {
      return this.standardSmsDetail.useYn == 'Y'
    }
  },
  methods: {
    getSmslist () {
      const requestData = JSON.stringify(this.searchData)
      StandardSmsApi.getList(requestData)
      .then(result => {
        this.standardSms.standardSmsData = result.data.stdSmsList
        this.standardSms.selected[0] = this.standardSms.standardSmsData[0]
        this.getSmsItem()
      }).catch(error => {
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    getSmsItem () {
      const requestData = JSON.stringify({
        smsSn: this.standardSms.selected[0].smsSn
      })
      StandardSmsApi.getDetail(requestData)
      .then(result => {
        console.log(result)
        $('.ui.dropdown').dropdown('restore defaults')
        this.standardSmsDetail = result.data
      })
      .catch(error => {
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    selectedItem(itemInfo) {
      this.standardSms.selected = []
      if (!itemInfo.selected) {
        this.standardSms.selected.push(this.standardSms.standardSmsData[itemInfo.idx])
        this.getSmsItem()
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
      this.standardSmsDetail.smsContents = text
    },
    insertValueName (event) {
      this.paramList.forEach(e => {
        if(e.cmmnCd == event.target.value) {
          this.standardSmsDetail[`inputParam${event.target.id}`] = e.cmmnCdNm
          this.standardSmsDetail[`userData${event.target.id}`] = e.userData1
          if (this.standardSmsDetail.smsContents.indexOf(e.cmmnCdNm) < 0) {
            this.standardSmsDetail.smsContents = `${this.standardSmsDetail.smsContents}\r\n${e.cmmnCdNm}`
          }
        }
      })
    },
    getSelectData () {
      const selectData = {
        stepNo: this.stepNo,
        stepSn: this.stepSn,
        action: this.standardSmsDetail
      }
      this.$emit('select', selectData)
      this.$emit('close')
    }
  }
}
</script>


<style lang="less">
.StandardSmsModal {
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
  .ui.form {
    tr td:nth-child(1) {
      width: 20%;
    }
    td {
      .fields {
        margin: 0;
      }
      &.visibleTd {
        overflow: visible;
      }
    }
  }
  .text-contents {
    height: 5rem;
    background-color: #f9f9f9;
    padding: 5px;
  }
  td {
    .code-name {padding: 5px;}
    span {
      display: inline-block;
      width: 100%;
      background-color: #f9f9f9;
      padding: 5px;
    }
  }
 
}
</style>
