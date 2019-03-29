<template lang="pug">
  div.sms-action
    SelectReceiver(@close="$modal.hide('select-reciever')", @reciever="setRecieverList")
    //- modals-container(@reciever="setRecieverList")
    div.ui.form.tiny
      table.ui.table.celled.structured.very.compact.blue
        tbody
          tr
            td.center.aligned  
              div 문자
            td.wide.eight
              div.ui.fluid.input( @click="selectSmsReceiver")
                label
                button.ui.button(type="button", :value="recieverTitle") {{recieverTitle}}
            td.center.aligned  완료
            td.center.aligned 
              button.ui.button.basic.mini(:class="{blue:state}", @click="stepRunning") {{state ? '완료' : '실행'}}
            td.center.aligned  시간
            td.center.aligned  {{actionData.executDt}}
          tr 
            td(colspan="6") 
              div.field
                CheckTextCount(
                  :formType="formType",
                  :rownum='3',
                  :maxLength='500',
                  v-model="actionData.smsContents",
                  @input="returnText")
          
</template>

<script>
import CheckTextCount from '@/components/CheckTextCount.vue'
import SelectReceiver from '@/components/SelectReceiver.vue'

export default {
  name: 'action-sms-run',
  props: {
    idx: Number,
    stateCode: Boolean,
    value: Object
  },
  data () {
    return {
      actionCheck: false,
      formType: 'textarea',
      textareaData: this.value.smsContents,
      actionData: this.value,
      state: false,
      recieveText: '수신자선택',
      recieveCount: 0,
      modalname: '',
    }
  },
  components: {
    CheckTextCount,
    SelectReceiver
  },
  created () {
    if(this.actionData.autoYn == null) {
      this.actionData.autoYn = 'N'
    } 
    // else if(this.actionData.autoYn == 'Y') {
    //   this.stepRunning()
    // } else{
    //   console.log('start')
    // }
    this.setRecieverList(this.actionData.sopStepExecutChrgEmpList)
  },
  mounted () {
    $('ui.checkbox').checkbox()
  },
  computed: {
    recieverTitle () {
      if(this.actionData.sopStepExecutChrgEmpList.length == 0) {
        this.recieveText = '수신자선택'
      }
      if(this.actionData.sopStepExecutChrgEmpList.length <= 1) {
        this.recieveCount = ''
      }
      return `${this.recieveText} ${this.recieveCount}`
    }
  },
  methods: {
    returnText (text) {
      this.textareaData = text
      
    },
    stepRunning () {
      if(this.state) {
        this.state = false
      } else {
        this.state = true
        this.$emit('runstep', this.actionData)
      }
      
    },
    selectSmsReceiver () {
      this.$modal.show('select-reciever', {
        modal:'locationmodal',
        title: '수신자 선택',
        recieveData: this.actionData.sopStepExecutChrgEmpList
      },{
        width: '70%',
        height: '80%',
        clickToClose: false
      })
    },
    setRecieverList(recieveList) {
      this.modalname = ''
      this.actionData.sopStepExecutChrgEmpList = recieveList
      if(recieveList.length > 0) {
        this.recieveText = `${recieveList[0].deptNm} ${recieveList[0].emplNm}`
        this.recieveCount = `외 ${recieveList.length-1}명`
      }
    },
  }
}
</script>

<style lang="less">
.action
  > div {
    padding: 10px 0;
  }
  .sms-action {
    position: relative;
    padding-bottom: 15px;
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
      tr:nth-child(1) {
        td:nth-child(odd){
          background-color: #f9fafb;
        }
        td:nth-child(1) {
          width: 15%;
        }
        td:last-child {
          width: 8%;
        }
      }
      td {
        overflow: visible;
      }
    }
  }
</style>

