<template lang="pug">
  div.SopRun.sub-container
    div.sub-wrapper
      div.sub-content
        div.run-wrapper
          div.preview-view
            div.preview-header
              h3 {{sopInformation.sopTitle}}
              div.sop-info
                div.sop-location {{sopInformation.buldNm}}
                div.sop-time {{sopInformation.executDt}}
            div.node-wrapper
                div.node(
                  v-for="(node, index) in sopStepExecutMisnList",
                  :class="{active:index == activeCount}",
                  @click="setActive(node, index)",
                  :id="`step_${index}`"
                  )
                  div.order {{index+1}}
                  div.step-content {{node.stepTitle}}
                  div.action-history(:class="{active:index == activeCount}", v-if="node.historyList")
                    div.ui.list 
                      div.item(v-for="act in node.historyList") 
                        i.icon.mobile.alternate.blue(v-if="act.itemKndNm == '문자'")
                        i.icon.mobile.microphone.green(v-if="act.itemKndNm == '방송'")
                        i.icon.mobile.bullhorn.yellow(v-if="act.itemKndNm == '지시사항'")
                        div.content {{act.itemKndNm}} {{act.contents}}
                      
            div.history-wrapper
              DataTable(
                v-model="stepHistory.historyData",
                :headers="stepHistory.header",
                :items="stepHistory.historyData",
                :itemKey="stepHistory.itemkey",
                :isFooter="stepHistory.isfooter",
                :isListNumber="stepHistory.isListNumber",
                :isSelect="stepHistory.isSelect",
                :isPagination="stepHistory.isPagination",
                :page="stepHistory.pageInfo",
                :tableType="stepHistory.tableType"
              ).ui.table.celled.selectable
                template( slot="items", slot-scope="props")
                  tr
                    td.center.aligned {{props.idx + 1}}
                    td.center.aligned {{props.item.regDt}}
                    td.center.aligned {{props.item.stepNo}}
                    td.center.aligned {{props.item.itemKndNm}}
                    td.ellipse {{props.item.contents}}
          div.running-view
            div.running-wrapper
              div.step-header
                h3 임무목록
              div.step-wrapper
                div.step-title
                  h3 {{activeCount+1}}. {{activeStep.stepTitle}}
                div.step-content
                  template(v-for="(action, index) in activeStep.actionItem")
                    component(:is="action.type",
                    v-model="activeStep.actionItem[index]",
                    :idx="index"
                    @runstep="runAction")
            div.running-control
              div.btnSet
                div.btn-group.left
                  button.ui.button.teal(@click="closeSop") SOP종료
                  button.ui.button.teal(@click="passOperator") 제어권전달
                div.btn-wrap.right
                  button.ui.labeled.icon.button.blue(
                    v-if="activeCount>0",
                    @click="moveActiveStep('prev')")
                    i.icon.left.arrow
                    | 이전
                  button.ui.right.labeled.icon.button.blue(
                    v-if="activeCount<sopStepExecutMisnList.length-1",
                    @click="moveActiveStep('next')")
                    i.icon.right.arrow
                    | 다음
              
</template>

<script>
import SopManageApi from '@/api/SopManage'
import ActionSms from '@/components/ActionSmsRun'
import ActionBroad from '@/components/ActionBroadRun'
import ActionOrder from '@/components/ActionOrderRun'
import DataTable from '@/components/DataTable'
import { sopRunHistoryHeader } from '@/setting'
import { codeGenerator } from '@/setting'

export default {
  name: 'sop-run',
  data () {
    return {
      sopId: '',
      sopExecutSn:'',
      stepNo: 0,
      sopInformation: {},
      sopStepExecutMisnList: [],
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
      ],
      stepHistory: {
        header: sopRunHistoryHeader.headers,
        historyData: [],
        isfooter: false,
        isPagination: false,
        isListNumber: true,
        isSelect: false,
        itemkey: 'rn',
        pageInfo: {},
        tableType: 'compact'
      },
      
      activeStep: {},
      activeCount: 0,
      endMessage: ''
    }
  },
  components: {
    ActionSms,
    ActionBroad,
    ActionOrder,
    DataTable
  },
  created () {
    console.log(this.$route.params)
    this.sopId = this.$route.params.sopId
    this.sopExecutSn = this.$route.params.sopExecutSn
    this.getInfo()
    this.getStepList()
    this.getStepHistoryList()
    
    // this.closeSop()
  },
  methods: {
    getInfo () {
      const requestData = JSON.stringify({
        sopId: this.sopId,
        sopExecutSn: this.sopExecutSn
      })
      SopManageApi.getSopInfo(requestData).then(result => {
        console.log(result.data)
        this.sopInformation = result.data.selectSopExecutManagerInfo
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    getStepList () {
      const requestData = JSON.stringify({
        sopId: this.sopId,
        sopExecutSn: this.sopExecutSn,
        stepNo: 0
      })
      SopManageApi.runStepList(requestData).then(result => {
        console.log(result.data)
        this.sopStepExecutMisnList = result.data.sopStepExecutMisnList
        this.moveActiveStep ('')
      }).catch(error => {
        console.log(error)
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })

    },
    getStepHistoryList () {
      const requestData = JSON.stringify({
        sopId: this.sopId,
        sopExecutSn: this.sopExecutSn,
        stepNo: 0
      })
      SopManageApi.getSophistoryList(requestData).then(result => {
        console.log(result.data)
        this.stepHistory.historyData = result.data.selectSopStepExecutHistList
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
        this.$router.push({name:'sop-list'})
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })

    },
    runAction (actionData) {
      const req = {
        sopId: this.sopId,
        sopExecutSn: this.sopExecutSn,
        stepSn: this.activeStep.stepSn,
        stepNo: this.activeStep.stepNo,
        itemKnd: actionData.itemKnd
      }
      if(actionData.type == 'ActionSms') {
        Object.assign(req, {
          smsContents: actionData.smsContents,
          autoYn: actionData.autoYn,
          sopStepChrgEmpExecutList: actionData.sopStepChrgEmpExecutList,
        })
      }
      if(actionData.type == 'ActionBroad') {
        Object.assign(req, {
          brdcstContents: actionData.brdcstContents,
          autoYn: actionData.autoYn
        })
      } if(actionData.type == 'ActionOrder'){
        Object.assign(req, {
          drctContents: actionData.drctContents,
          autoYn: actionData.autoYn
        })
      }
      const requestData = JSON.stringify(req)
      SopManageApi.runStepAction(requestData).then(result => {
        console.log(result)
      }).catch(error => {
        const err = error.response
        console.log(err)
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
      this.activeStep = this.sopStepExecutMisnList[this.activeCount]
      this.$set(this.activeStep, 'historyList', [])
      this.activeHistory(this.activeStep)
    },
    activeHistory (step) {
      console.log(this.stepHistory.historyData)
      // if(this.stepHistory.historyData.length == 0) return 
      this.stepHistory.historyData.forEach(e => {
        if(e.stepNo == step.stepNo) {
          this.activeStep.historyList.push(e)
        }
      })
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
          .action-history {
            position: absolute;
            top: 0;
            left: 100%;
            display: none;
            background: rgba(0, 0, 0, 0.1);
            margin-left: 30px;
            min-width: 200px;
            width: 20rem;
            max-width: 20rem;
            .list .item {
              background-color: #fff;
              margin-bottom: 5px;
              padding: 3px;
            }
            // box-shadow: 0 0 5px #ddd;
            &.active {
              display: block
            }
            &:before {
              content: "";
              position: absolute;
              top: 20px;
              right: 100%;
              border-top: 5px solid transparent;
              border-left: 5px solid none;
              border-right: 5px solid rgba(0, 0, 0, 0.1);
              border-bottom: 5px solid transparent;
            }
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
        overflow-y: auto;
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
