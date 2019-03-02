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
                  :class="{active:node.stepSn == activeStep}",
                  @click="setActive(node)",
                  :id="`step_${index}`"
                  )
                  div.order {{index+1}}
                  div.step-content {{node.sopTitle}}
            div.history-wrapper
          div.running-view
            div.running-wrapper
              div.step-header
                h3 {{activeCount+1}}. {{activeStep.stepTitle}}
              div.step-content
            div.running-control
              div.btnSet
                div.btn-group.left
                  button.ui.button.orange SOP종료
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

export default {
  name: 'sop-run',
  data () {
    return {
      sopList: {
        sopTitle: '재난절차제목',
        stepList: [
          {stepTitle: '첫번째단계'},
          {stepTitle: '두번째단계'},
          {stepTitle: '세번째단계'},
          {stepTitle: '네번째단계'}
        ]
      },
      activeStep: {},
      activeCount: 0
    }
  },
  created () {
    console.log(this.$route.params)
    this.moveActiveStep ('')
  },
  methods: {
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
        .step-content {
          height: 94%;
          border: 1px solid rgba(0, 0, 0, 0.2);
          background-color: #fff;
        }
      }
      .step-control {
        height: 10%;
      }
    }
  }
}

</style>
