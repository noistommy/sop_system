<template lang="pug">
  div#SopList(:class="{active:activeSide}")
    .run-list
      div.item.userInfo
        div.slideBtn(@click="toggleSideLayer")
          i.icon.bars
        div.userSetting
          //- div.user
          //-   | User님
          div(@click="onLogout", class="ui button mini") 로그아웃
          div(@click="resetPassword" class="ui button mini") 비밀번호변경
      div.item.totalAlarm
        div.header
          span.alarm-icon
            i.icon.icon-sop-bell
          span.sub-title 재난발생알람
          span.alarm-count 1
      div.item
        div.header
          span.alarm-icon
            i.icon.icon-sop-run
          span.sub-title 실행중인 SOP
          span.alarm-count 2
        div.sop-list
          .item
            router-link(:to="{ name: 'home' }") ITEM 1
          .item
            router-link(:to="{ name: 'home' }") ITEM 2
      div.item
        div.header
          span.alarm-icon
            i.icon.icon-sop-wait
          span.sub-title 대기중인 SOP
          span.alarm-count 1
        div.sop-list
          .item
            router-link(:to="{ name: 'home' }") ITEM 1
      div.item.alram-wrapper
</template>

<script>
<<<<<<< HEAD
import ResetPassword from '@/components/ResetPassword'
import { mapActions } from 'vuex'
import About from '@/views/About'
=======
import { mapActions } from 'vuex'
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e

export default {
  name: 'run-sop-list',
  data () {
    return {
      activeSide: true
    }
  },
  components: {
    ResetPassword
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    toggleSideLayer () {
      console.log()
      this.activeSide = !this.activeSide
    },
    onLogout() {
      this.logout().then((result) => {
        console.log(result)
        this.$router.push('/login')
<<<<<<< HEAD
      }).catch(error => {
        console.log(error.response)
      })
    },
    resetPassword () {
      this.$modal.show(ResetPassword, {
        title: '비밀번호변경',
      }, {
        width: '350px'
=======
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
      })
    }
  }
}
</script>

<style lang="less">
  .ellips {
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .transition (@type: all, @duration: 250ms, @Function: ease-out) {
    -webkit-transition: @arguments;
    -moz-transition: @arguments;
    -ms-transition: @arguments;
    -o-transition: @arguments;
    transition: @arguments;
  }

  .border-radius (@tl: 0px, @bl: 0px, @tr: 0px, @br: 0px) {
    border-top-left-radius: @tl;
    border-bottom-left-radius: @bl;
    border-top-right-radius: @tr;
    border-bottom-right-radius: @br;
  }

  #SopList {
    overflow: hidden;
    position: relative;
    background-color: #595959;
    width: 5.5rem;
    overflow: hidden;
    padding: 0;
    height: 100%;
    margin:0;
    z-index:100;
    -webkit-box-shadow: 0 0 20px 0 #333;
            box-shadow: 0 0 20px 0 #333;
    .transition;
    .run-list {
      width: 300px;
      height: 100%;
      position: absolute;
      .item {
        position: relative;
        padding: 0 18px;

        .header {
          width: 45px;
          padding: .9em;
          height: 45px;
          font-weight: bold;
          position: relative;
          color: #ffffff;
          background-color: #737373;
          border-radius: 25px;
          margin-bottom: 10px;
         .transition;
         .sub-title {
          //  display: none;
          opacity: 0;
          .transition;
         }
         .alarm-icon {
            position: absolute;
            left:0;
            top:6px;
            display: inline-block;
            i {
              margin-top: 3px !important;
              color:#000000;
              font-size: 2.2em;
            }
          }
          .alarm-count {
            text-align: center;
            position: absolute;
            width:20px;
            height:20px;
            padding-top: 2px;
            top:-5px;
            right: -5px;
            font-size: .9rem;
            color: #FFFF;
            background-color: #2AC0EF;
            border-radius: 15px;
          }
        }
        .sop-list {
          max-height: 250px;
          overflow: auto;
          width:95%;
          color: #999;
          cursor: pointer;
          padding-top: 5px;
          margin-left: 50px;
          .item {
            .ellips;
            font-size: .9rem;
            a {
              margin: 10px 0;
              color: #dfdfdf;
              display: inline-block;
              }
            &:hover {
              background-color: #333;
            }
          }
        }
      }
      .item.userInfo {
        position: relative;
        background-color: #434343;
        height: 50px;
        .slideBtn {
          cursor: pointer;
          width: 40px;
          color: #ffffff;
          font-size: 2rem;
          padding: 8px 6px;
          i {
            line-height: 1em;
          }
        }
        .btn-d {
          position: absolute;
          bottom: 0;
        }
        .userSetting {
          padding: 10px 25px;
          position: absolute;
          top:0;
          right:10px;
          .user {
            color: #fff;
            padding-bottom: 10px;
          }
          a.ui.button {
            margin-right: 5px;
          }
        }
      }
      .item.totalAlarm {
        margin-top: 15px;
      }
      .item.alram-wrapper {
        position: absolute;
        bottom:0;
        padding: 0;
        width:100%;
        height: 20%;
        border-top: 1px solid rgb(80, 80, 80);
      }
    }
    &.active {
      width: 270px;
      .transition;
      .run-list .item {
        .header {
          width: 100%;
          padding: 1em 3.8em;
          .border-radius(25px, 25px, 0, 0);
          .sub-title {
            display: block;
            opacity: 1;
            .transition;
          }
          .alarm-icon {
            left: 10px;
          }
          .alarm-count {
            padding-top: 0;
            position: absolute;
            top:15px;
            right: 25px;
            font-size: 1.2em;
            color: #2AC0EF;
            background-color: #737373;
          }
        }
        .sop-list {
          margin-left: 0;
        }
      }
      // .item .header::after {
      //   background-color: #737373;
      // }
      // .item:nth-child(2) .header::after {
      //   content: '8';
      // }
      // .item:nth-child(3) .header::after {
      //   content: '4';
      // }
      // .item:nth-child(4) .header::after {
      //   content: '2';
      // }
    }
  }
</style>
