<template lang="pug">
  div.order-action
    div.ui.form.tiny
      table.ui.table.celled.structured.very.compact
        thead
          tr
            th.center.aligned 
              div.ui.radio.checkbox( @change="checkAction")
                input(type="checkbox", v-model="actionCheck")
                label 지시사항
            th.right.aligned.wide.ten
            th.center.aligned 
              div.ui.radio.checkbox 
                input(type="checkbox")
                label 자동실행
        tbody
          tr
            td  
              div 부서 및 수신자
            td(colspan="2") 
              div.ui.dropdown.multiple.selection.fluid
                input(type="hidden")
                i.dropdown.icon
                div.default.text 
                div.menu
                  div.item item1
                  div.header item
              
          tr 
            td(colspan="3") 
              div.field
                CheckTextCount(
                  :formType="formType",
                  :rownum='3',
                  :maxLength='500',
                  v-model="textareaData",
                  @input="returnText")
          
</template>

<script>
import CheckTextCount from '@/components/CheckTextCount.vue'

export default {
  name: 'action-order',
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
  .order-action {
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

