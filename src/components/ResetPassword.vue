<template lang="pug">
  div.modal
    div.modal-header {{title}}
    div.modal-content 
      //- div.discription {{text}}
      div.content-wrapper
        div.ui.form
          div.inline.field
            label 기존비밀번호
            input(type="password", v-model="resetData.oprtrPassword")
          div.inline.field
            label 새비밀번호
            input(type="password", v-model="resetData.newOprtrPassword")
          div.inline.field(:class="{error:errorMessage}")
            label 새비밀번호확인
            input(type="password", v-model="comfirmPassword")
            div.msgError.error(v-if="errorMessage")
              div {{errorMessage}}
            
      div.btnSet.center
        button.ui.button.blue(@click="resetPassword") 저장
        button.ui.button(@click="$emit('close')") 취소
    div.modal-close(@click="$emit('close')")
        //- i.icon.close
        div.close X
</template>

<script>
import UsersApi from '@/api/Users'

export default {
  name: 'reset-password',
  components: {
  },
  props: {
    userId: String,
    title: String,
    text: String
  },
  data () {
    return {
      resetData: {
        oprtrId: this.userId,
        oprtrPassword: '',
        newOprtrPassword: ''
      },
      comfirmPassword: '',
      errorMessage: ''
    }
  },
  created () {
  },
  methods: {
    resetPassword () {
      const requestData = JSON.stringify(this.resetData)
      if(this.resetData.oprtrPassword == '' || this.resetData.newOprtrPassword == '') {
        this.errorMessage = "데이터가 입력되지 않았습니다."
      }else if(!this.isRightPassword()) {
        this.errorMessage = "입력하신 패스워드와 같지 않습니다."
      }else {
        UsersApi.resetPassword(requestData).then(result => {
          console.log(result)
          location.reload()
        }).catch(error => {
          console.log(error.response)
        })
      }
    },
    isRightPassword() {
      return this.resetData.newOprtrPassword == this.comfirmPassword
    }
  }
}
</script>

<style lang="less">
.ui.form {
  .inline {
    label {
      width: 32% !important;
    }
  }
}
.modal {
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
          padding: 15px;
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
}
</style>
