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
                input(type="checkbox")
                label 자동실행
            th.center.aligned 
              button.ui.button.icon.basic.mini(@click="$emit('delete')")
                i.icon.close
        tbody
          tr
            td.center.aligned  
              div 부서 및 수신자
            td(colspan="3") 
              div.ui.dropdown.multiple.selection.fluid
                input(type="hidden")
                i.dropdown.icon
                div.default.text 
                div.menu
                  div.item item1
                  div.header item
              
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
                    label 파라미터 1
                    div.ui.dropdown.selection
                      input(type="hidden")
                      i.dropdown.icon
                      div.default.text 
                      div.menu
                        div.item item1
                        div.header item
                    div.ui.input
                      input
                .parameter
                  div.fields.inline
                    label 파라미터 2
                    div.ui.dropdown.selection
                      input(type="hidden")
                      i.dropdown.icon
                      div.default.text 
                      div.menu
                        div.item item1
                        div.header item
                    div.ui.input
                      input
                .parameter
                  div.fields.inline
                    label 파라미터 3
                    div.ui.dropdown.selection
                      input(type="hidden")
                      i.dropdown.icon
                      div.default.text 
                      div.menu
                        div.item item1
                        div.header item
                    div.ui.input
                      input
                .parameter
                  div.fields.inline
                    label 파라미터 4
                    div.ui.dropdown.selection
                      input(type="hidden")
                      i.dropdown.icon
                      div.default.text 
                      div.menu
                        div.item item1
                        div.header item
                    div.ui.input
                      input
                .parameter
                  div.fields.inline
                    label 파라미터 5
                    div.ui.dropdown.selection
                      input(type="hidden")
                      i.dropdown.icon
                      div.default.text 
                      div.menu
                        div.item item1
                        div.header item
                    div.ui.input.fluided
                      input
</template>

<script>
import CheckTextCount from '@/components/CheckTextCount.vue'
import StandardSms from '@/views/subs/StandardSms.vue'

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
      textareaData: '',
      smsData: this.value,

    }
  },
  components: {
    CheckTextCount,
    StandardSms
  },
  created () {
  },
  mounted () {
    $('ui.checkbox').checkbox()
  },
  methods: {
    returnText (text) {
      this.textareaData = text
    },
    selectStandard () {
      this.$modal.show(StandardSms, {
        title: '표준문자 선택'
      },
      {
        width: '60%',
        height:'auto'
      })
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

