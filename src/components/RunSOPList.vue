<template lang="pug">
  div#SopList(:class="{active:activeSide}")
    ResetPassword(@close="$modal.hide('reset-password')")
    RunSopModal(@close="$modal.hide('run-sop-modal')")
    RunBySensorList(@close="$modal.hide('run-sensor-list')")
    div.virtual-btn(v-if="!activeSide", @click="toggleSideLayer")
    div.run-list
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
          span.alarm-count {{excuteList.length + waitingList.length}}
      div.item
        div.header
          span.alarm-icon
            i.icon.icon-sop-run
          span.sub-title 실행중인 SOP
          span.alarm-count {{excuteList.length}}
        div.sop-list
          .item(v-for="sop in excuteList")
            div.sop-item(@click="runningSop(sop)") {{sop.dispSopTitle}}
      div.item
        div.header
          span.alarm-icon
            i.icon.icon-sop-wait
          span.sub-title 대기중인 SOP
          span.alarm-count {{waitingList.length}}
        div.sop-list
          .item(v-for="sop in waitingList")
            div.sop-item(@click="readySop(sop)") {{sop.dispSopTitle}}
      div.item.alram-wrapper
</template>

<script>
import ResetPassword from '@/components/ResetPassword'
import RunBySensorList from '@/components/RunBySensorList'
import RunSopModal from '@/components/RunSopModal'
import { mapActions } from 'vuex'
import About from '@/views/About'
import SopSlide from'@/api/SopSlide'
import { setInterval, clearInterval } from 'timers';
import { codeGenerator } from '@/util'

export default {
  name: 'run-sop-list',
  data () {
    return {
      activeSide: true,
      excuteList: [],
      waitingList: [],
      interval: ''
    }
  },
  components: {
    ResetPassword,
    RunBySensorList,
    RunSopModal
  },
  created () {
    this.getSOPList()
    this.interval = setInterval(() => {
     this.getSOPList()
    },5000)
    
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    toggleSideLayer () {
      this.activeSide = !this.activeSide
    },
    onLogout() {
      this.logout().then((result) => {
        console.log(result)
        clearInterval(this.interval)
        this.$router.push('/login')
      }).catch(error => {
        this.$emit('close')
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    getSOPList () {
      SopSlide.getList().then(result => {
        this.excuteList = result.data.selectExecutSopList
        this.waitingList = result.data.selectWaitSopList
      }).catch(error => {
        this.$emit('close')
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    runningSop (sopItem) {
      const requestData = JSON.stringify({
        sopId: sopItem.sopId,
        sopExecutSn: sopItem.sopExecutSn
      })
      SopSlide.checkRunFlag(requestData).then(result => {
        if(result.data.executAuthorFlag == 'Y') {
          this.$router.push({ name: 'sop-run', params: {sopId: sopItem.sopId, sopExecutSn: sopItem.sopExecutSn, type: 'run'}})
        } else {
          this.$router.push({ name: 'sop-run', params: {sopId: sopItem.sopId, sopExecutSn: sopItem.sopExecutSn, type: 'monitor'}})
        }
      })
    },
    resetPassword () {
      this.$modal.show('reset-password' , {
        title: '비밀번호변경',
      }, {
        width: '350px',
        clickToClose: false
      })
    },
    readySop (sopItem) {
      console.log('click')
      if(sopItem.sopId == undefined) {
        this.selectSopBySensor(sopItem)
      } else {
        this.selectSop(sopItem)
      }
    },
    selectSop (reqData) {
      this.$modal.show('run-sop-modal', {
        title: 'SOP실행',
        data: reqData
      },{
        width: '350px',
        height: 'auto',
        clickToClose: false
      })
    },
    selectSopBySensor (reqData) {
      this.$modal.show('run-sensor-list', {
        title: 'SOP선택',
        text: reqData.dispSopTitle,
        data: reqData.iwId
      },{
        width: '600px',
        height: '500px',
        clickToClose: false
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
    min-width:5.5rem;
    width: 5.5rem;
    overflow: hidden;
    padding: 0;
    height: 100%;
    margin:0;
    z-index:100;
    -webkit-box-shadow: 0 0 20px 0 #333;
            box-shadow: 0 0 20px 0 #333;
    .transition;
    .virtual-btn {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index:9999;
    }
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
            .sop-item {
              color: #f2f2f2;
              padding: 10px 0;
            }
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
      min-width: 270px;
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
