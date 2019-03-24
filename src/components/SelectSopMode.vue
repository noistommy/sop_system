<template lang="pug">
  div.modal.user-editor
    div.modal-header {{title}}
    div.modal-content 
      div.content-wrapper
        div.ui.form.tiny
          table.ui.table
            tbody
              tr
                td.center.aligned 
                  span 실행모드
                td
                  div.field
                    button.ui.button.mini(@click="activeMode('S0700900')", :class="{blue:modeData.executFgCd == 'S0700900'}") 훈련모드
                    button.ui.button.mini(@click="activeMode('S0700100')", :class="{blue:modeData.executFgCd == 'S0700100'}") 실제상황
              tr
                td.center.aligned 
                  span 건물명
                td
                  div.fields
                    div.field.wide.nine
                      select.ui.fluid.selection.dropdown(v-model="modeData.buldId", @change="getFloor")
                        option(value="") 건물선택
                        option(v-for="build in buldInfo", :value="build.buldId") {{build.buldNm}}
                    div.field.wide.six
                      select.ui.selection.dropdown(v-model="modeData.buldFloor")
                        option(value="") 층선택
                        option(v-for="floor in floorInfo", :value="floor.buldFloor") {{floor.buldFloor}}
              tr
                td.center.aligned 
                  span 시간
                td
                  div.field
                    span {{modeData.executBeginDt}}
              tr
                td.center.aligned 
                  span 설명
                td
                  check-text-count(
                    :formType="formData",
                    :rownum='3',
                    :maxLength='200',
                    v-model="modeData.sopExecutResn",
                    @input="returnText")
                  
            
    div.btnSet.center
      button.ui.button.green(@click="goToSopRun") SOP실행
      button.ui.button(@click="$emit('close')") 취소
    div.modal-close(@click="$emit('close')")
        div.close X
</template>

<script>
import PublicCodeApi from '@/api/PublicCode'
import SopManageApi from '@/api/SopManage'
import CheckTextCount from '@/components/CheckTextCount.vue'
import { codeGenerator } from '@/util'
import LocationApi from '@/api/Location'

export default {
  name: 'code-editor',
  components: {
    CheckTextCount
  },
  props: {
    data: Object,
    title: String,
    type: String,
    item: String,
    buildings: Array
  },
  data () {
    return {
      modeData: {
        sopId: this.data.sopId,
        buldId: '',
        buldFloor: '',
        executFgCd: 'S0700900',
        executBeginDt: '',
        sopExecutResn: ''
      },
      buildingList: [],
      buldInfo: this.buildings,
      floorInfo: [],
      formData: 'textarea',
      selectBuilding: ''
    }
  },
  created () {
    const current = new Date()
    this.modeData.executBeginDt = `${current.getFullYear()}년 ${current.getMonth() + 1}월 ${current.getDate()}일`
    // this.getBuldingList()

  },
  mounted () {
    $('.ui.dropdown').dropdown()
  },
  computed: {
    floorLength () {
      return this.floorInfo.length
    }
  },
  // watch: {
  //   selectBuilding () {
  //     this.getFloorList(this.selectBuilding)
  //   }
  // },
  methods: {
    activeMode (mode) {
      this.modeData.executFgCd = mode
    },
    getFloor (event) {
      this.buldInfo.forEach(e => {
        if(e.buldId == event.target.value) {
          this.floorInfo = e.buldFloorList
        }
      })
    },
    // getBuldingList () {
    //   LocationApi.getList().then(result => {
    //     console.log(result.data)
    //     this.buildingList = result.data.buldManageList
    //   })
    // },
    // getFloorList (buildId) {
    //   this.floorInfo.floorList = []
    //   const requestData = JSON.stringify({
    //     buldId: buildId
    //   })
    //   LocationApi.getItem(requestData).then(result => {
    //     console.log(result.data)
    //     this.modeData.buldId = result.data.buldManageInfo.buldId
    //     this.floorInfo.floorList = result.data.buldFloorInfoList
    //   })
    // },
    goToSopRun () {
      const requestData = JSON.stringify(this.modeData)
      SopManageApi.runStepListByOper(requestData).then(result => {
        console.log(result.data)
        this.$router.push({ name: 'sop-run', params: {
          sopId: result.data.sopId,
          sopExecutSn: result.data.sopExecutSn,
          type: 'run'}
        })
        this.$emit('close')
      }).catch(error => {
        this.$emit('close')
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    },
    returnText (text) {
      this.modeData.sopExecutResn = text
    },
    showDailog () {
      let options = {
        title: '실행확인',
        text: ''
      }
      if(this.item == 'group') {
        options.text = '그룹코드가 '
      }else {
        options.text = '코드가 '
      }
      if(this.type == 'new') {
        options.text += '생성되었습니다'
      }else {
        options.text += '수정되었습니다'
      }
      this.$modal.show('dialog', options)
    }
  }
}
</script>

<style lang="less">
.modal.user-editor {
    background-color: #fff;
    position: relative;
    height: 100%;
    // border: 1px solid #5d5e68;
    // border-radius: 5px;
    // box-shadow: 0 0 10px rgba(0, 0, 0, .5);
    display: flex;
    flex-direction: column;
    position: relative;
    .modal-header {
        background-color: #5d5e68;
        color: #fff;
        padding: .8em 1.2em;
        font-weight: 700;
    }
    .modal-content {
        flex-grow: 1;
        padding: 15px;
        .content-wrapper {
          padding: 15px 15px 55px 15px;
          .ui.table {
            td {
              overflow: visible !important;
            }
            td:nth-child(odd) {
              text-align: center;
              width: 100px;
              min-width: 100px;
              background-color: #f9fafb;
              
            }
          }
        }
    }
    .modal-close {
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 2px 4px;
        border-radius: 3px;
        color: #fff;
        // background-color: #fff;
        font-size: 1rem;
        i {
          margin:0;
        }
        &:hover {
          background-color: #fff;
          color: #5d5e68;
        }
    }
    &.small {width: 300px;}
    &.large {width: 600px;}
    &.full {width: 90%;}
    .msgError {
      text-align: center;
      font-size: 0.8rem;
    }
    .error {
      color: #9f3a38;
    }
    .btnSet {
      position:absolute;
      padding: 15px 0;
      width: 100%;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      .ui.button {
        border-radius: 0 !important;
      }
    }
    
}
</style>
