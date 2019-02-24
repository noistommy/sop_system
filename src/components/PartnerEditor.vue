<template lang="pug">
  div.modal.user-editor
    div.modal-header {{title}} {{type == 'new' ? '등록' : '편집'}}
    div.modal-content 
      div.content-wrapper
        div.ui.form.tiny
          table.ui.table
            tbody
              tr
                td.center.aligned 
                  span 사원명*
                td
                  div.field
                    label
                    input(type="text", v-model="partnerData.emplNm")
              tr
                td.center.aligned 
                  span 직급명*
                td
                  div.field
                    label
                    input(type="text", v-model="partnerData.clsfNm")
              tr
                td.center.aligned 
                  span 휴대전화번호*
                td
                  div.field
                    label
                    input(type="text", v-model="partnerData.moblphonNo")
            
    div.btnSet.center
      button.ui.button.blue(@click="updateCode") {{type == 'new' ? '등록' : '편집'}}
      button.ui.button(@click="$emit('close')") 취소
    div.modal-close(@click="$emit('close')")
        div.close X
</template>

<script>
import PartnerApi from '@/api/Partner'

export default {
  name: 'code-editor',
  components: {
  },
  props: {
    data: Object,
    title: String,
    type: String,
    item: String
  },
  data () {
    return {
      partnerData: {}
    }
  },
  created () {
    this.partnerData = this.data
  },
  methods: {
    updateCodeGroup () {
      const requestData = JSON.stringify(this.codeData)
      PublicCodeApi.updateCodeGroup(requestData).then(result => {
        console.log(result)
        this.$emit('close')
        this.showDailog()
      }).catch(error => {
        console.log(`${error}`)
      })
    },
    updateCode () {
      const requestData = JSON.stringify(this.codeData)
      PublicCodeApi.updateCodeItem(requestData).then(result => {
        console.log(result)
        this.$emit('close')
        this.showDailog()
      }).catch(error => {
        console.log(`${error}`)
      })
    },
    showDailog () {
      let options = {
        title: '실행확인',
        text: ''
      }
      if(this.type == 'new') {
        options.text += '생성되었습니다'
      }else {
        options.text += '수정되었습니다'
      }
      this.$modal.show('dialog', options)
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
