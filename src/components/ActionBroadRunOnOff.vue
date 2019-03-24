<template lang="pug">
  div.sms-action
    div.ui.form.tiny
      table.ui.table.celled.structured.very.compact.green
        tbody
          tr
            td.center.aligned  
              div 방송
            td.wide.eight
            td.center.aligned  완료
            td.center.aligned 
              button.ui.button.basic.mini(:class="{blue:state == 'run'}", @click="stepRunning") {{state ? '완료' : '실행'}}
            td.center.aligned  시간
            td.center.aligned  11:11
          //- tr 
          //-   td(colspan="6") 
          //-     div.field
          //-       CheckTextCount(
          //-         :formType="formType",
          //-         :rownum='3',
          //-         :maxLength='500',
          //-         v-model="textareaData",
          //-         @input="returnText")
          
</template>

<script>
import CheckTextCount from '@/components/CheckTextCount.vue'

export default {
  name: 'action-sms',
  props: {
    idx: Number,
    value: Object
  },
  data () {
    return {
      actionCheck: false,
      formType: 'textarea',
      textareaData: this.value.brdcstContents,
      actionData: this.value,
      state: 'ready'
    }
  },
  components: {
    CheckTextCount,
  },
  created () {
    if(this.actionData.autoYn == null) {
      this.actionData.autoYn = 'N'
    } else if(this.actionData.autoYn == 'Y') {
      this.stepRunning()
    } else{
      console.log('start')
    }
  },
  mounted () {
    $('ui.checkbox').checkbox()
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
      
    }
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
      th:nth-child(1) {
        width: 15%
      }
      td {
        overflow: visible;
      }
    }
  }
</style>

