<template lang="pug">
  div#Login.full
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
                input(type="text", name="userId", placeholder="사용자 아이디")
            .field
              .ui.left.icon.input
                i.lock.icon
                input(type="password",name="password", placeholder="사용자 비밀번호")
            .field.loginBtn
              .ui.fluid.large.teal.button
                    router-link(:to="{ path: '/' }") Login
</template>

<script>
export default {
  name: 'login'
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
