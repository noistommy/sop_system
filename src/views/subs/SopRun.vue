<template lang="pug">
  div.SopRun.sub-container
    div.sub-wrapper
      div.sub-content
        div.run-wrapper
          div.preview-view
            div.preview-header
              h3 {{sopList.sopTitle}}
              div.sop-info
                div.sop-location
                div.sop-time
            div.node-wrapper
                div.node(
                  v-for="(node, index) in sopList.stepList",
                  :class="{active:index == activeCount}",
                  @click="setActive(node, index)",
                  :id="`step_${index}`"
                  )
                  div.order {{index+1}}
                  div.step-content {{node.sopTitle}}
            div.history-wrapper
          div.running-view
            div.running-wrapper
              div.step-header
                h3 임무목록
              div.step-wrapper
                div.step-title
                  h3 {{activeCount+1}}. {{activeStep.stepTitle}}
                div.step-content
                  template(v-for="(action, index) in activeStep.actionItem")
                    component(:is="action.type")
            div.running-control
              div.btnSet
                div.btn-group.left
                  button.ui.button.teal SOP종료
                  button.ui.button.teal 제어권전달
                div.btn-wrap.right
                  button.ui.labeled.icon.button.blue(
                    v-if="activeCount>0",
                    @click="moveActiveStep('prev')")
                    i.icon.left.arrow
                    | 이전
                  button.ui.right.labeled.icon.button.blue(
                    v-if="activeCount<sopList.stepList.length-1",
                    @click="moveActiveStep('next')")
                    i.icon.right.arrow
                    | 다음
              
</template>

<script>
import SopManageApi from '@/api/SopManage'
import ActionSms from '@/components/ActionSmsRun'
import ActionBroad from '@/components/ActionBroadRun'
import ActionOrder from '@/components/ActionOrderRun'

export default {
  name: 'sop-run',
  data () {
    return {
      sopId: '',
      sopExecutSn:'',
      stepNo: 0,
      sopList: {
        sopTitle: '재난절차제목',
        stepList: [
          {
            stepTitle: '첫번째단계',
            actionItem: [
              {type: 'ActionSms'},
              {type: 'ActionBroad'}
            ]
          },
          {
            stepTitle: '두번째단계',
            actionItem: [
              {type: 'ActionOrder'},
              {type: 'ActionBroad'}
            ]
          },
          {
            stepTitle: '세번째단계',
            actionItem: [
              {type: 'ActionOrder'},
              {type: 'ActionSms'},
              {type: 'ActionBroad'}
            ]
          },
          {stepTitle: '네번째단계'}
        ]
      },
      activeStep: {},
      activeCount: 0,
      endMessage: ''
    }
  },
  components: {
    ActionSms,
    ActionBroad,
    ActionOrder
  },
  created () {
    console.log(this.$route.params)
    this.sopId = this.$route.params.sopId
    this.sopExecutSn = this.$route.params.sopExecutSn
    this.moveActiveStep ('')
    this.getStepList()
  },
  methods: {
    getStepList () {
      const requestData = JSON.stringify({
        sopId: this.sopId,
        sopExecutSn: this.sopExecutSn,
        stepNo: 0
      })
      SopManageApi.runStepList(requestData).then(result => {
        console.log(result.data)
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })

    },
    closeSop () {
      const requestData = JSON.stringify({
        sopId: this.sopId,
        sopExecutSn: this.sopExecutSn,
        endResn: this.endMessage
      })
      SopManageApi.closeSopList(requestData).then(result => {
        console.log(result.data)
        this.$router.push('/')
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })

    },
    passOperator () {
      const requestData = JSON.stringify({
        sopId: this.sopId,
        sopExecutSn: this.sopExecutSn
      })
      SopManageApi.passOperation(requestData).then(result => {
        console.log(result.data)
        this.$router.push('/')
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })

    },
    setActive (step, i) {
      this.activeStep = step
      this.activeCount = i
    },
    moveActiveStep (type) {
      if(type == 'prev') {
        this.activeCount--
      }
      else if(type == 'next') {
        this.activeCount++        
      }
      else {
        this.activeCount = 0
      }
      this.activeStep = this.sopList.stepList[this.activeCount]
    }
  }
}
</script>

<style lang="less" scoped>
.SopRun {
  .sub-content {
    .content {
      height: 100%;
    }
  }
  .run-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
    .preview-view {
      width: 40%;
      min-width: 500px; 
      
      display:flex;
      flex-direction: column;
      .preview-header {
        height: 6%;
      }
      .node-wrapper {
        display: flex;
        flex-direction: column;
        align-items: left;
        overflow-y: auto; 
        height: 55%;
        background-color: #fff;
        box-shadow: inset 0 0 15px 5px rgba(0, 0, 0, 0.06);
        border: 1px solid rgba(0, 0, 0, 0.2);
        .node {
          display: inline-block;
          background-color: #fff;
          width: 40%;
          border: 5px solid rgba(0, 0, 0, 0.3);
          // border-style: inset;
          border-radius: 30px;
          position: relative;
          margin: 10px;
          height: 50px;
          min-height: 50px;
          z-index: 100;
          > div {
            display: inline-block;
            padding: .8em;
          }
          .order {
            position: absolute;
            top: -5px;
            width: 50px;
            height: 50px;
            left: -5px;
            text-align: center;
            // background-color: rgba(221, 173, 119, 1);
            background-color:#fff;
            // color: #fff;
            border-radius: 30px;
            border: 5px solid rgba(0, 0, 0, 0.3);
          }
          .step-content {
            margin-left: 45px;
          }
          &::before {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            border: 2px solid rgba(0, 0, 0, 0.1);
            height: 30px;
          }
          &:last-child::before {
            display: none;
          }
          &.active {
            border: 5px solid rgb(255, 138, 42);
            .order {
              border: 5px solid rgb(255, 138, 42);
            }
          }
        }
      }
      .history-wrapper {
        height: 35%;
        border: 1px solid rgba(0, 0, 0, 0.2);
        margin-top: 10px;
      }
    }
    .running-view {
      width: 60%;
      padding-left: 20px;
      .running-wrapper {
        display: flex;
        flex-direction: column;
        height: 90%;
        .step-header {
          height: 6%;
        }
        .step-wrapper {
          height: 94%;
          border: 1px solid rgba(0, 0, 0, 0.2);
          background-color: #fff;
          padding: 15px;
          .step-title {
            padding-bottom: 15px;
          }
          .step-content {
            height: 90%;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
          }
        }
      }
      .step-control {
        height: 10%;
      }
    }
  }
}

</style>
