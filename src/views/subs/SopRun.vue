<template lang="pug">
  div.SopRun.sub-container
    modals-container
    div.sub-wrapper
      div.sub-content
        div.run-wrapper
          div.preview-view
            div.preview-header
              h3 
                span [{{sopInformation.msfrtnKndCdNm}} - {{sopInformation.crisisGnfdStepNm}}]
                span {{sopInformation.sopTitle}}
              div.sop-info
                div.sop-location {{sopInformation.displayBuldFloor}}
                div.sop-time {{sopInformation.displayExecutBeginDt}}
            div.node-wrapper
                div.node(
                  v-for="(node, index) in sopStepExecutMisnList",
                  :class="{active:index == activeCount}",
                  @click="setActive(node, index)",
                  :id="`step_${index}`"
                  )
                  div.order {{index+1}}
                  div.step-content.ellipse {{node.stepTitle}}
                  div.action-history(:class="{active:index == activeCount}", v-if="node.historyList.length > 0")
                    div.ui.list 
                      div.item(v-for="act in node.historyList") 
                        i.icon.mobile.alternate.blue(v-if="act.itemKndNm == '문자'")
                        i.icon.mobile.microphone.green(v-if="act.itemKndNm == '방송'")
                        i.icon.mobile.bullhorn.yellow(v-if="act.itemKndNm == '지시사항'")
                        div.content {{act.itemKndNm}} {{act.contents}}
                      
            div.history-wrapper(v-if="sopType == 'run'")
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
          div.running-view(v-if="sopType == 'run'")
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
          div.running-view(v-else)
            div.monitoring-header
                h3 실행이력
            div.monitoring-wrapper
              div.step-content
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
            div.running-control
              div.btnSet
                div.btn-group.left
                div.btn-wrap.right
                  button.ui.button.blue(@click="closeSopMonitor") 모니터링 종료
              
</template>

<script>
import SopManageApi from '@/api/SopManage'
import ActionSms from '@/components/ActionSmsRun'
import ActionBroad from '@/components/ActionBroadRun'
import ActionOrder from '@/components/ActionOrderRun'
import DataTable from '@/components/DataTable'
import CloseMessageModal from '@/components/CloseMessageModal'
import { sopRunHistoryHeader } from '@/setting'
import { codeGenerator } from '@/util'
import { setInterval } from 'timers';

export default {
  name: 'sop-run',
  data () {
    return {
      iwId: '',
      iwSelect: {},
      sopType: '',
      sopId: '',
      sopExecutSn:'',
      stepNo: 0,
      sopInformation: {},
      sopStepExecutMisnList: [],
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
    this.iwId = this.$route.params.iwId
    this.iwSelect = this.$route.params.selectData
    this.sopId = this.$route.params.sopId
    this.sopExecutSn = this.$route.params.sopExecutSn
    this.sopType = this.$route.params.type
    this.getInfo()
    this.getStepList()
    this.getStepHistoryList()
    // setInterval(() => {
    //   this.getStepHistoryList()
    // },3000)
    
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
        stepNo: ''
      })
      SopManageApi.runStepList(requestData).then(result => {
        console.log(result.data)
        this.sopStepExecutMisnList = result.data.sopStepExecutMisnList
        this.sopStepExecutMisnList.forEach(e => {
          this.$set(e, 'historyList', [])
          this.activeHistory (e)
          // e.forEach(item => {
          //   this.$set(e, 'stateCode', false)
          // })
        })
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
      const closeData = {
        sopId: this.sopId,
        sopExecutSn: this.sopExecutSn,
        endResn: '',
      }
      this.$modal.show(CloseMessageModal, {
        title: '사유작성',
        text: '',
        data: closeData
      },{
        width: '350px',
        height: 'auto',
        clickToClose: false
      })
    },
    closeSopMonitor () {
      this.$modal.show()
      this.$router.push({name:'sop-list'})
    },
    passOperator () {
      const requestData = JSON.stringify({
        sopId: this.sopId,
        sopExecutSn: this.sopExecutSn
      })
      SopManageApi.passOperation(requestData).then(result => {
        console.log(result.data)
          this.$modal.show('dialog', {
            title: '알람',
            text: '제어권한이 해제되었습니다.'
          })
        this.$router.push({name:'sop-list'})
      }).catch(error => {
        const err = error.response
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })

    },
    runAction (actionData) {
      let req = {
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
          sopStepChrgEmpExecutList: actionData.sopStepExecutChrgEmpList,
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
      console.log(actionData, req)
      const requestData = JSON.stringify(req)
      SopManageApi.runStepAction(requestData).then(result => {
        console.log(result)
        this.getStepHistoryList()
      }).catch(error => {
        const err = error.response
        console.log(err.data.msgCode)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
        // if(err.data.msgCode == 'B') {
        //   this.$router.push({name:'sop-list'})
        // }
      })


    },
    setActive (step, i) {
      this.activeStep = step
      this.activeCount = i
      this.activeHistory (step)
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
      
      this.activeHistory(this.activeStep)
    },
    activeHistory (step) {
      step.historyList = []
      if (this.stepHistory.historyData.length == 0) return 
      this.stepHistory.historyData.forEach(e => {
        if(e.stepNo == step.stepNo) {
          step.historyList.push(e)
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
        overflow-x: hidden;
        .node {
          display: inline-block;
          background-color: #fff;
          width: 50%;
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
            width: 80%;
          }
          .step-content.ellipse {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
        background-color: #fff;
        padding: 15px;
      }
    }
    .running-view {
      width: 60%;
      padding-left: 20px;
      .monitoring-header {
        margin-bottom: 20px;
      }
      .monitoring-wrapper {
        height: 85%;
        border: 1px solid rgba(0, 0, 0, 0.2);
        margin-top: 10px;
        overflow-y: auto;
        padding: 15px;
        background-color: #fff;
      }
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
