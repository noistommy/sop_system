<template lang="pug">
  div.sms-action
    div.ui.form.tiny
      table.ui.table.celled.structured.very.compact.blue
        thead
          tr
            th.center.aligned 
              div.type 문자
            th.right.aligned.wide.nine
              button.ui.button.basic.mini(@click="selectStandard") 선택
              button.ui.button.basic.mini 문자(SMS)확인
            th.center.aligned 
              div.ui.radio.checkbox 
                input(type="checkbox", v-model="smsData.autoYn", true-value="Y", false-value="N")
                label 자동실행
            th.center.aligned 
              button.ui.button.icon.basic.mini(@click="$emit('delete')")
                i.icon.close
        tbody
          tr
            td.center.aligned  
              div 부서 및 수신자
            td(colspan="3") 
              div.ui.input.fluid(@click="selectSmsReceiver")
                label
                input(type="text")
              
          tr 
            td(colspan="4") 
              div.field
                CheckTextCount(
                  :formType="formType",
                  :rownum='3',
                  :maxLength='500',
                  v-model="textareaData",
                  @input="returnText")
          tr 
            td(colspan="4") 
              div.parameters
                .parameter
                  div.fields.inline
                    div.field
                      label 파라미터 1
                      select(:id="1", @change="setCode1", v-model="paramData1.code")
                        option(value="") 파라미터1
                        option(v-for="param in paramList", :value="param.cmmnCd") {{param.cmmnCdNm}}
                    div.fieled
                      div.ui.input
                        input(v-model="paramData1.data")
                .parameter
                  div.fields.inline
                    div.field
                      label 파라미터 2
                      select(:id="2", @change="setCode2", v-model="paramData2.code")
                        option(value="") 파라미터2
                        option(v-for="param in paramList", :value="param.cmmnCd") {{param.cmmnCdNm}}
                    div.fieled
                      div.ui.input
                        input(v-model="paramData2.data")
                .parameter
                  div.fields.inline
                    div.field
                      label 파라미터 3
                      select(:id="3", @change="setCode3", v-model="paramData3.code")
                        option(value="") 파라미터3
                        option(v-for="param in paramList", :value="param.cmmnCd") {{param.cmmnCdNm}}
                    div.fieled
                      div.ui.input
                        input(v-model="paramData3.data")
                .parameter
                  div.fields.inline
                    div.field
                      label 파라미터 4
                      select(:id="4", @change="setCode4", v-model="paramData4.code")
                        option(value="") 파라미터4
                        option(v-for="param in paramList", :value="param.cmmnCd") {{param.cmmnCdNm}}
                    div.fieled
                      div.ui.input
                        input(v-model="paramData4.data")
                .parameter
                  div.fields.inline
                    div.field
                      label 파라미터 5
                      select(:id="5", @change="setCode5", v-model="paramData5.code")
                        option(value="") 파라미터5
                        option(v-for="param in paramList", :value="param.cmmnCd") {{param.cmmnCdNm}}
                    div.fieled
                      div.ui.input
                        input(v-model="paramData5.data")
</template>

<script>
import CheckTextCount from '@/components/CheckTextCount.vue'
import SelectSmsModal from '@/components/SelectSmsModal.vue'
import SelectReceiver from '@/components/SelectReceiver.vue'
import StandardSmsApi from '@/api/StandardSMS'

export default {
  name: 'action-sms',
  props: {
    idx: Number,
    paramCode : Array,
    value: Object,
    isUpdate: Boolean
  },
  data () {
    return {
      actionUpdate: this.isUpdate,
      formType: 'textarea',
      textareaData: this.value.smsContents,
      smsData: this.value,
      paramList: this.paramCode,
      paramData1: {code: '',name: '',data: ''},
      paramData2: {code: '',name: '',data: ''},
      paramData3: {code: '',name: '',data: ''},
      paramData4: {code: '',name: '',data: ''},
      paramData5: {code: '',name: '',data: ''}

    }
  },
  components: {
    CheckTextCount,
    SelectSmsModal
  },
  created () {
    this.insertData(this.smsData)
  },
  mounted () {
    $('.ui.checkbox').checkbox()
  },
  updateed () {
    console.log('aaup')
  },
  methods: {
    returnText (text) {
      this.smsData.smsContents = text
    },
    selectStandard () {
      this.$modal.show(SelectSmsModal, {
        title: '표준문자 선택',
        type: 'ActionSms',
        stepNo: this.smsData.stepNo,
        stepSn: this.smsData.stepSn,
      },
      {
        id: this.idx,
        width: '80%',
        height:'auto'
      })
    },
    insertData (obj) {
      console.log('obj', obj)
      this.textareaData = obj.smsContents
      this.paramData1.code = obj.cmmnCd1
      this.paramData1.name = obj.inputParam1
      this.paramData1.data = obj.userData1
      this.paramData2.code = obj.cmmnCd2
      this.paramData2.name = obj.inputParam2
      this.paramData2.data = obj.userData2
      this.paramData3.code = obj.cmmnCd3
      this.paramData3.name = obj.inputParam3
      this.paramData3.data = obj.userData3
      this.paramData4.code = obj.cmmnCd4
      this.paramData4.name = obj.inputParam4
      this.paramData4.data = obj.userData4
      this.paramData5.code = obj.cmmnCd5
      this.paramData5.name = obj.inputParam5
      this.paramData5.data = obj.userData5
      // this.findCode(obj.cmmnCd)
    },
    setCode1 (event) {
      this.paramData1 = this.findCode(event.target.value)
      this.insertTextarea(this.paramData1.name)
      this.smsData.inputParam1 = this.paramData1.data
    },
    setCode2 (event) {
      this.paramData2 = this.findCode(event.target.value)
      this.insertTextarea(this.paramData2.name)
      this.smsData.inputParam2 = this.paramData2.data
    },
    setCode3 (event) {
      this.paramData3 = this.findCode(event.target.value)
      this.insertTextarea(this.paramData3.name)
      this.smsData.inputParam3 = this.paramData3.data
    },
    setCode4 (event) {
      this.paramData4 = this.findCode(event.target.value)
      this.insertTextarea(this.paramData4.name)
      this.smsData.inputParam4 = this.paramData4.data
    },
    setCode5 (event) {
      this.paramData5 = this.findCode(event.target.value)
      this.insertTextarea(this.paramData5.name)
      this.smsData.inputParam5 = this.paramData5.data
    },
    findCode (code) {
      const value = {
        code: '',
        name: '',
        data: ''
      }
      this.paramList.forEach(e => {
        if(e.cmmnCd == code) {
          value.code = e.cmmnCd
          value.name = e.cmmnCdNm
          value.data = e.userData1
        }
      })
      return value
    },
    insertTextarea (name) {
      if (this.textareaData.indexOf(name) < 0) {
        this.textareaData = `${this.textareaData}\r\n${name}`
      }
    },
    selectSmsReceiver () {
      this.$modal.show(SelectReceiver,{
        modal:'locationmodal',
        title: '수신자 선택'
      },{
        width: '70%',
        height: '80%'
      })
    },
    checkSmsItem () {
      const requestData = JSON.stringify(this.standardSmsDetail)
      StandardSmsApi.checkDetail(requestData)
      .then(result => {
       console.log(result)
        this.$modal.show(CheckMediaModal,{
          title: '문자(SMS)확인',
          data: result.data
        },{
          width: '350px',
          height: 'auto'
        })
      })
      .catch(error => {
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    }
  }

}
</script>

<style lang="less" scoped>
.action
  > div {
    padding: 10px 0;
  }
  .sms-action {
    position: relative;
    .parameters {
      display: flex;
      flex-wrap: wrap;
      .parameter {
        width: 50%;
        .fields > div {
          padding: 0 5px;
        }
      }
    }
    .ui.table {
      th:nth-child(1) {
        width: 15%
      }
      td {
        overflow: visible;
      }
    }
  }
</style>

