<template lang="pug">
  div.SopEdit.sub-container
    modals-container(
      name="locationmodal",
      @location="setLocationList",
      @select="insertData"
      )
    div.sub-wrapper
      div.baseInfo.ui.form
        div.base-info.info-1
          label
          select(v-model="sopNewData.msfrtnKndCd")
            option(value="") 재난종류
            option(v-for="code in typeCode", :value="code.cmmnCd") {{code.cmmnCdNm}}
        div.base-info.info-2
          select(v-model="sopNewData.crisisGnfdStepCd")
            option(value="") 위기발령단계
            option(v-for="code in stepCode", :value="code.cmmnCd") {{code.cmmnCdNm}}
        div.base-info.info-3
          div.ui.input(@click="selectLocation")
            input(type="text", placeholder="건물/층 선택")
        div.base-info.info-4
          div.ui.input.fluid
            input(type="text", placeholder="재난절차제목입력", v-model="sopNewData.sopTitle")
        div.base-info.info-5
          button.ui.button.blue(@click="createSop") 재난절차저장
      div.sub-content
        div.content
          div.editor-wrapper
            div.preview-view
              div.node-wrapper
                div.node(
                  v-for="(node, index) in sopNewData.sopStepList",
                  :class="{active:node.stepNo == activeStep}",
                  @click="setActive(node)",
                  :id="`step_${index}`"
                  )
                  div.order {{index+1}}
                  div.step-content {{node.stepTitle}}
            div.editor-view
              div.edit-header
                div.ui.buttons
                  //- div.ui.left.labeled.button
                  //-   div.ui.basic.right.pointing.label STEP
                  button.ui.button.blue.mini(@click='createStep') 추가
                  button.ui.button.blue.mini(@click='copyStep') 복사
                  button.ui.button.blue.mini(@click='deleteStep') 삭제
                div.ui.buttons.right.floated
                  button.ui.button.olive.mini(@click="addAction('sms')") 문자
                  button.ui.button.olive.mini(@click="addAction('broad')") 방송
                  button.ui.button.olive.mini(@click="addAction('order')") 지시사항
              div.edit-content
                div.steps-wrapper
                  div.step(
                    v-for="(step, index) in sopNewData.sopStepList",
                    :class="{active:step.stepNo == activeStep}",
                    @click="setActive(step)",
                    :id="`step_${step.stepSn}`"
                    )
                    div.step-header
                      div.ui.input.fluid.small.labeled
                        label.ui.label {{index+1}}
                        input(type="text", placeholder="제목을 입력하세요", v-model="step.stepTitle")
                    div.step-content
                      div.action
                        template(v-for="(action, index) in step.actionItem")
                          component(
                            v-model="step.actionItem[index]",
                            :is='action.type',
                            :idx="index",
                            :paramCode="paramCode",
                            :isUpdate = "isupdate"
                            @delete="deleteAction(step, index)"
                            )
                    div.step-editor(v-if="step.stepSn == activeStep")
                      div.btnSet
                        div.btn-group.left
                        div.btn-wrap.right
                          button.ui.icon.button.mini(@click="moveIndex('down', index)")
                            i.icon.angle.down
                          button.ui.icon.button.mini(@click="moveIndex('up', index)")
                            i.icon.angle.up
        div.footer
</template>

<script>
import PublicCodeApi from '@/api/PublicCode'
import SopManageApi from '@/api/SopManage'
import ActionSms from '@/components/ActionSms.vue'
import ActionBroad from '@/components/ActionBroad.vue'
import ActionOrder from '@/components/ActionOrder.vue'
import SelectLocation from '@/components/SelectLocation.vue'
import { codeGenerator } from '@/util'

export default {
  name: 'sop-edit',
  data () {
    return {
      sopNewData: {
        sopId: '',
        msfrtnKndCd: '',
        crisisGnfdStepCd: '',
        sopTitle: '',
        sopMapngCd: '',
        sopBuldMapngList: [],
        sopStepList: [
          {
            stepNo: '',
            stepSn: 1,
            stepTitle: '',
            actionItem: []
          }
        ]
      },
      req: {
        msfrtnKndCd: "",
        crisisGnfdStepCd: "",
        sopTitle: ""
      },
      typeCode: [],
      stepCode: [],
      paramCode: [],
      actions: '',
      formType: 'textarea',
      textareaData: '',
      activeStep: '1',
      selectedStep: [],
      selectActionData: [
      ],
      deleteList: [],
      newStepNo: 1,
      isupdate: true
    }
  },
  components: {
    ActionSms,
    ActionBroad,
    ActionOrder
  },
  created () {
    this.sopNewData.sopId = this.$route.params.sopId
    this.sopNewData.sopMapngCd = this.$route.params.sopMapngCd
    this.getCodeList('S090')
    this.getCodeList('S100')
    this.getCodeList('S080')
    this.setActive(this.sopNewData.sopStepList[0])
    if(this.sopNewData.sopId) {
      this.getSopItem()
    }
  },
  mounted () {
    $('.ui.dropdown').dropdown()
    $('.ui.checkbox').checkbox()
  },
  updated () {
    console.log('update')
  },
  methods: {
    getCodeList (code) {
      const requestData = JSON.stringify({
        cmmnCd: code
      })
      PublicCodeApi.getList(requestData).then(result => {
        console.log(result)
        if(code === 'S090') {
          this.typeCode = result.data.cmmnCdGroupList
        }
        if(code === 'S100') {
          this.stepCode = result.data.cmmnCdGroupList
        }
        if(code === 'S080') {
          this.paramCode = result.data.cmmnCdGroupList
        }
      }).catch(error => {
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    getSopItem () {
      const requestData = JSON.stringify({
        sopId: this.sopNewData.sopId
      })
      SopManageApi.getItem(requestData).then(result => {
        console.log(result.data)
        this.sopNewData = result.data
      }).catch(error => {
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    createSop () {
      const requestData = JSON.stringify(this.sopNewData)
      SopManageApi.createItem(requestData).then(result => {
        console.log(result.data)
        this.$router.push({name:'sop-list'})
      }).catch(error => {
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    selectLocation () {
      this.$modal.show(SelectLocation,{
        modal:'locationmodal',
        title: '건물/층 선택'
      },{
        height: '80%'
      })
    },
    
    setLocationList(local) {
      this.sopNewData.sopBuldMapngList = local
    },
    saveSop () {
      this.$modal.show('dialog',{
        title: '저장확인',
        text: '저장하시겠습니까?'
      })
    },
    setActive (step) {
      this.selectedStep = step
      this.activeStep = step.stepNo
      this.deleteList = []
    },
    createStep () {
      const newstep = {
        stepNo: this.newStepNo + 1,
        stepSn: '',
        stepTitle: '',
        actionItem: []
      }
      this.sopNewData.sopStepList.push(newstep)
      this.newStepNo++
    },
    copyStep () {
      const copyStep = {
        stepNo: this.newStepNo + 1,
        stepSn: '',
        stepTitle: '',
        actionItem: []
      }
      copyStep.stepNo = this.selectedStep.stepNo
      copyStep.stepTitle = this.selectedStep.stepTitle
      this.selectedStep.actionItem.forEach((item,i) => {
        copyStep.actionItem.push(item)
      })
      console.log(copyStep)
      // copyStep.actionItem = this.selectedStep.actionItem
      // const step = this.selectedStep
      // const copyStep = Object.assign({}, step)
      copyStep.stepNo = this.newStepNo + 1
      this.sopNewData.sopStepList.push(copyStep)
      this.newStepNo++
    },
    deleteStep () {
      if(this.sopNewData.sopStepList.length == 1) return 
      this.sopNewData.sopStepList.forEach((step, i) => {
        if(step.stepSn == this.selectedStep.stepSn) {
          this.sopNewData.sopStepList.splice(i, 1)
          return
        }
      })
    },
    addAction (actionType) {
      const actionItem = {
        type: '',
        itemKnd: '',
        stepNo: '',
        stepSn: '',
        autoYn: '',
        ischeck: false
      }
      if(actionType == 'sms') {
        actionItem.type = 'ActionSms'
        actionItem.itemKnd = 'S0500100'
        Object.assign(actionItem,{
          smsContents: '',
          inputParam1: '',
          inputParam2: '',
          inputParam3: '',
          inputParam4: '',
          inputParam5: '',
        })
      }
      if(actionType == 'broad') {
        actionItem.type = 'ActionBroad'
        actionItem.itemKnd = 'S0500200'
        Object.assign(actionItem,{
          brdcstContents: '',
          inputParam1: '',
          inputParam2: '',
          inputParam3: '',
          inputParam4: '',
          inputParam5: '',
        })
      }
      if(actionType == 'order') {
        actionItem.type = 'ActionOrder'
        actionItem.itemKnd = 'S0500300'
        Object.assign(actionItem,{smsContents: ''})
      }
      this.sopNewData.sopStepList.forEach((step, i) => {
        if(step.stepSn == this.selectedStep.stepSn) {
          console.log(step)
          this.sopNewData.sopStepList[i].actionItem.push(actionItem)
        }
      })
    },
    actionDelete (selectedStep) {
      const items = []
      this.selectedStep.actionItem.forEach((e,i) => {
        
        if(!e.ischeck) {
          items.push(e)
        }
      })
      console.log(items)
      this.selectedStep.actionItem = items
    },
    deleteAction (step, index) {
      this.selectedStep.actionItem.splice(index, 1)
    },
    moveIndex(type, index) {
      const moveStep = this.sopNewData.sopStepList.splice(index, 1)
      console.log(moveStep)
      if(type == 'up') {
        this.sopNewData.sopStepList.splice(index-1, 0, moveStep[0])
      } else {
        this.sopNewData.sopStepList.splice(index+1, 0, moveStep[0])
      }
    },
    insertData (insert) {
      console.log(insert)
       this.sopNewData.sopStepList.forEach((step, i) => {
         if(insert.stepNo == step.stepNo) {
           step.actionItem.forEach((act, j) => {
             if(insert.stepSn == act.stepSn) {
              //  this.sopNewData.sopStepList[i].actionItem[j] = Object.assign({}, this.sopNewData.sopStepList[i].actionItem[j], insert.action)
              Object.assign(act, insert.action)
              this.isupdate = true
             }
           })
         }
       })
    }
  }
}
</script>

<style lang="less" scoped>
.SopEdit {
  .sub-content {
    .content {
      height: 100%;
    }
  }
  .baseInfo {
    min-height: 50px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    .base-info {
      padding: 0 5px
    }
    .info-4 {
      flex-grow:1;
    }
  }
  .editor-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
    
    .preview-view {
      // height: 100%;
      width: 40%;
      min-width: 500px;
      background-color: #f3f2f2;
      box-shadow: inset 0 0 15px 5px rgba(0, 0, 0, 0.06);
      border: 1px solid rgba(0, 0, 0, 0.06);
      .node-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: auto; 
        height: 100%;
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
    }
    .editor-view {
      width:60%;
      height: 100%;
      border: 1px solid rgba(0, 0, 0, 0.2);
      // flex-grow: 1;
      display: flex;
      flex-direction: column;
      .edit-header {
        height: 55px;
        background-color: #363847;
        padding: 10px 10px;
      }
      .edit-content {
        flex-grow: 1;
        overflow-y: auto;
        .steps-wrapper {
          width: 100%;
          height: 100%;
          padding: 10px 15px;
          .step {
            width: 100%;
            height: auto;
            border: 1px solid rgba(0, 0, 0, 0.2);
            padding: 8px 12px;
            margin-bottom: 10px;
            .step-header {
              
            }
            .step-content {
              
            }
            &.active {
              border: 1px solid rgba(1, 120, 199, 0.534);
              box-shadow: 0 0 5px rgba(0, 52, 87, 0.534);
            }
          }
        }
      }
    }
  }
  .ui.buttons > button {
    margin-right: 3px;
  }
}

</style>
