<template lang="pug">
  div.modal.user-editor
    div.modal-header 운영자{{type}}
    div.modal-content 
      div.content-wrapper
        div.ui.form.tiny
          table.ui.table
            tbody
              tr
                td ID*
                td
                  div.field
                    label
                    input(type="text", v-model="userData.oprtrId")
                td 이름*
                td
                  div.field
                    label
                    input(type="text", v-model="userData.oprtrNm")
              tr
                td 직위*
                td
                  div.field
                    label
                    input(type="text", placeholder="직위", v-model="userData.ofcpsCdNm")
                td 직급*
                td
                  div.field
                    label
                    input(type="text", placeholder="직급" v-model="userData.clsfCdNm")
              tr
                td 휴대전화*
                td(:colspan='3')
                  div.field
                    label
                    input(type="text", v-model="userData.moblphonNo")
              tr
                td 권한설정*
                td(:colspan='3')
                  div.inline.fields
                    div.field
                      div.ui.radio.checkbox
                        label 관리자
                        input(type="radio", :value="option1", v-model="userData.oprtrFgCd")
                      div.ui.radio.checkbox
                        label 운영자
                        input(type="radio", :value="option2", v-model="userData.oprtrFgCd")
              tr
                td 비밀번호*
                td(v-if="type == '등록'", :colspan='3')
                  div.field
                    | welcome_sop
                td(v-else, :colspan='3')
                  div.field
                    button.ui.button(@click="initPassword") 초기화
            
    div.btnSet.center
      template(v-if="type=='등록'")
        button.ui.button.blue(@click="createUser") 등록
      template(v-else)
        button.ui.button.blue(@click="updateUser") 저장
      button.ui.button(@click="$emit('close')") 취소
    div.modal-close(@click="$emit('close')")
        //- i.icon.close
        div.close X
</template>

<script>
import UsersApi from '@/api/Users'
import PublicCodeApi from '@/api/PublicCode'
import { codeGenerator } from '@/util'

export default {
  name: 'user-editor',
  components: {
  },
  props: {
    data: Object,
    type: String
  },
  data () {
    return {
      userData: {},
      option1: "S0400100",
      option2: "S0400200"
    }
  },
  created () {
    this.userData = this.data
    this.spotInfo = this.getCodeList('S020')
    this.positionInfo = this.getCodeList('S030')
  },
  mounted () {
    $('.ui.radio.checkbox').checkbox()
  },
  methods: {
    createUser () {
      const requestData = JSON.stringify(this.userData)
      UsersApi.createUser(requestData).then(result => {
        console.log(result)
        this.$emit('close')
        this.showDailog()
      }).catch(error => {
        this.$emit('close')
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    updateUser () {
      const requestData = JSON.stringify(this.userData)
      UsersApi.updateUser(requestData).then(result => {
        console.log(result)
        this.$emit('close')
        this.showDailog()
      }).catch(error => {
        this.$emit('close')
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    initPassword () {
      const requestData = JSON.stringify({
        oprtrId:this.userData.oprtrId
      })
      UsersApi.resetPasswordInit(requestData).then(result => {
        console.log(result)
        alert('비밀번호가 초기화 되었습니다.')
      }).catch(error => {
        this.$emit('close')
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    getCodeList (code) {
       const requestData = JSON.stringify({
         cmmnCd: code
       })
       PublicCodeApi.getItem(requestData).then(result => {
         console.log(result)
         return result.data.cmmnCdDetailList
       }).catch(error => {
         this.$emit('close')
          const err = error.response
          console.log(err)
          this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
       })
    },
    showDailog () {
      let options = {
        title: '실행확인',
        text: '운영자가'
      }
      if(this.type == '등록') {
        options.text += '등록되었습니다'
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
