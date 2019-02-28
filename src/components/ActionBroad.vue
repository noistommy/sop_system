<template lang="pug">
  div.broad-action
    div.ui.form.tiny
      table.ui.table.celled.structured.very.compact
        thead
          tr
            th.center.aligned 
              div.ui.radio.checkbox( @change="checkAction")
                input(type="checkbox", v-model="actionCheck")
                label 방송
            th.right.aligned.wide.ten
              button.ui.button.basic.mini 선택
              button.ui.button.basic.mini 방송문구확인
            th.center.aligned 
              div.ui.radio.checkbox 
                input(type="checkbox")
                label 자동실행
        tbody
          tr 
            td(colspan="3") 
              div.field
                CheckTextCount(
                  :formType="formType",
                  :rownum='3',
                  :maxLength='500',
                  v-model="textareaData",
                  @input="returnText")

          tr 
            td(colspan="3") 
              div.parameters
                .parameter
                  div.fields.inline
                    label 파라미터1
                    div.ui.dropdown.multiple.selection
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
                    label 파라미터1
                    div.ui.dropdown.multiple.selection
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
                    label 파라미터1
                    div.ui.dropdown.multiple.selection
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
                    label 파라미터1
                    div.ui.dropdown.multiple.selection
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
                    label 파라미터1
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


export default {
  name: 'action-broad',
  props: {
    idx: Number,
    value: Object
  },
  data () {
    return {
      actionCheck: false,
      formType: 'textarea',
      textareaData: ''
    }
  },
  components: {
    CheckTextCount
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
    checkAction () {
      this.$emit('actData', { orderId: this.idx, state:this.actionCheck })
    }
  }
}
</script>

<style lang="less">
.action
  > div {
    padding: 10px 0;
  }
  .broad-action {
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
    .ui.table td {
      overflow: visible;
    }
  }
</style>

