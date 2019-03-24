<template lang="pug">
  div.modal.user-editor
    div.modal-header 운영자{{type}}
    div.modal-content 
      div.content-wrapper
        div.ui.form.tiny
          table.ui.table
            tbody
              tr
                td 코드그룹*
                td
                  div.field
                    label
                    input(type="text", v-model="codeGroup.cmmnCd")
                td 코드그룹명*
                td
                  div.field
                    label
                    input(type="text", v-model="codeGroup.cmmnCdNm")
              tr
                td.center.aligned 
                  span 사용여부
                td
                  div.ui.toggle.checkbox(@click="toggleCheck")
                    input(type="checkbox", :checked="alarmYn")
                    label 허용
            
    div.btnSet.center
      template(v-if="type=='group'")
        button.ui.button.blue(@click="updateCodeGroup") 등록
      template(v-else)
        button.ui.button.blue(@click="updateCode") 저장
      button.ui.button(@click="$emit('close')") 취소
    div.modal-close(@click="$emit('close')")
        //- i.icon.close
        div.close X
</template>

<script>
import PublicCodeApi from '@/api/PublicCode'
import { codeGenerator } from '@/util'

export default {
  name: 'insert-code-group',
  components: {
  },
  props: {
    codeData: Object,
    type: String
  },
  data () {
    return {
      codeGroup: {
        cmmnCd: '',
        cmmnCdNm: '',
        useYn: 'Y'
      }
    }
  },
  created () {
  },
  mounted () {
    $('.ui.checkbox').checkbox()
  },
  computed: {
    alarmYn () {
      return this.codeGroup.useYn == 'Y'
    }
  },
  methods: {
    updateCodeGroup () {
      const requestData = JSON.stringify(this.codeGroup)
      PublicCodeApi.updateCodeGroup(requestData).then(result => {
        console.log(result)
      }).catch(error => {
        this.$emit('close')
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    updateCode () {
      const requestData = JSON.stringify(this.codeData)
      PublicCodeApi.updateCodeItem(requestData).then(result => {
        console.log(result)
      }).catch(error => {
        this.$emit('close')
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    toggleCheck () {
      this.codeGroup.useYn = this.codeGroup.useYn == 'Y' ? 'N' : 'Y'
    }
  }
}
</script>

<style lang="less">
.vue--dialog-overlay {
  z-index: 9999;
}
.modal.user-editor {
    background-color: #fff;
    position: relative;
    height: 100%;
    // border: 1px solid #5d5e68;
    // border-radius: 5px;
    // box-shadow: 0 0 10px rgba(0, 0, 0, .5);
    display: flex;
    flex-direction: column;
    position: relative;
    .modal-header {
        background-color: #5d5e68;
        color: #fff;
        padding: .8em 1.2em;
        font-weight: 700;
    }
    .modal-content {
        flex-grow: 1;
        padding: 15px;
        .content-wrapper {
          padding: 15px 15px 55px 15px;

        }
    }
    .modal-close {
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 2px 4px;
        border-radius: 3px;
        color: #fff;
        // background-color: #fff;
        font-size: 1rem;
        i {
          margin:0;
        }
        &:hover {
          background-color: #fff;
          color: #5d5e68;
        }
    }
    &.small {width: 300px;}
    &.large {width: 600px;}
    &.full {width: 90%;}
    .msgError {
      text-align: center;
      font-size: 0.8rem;
    }
    .error {
      color: #9f3a38;
    }
    .btnSet {
      position:absolute;
      padding: 15px 0;
      width: 100%;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      .ui.button {
        border-radius: 0 !important;
      }
    }
    .ui.table {
      td:nth-child(odd) {
        text-align: center;
        min-width: 100px;
        background-color: #f9fafb;
      }
    }
}
</style>
