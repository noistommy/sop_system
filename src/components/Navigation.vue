<template lang="pug">
  div.navigation
    div.logo
      a(href="/")
        img(src="../assets/CI_logo.png", alt="vue-logo")
    div#mainNav
        div.item(@click="activeNavigation('sop')", :class="{active:isActive == 'sop'}")
            router-link(:to="{ name: 'sop-list' }")
                h6.ui.icon.header
                    i.icon-sop-management
                    .content SOP관리
        div.item(@click="activeNavigation('member')", :class="{active:isActive == 'member'}")
            router-link(:to="{ name: 'membergroup' }")
                h6.ui.icon.header
                    i.icon-sop-crew
                    .content 조직도관리
        div.item(@click="activeNavigation('history')", :class="{active:isActive == 'history'}")
            router-link(:to="{ name: 'sophistory' }")
                h6.ui.icon.header
                    i.icon-sop-history
                    .content 이력관리
        div.item(@click="activeNavigation('info')", :class="{active:isActive == 'info'}")
            router-link(:to="{ name: 'location-info' }")
                h6.ui.icon.header
                    i.icon-sop-watch
                    .content 기준정보관리
    div#Simulation
      .modeBtn 훈련모드 실행중
</template>

<script>

export default {
  name: 'navigation',
  data () {
    return {
      isActive: ''
    }
  },
  methods: {
    activeNavigation (menuItem) {
      this.isActive = menuItem
    }
  }
}
</script>

<style lang="less" scoped>
  .navigation {
    padding: 0;
    height: 100%;
    background-color: #363847;
    display: flex;
    align-items: center;
    justify-content: space-between;
    #mainNav {
        width: 60%;
        height:100%;
        margin: 0 5px;
        display: flex;
        justify-content: flex-end;
        .item {
            font-size: 1.6rem;
            width: 150px;
            margin: 0 3px 0 3px;
            border: 0;
            background-color: #2A2A2F;
            &::before {
                content: '';
            }
            a {
                width:100%;
                height:100%;
                padding: 15px 0;
                display: inline-block;
                .ui.header{
                    color:#ffffff;
                    margin:0;
                    font-weight: normal;
                    i {
                        font-size: 1.8rem;
                        margin-right:.3rem;
                    }
                    .content {
                        display: inline-block;
                        margin-top:.1rem;
                    }
                }
            }
            &.active
            {
                background:#1386bd;
                // border:1px solid rgb(71, 169, 223);
                &:hover {
                    border-bottom:3px solid #fff;
                }
                .content {
                    font-weight: bold;
                }
            }
            &:hover
            {
                // background:#1386bd;
                border-bottom:5px solid #1386bd;
            }
        }
    }
    .logo {
      width: 260px;
      padding: 0 10px;
      a {
          display: block;
            color: #ffffff;
        }
    }
  }
  #Simulation {
    width: 300px;
    text-align: center;

    // .ui.button {
    .modeBtn {
        width: 200px;
        padding: 15px;
        font-size: 1.2rem;
        background-color: #286A85;
        color: rgb(71, 231, 236);
    }
  }
  .logo .title{
    margin-left: 15px;
  }
  .logo img {
    width: 100%;
  }
  .btn-d {
    position: absolute;
    bottom: 0;
  }
</style>
