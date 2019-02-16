<template lang="pug">
  div#Login.full(@keyup.enter="onLogin")
    div.login-container.full
      div.logo
        img(src="../assets/CI_logo.png", alt="logo")
      div.login-panel
        div.header 재난관리시스템
        div.content
          div.ui.form
            .field
              .ui.left.icon.input
                i.user.icon
                input(v-model="loginInfo.oprtrId", type="text", name="userId", placeholder="사용자 아이디")
            .field
              .ui.left.icon.input
                i.lock.icon
                input(v-model="loginInfo.oprtrPassword", type="password",name="password", placeholder="사용자 비밀번호")
            .field.loginBtn
              .ui.fluid.large.teal.button(@click="onLogin") Login
<<<<<<< HEAD
              .ui.fluid.large.teal.button(@click="onLogout") Logout
=======
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
</template>

<script>
import { mapActions } from 'vuex'
import { codeGenerator } from '@/util'
<<<<<<< HEAD
import ResetPassword from '@/components/ResetPassword'
=======
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e

export default {
  name: 'login',
  data () {
    return {
      loginInfo: {
        oprtrId: '',
        oprtrPassword: ''
      },
      message: ''
    }
  },
<<<<<<< HEAD
  created() {
  },
  methods: {
    ...mapActions([
      'login',
      'logout'
=======
  methods: {
    ...mapActions([
      'login'
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
    ]),
    onLogin() {
      const requestData = JSON.stringify(this.loginInfo)
      this.login(requestData).then((result) => {
        console.log(result)
<<<<<<< HEAD
        if(result == 'undefined') return 
        if(result.data.msgCode == 'Y') {
          this.$router.replace('/')
        }else if(result.data.msgCode == 'P') {
          this.$modal.show(ResetPassword, {
            title: '비밀번호변경',
            text: result.data.msgValue
          }, {
            width: '350px'
          })
        }else {
          this.$modal.show('dialog', codeGenerator(result.data.msgCode, result.data.msgValue))
=======
        if(result == 'undefined') return
        if(result.msgCode == 'Y') {
          this.redirect()
        } else {
          const dialogData = codeGenerator(result.msgCode, result.msgValue)
          this.showDialog(dialogData)
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
        }
      })
    },
    redirect () {
<<<<<<< HEAD
      const {search} = window.location
      if(search === '') {
        this.$router.push('/')
      } else {
        const tokens = search.replace(/^\?/, '').split('&')
        const {returnPath} = tokens.reduce((qs, tkn) => {
          const pair = tkn.split('=')
          qs[pair[0]] = decodeURIComponent(pair[1])
          return qs
        }, {})
        // 리다이렉트 처리
        this.$router.push(returnPath)
      }
    },
    showDialog(el,data) {
      el.$modal.show('dialog', {
=======
      this.$router.push('/')
    },
    showDialog(data) {
      this.$modal.show('dialog', {
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
        title: data.title,
        text: data.text,
        buttons: data.button
      })
<<<<<<< HEAD
    },
    onLogout() {
      this.logout().then((result) => {
        console.log(result)
        this.$router.push('/login')
      }).catch(error => {
        console.log(error.response)
      })
=======
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
    }
  }
}
</script>

<style lang="less" scoped>
#Login {
  position: absolute;
  .login-container {
    position: absolute;
    background-color: #363847;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .login-panel {
      width: 380px;
      height: 265px;
      background-color: #fff;
      border-radius: 3px;
      box-shadow: 0 0 20px #15161bd7;
      overflow: hidden;
      .header {
        background-color: #1f2029;
        color: #fff;
        font-size: 2.5em;
        font-weight: bold;
        text-align: center;
        padding: 25px 30px;
      }
      .content {
        padding: 20px;
        .loginBtn {
          padding-top: 10px;
          a {
            color: #ffffff;
          }
        }
      }
    }
    .logo {
      width: 380px;
      padding: 30px 50px;
      img {
        width: 100%;
      }
    }
  }
}

</style>
