<template lang="pug">
div.modal.select-sop-info
    div.modal-header {{title}}
    div.modal-content 
      div.content-wrapper
        div.list-content
          div.ui.attached.segment.inverted
            ul.ui.list.bulleted
              li.item 재난위치: {{runSopData.msfrtnLc}}
              li.item 재난절차: {{runSopData.msfrtnProcss}}
              li.item 발생시간: {{runSopData.occrrncTm}}
          div.ui.bottom.attached.segment.inverted
            div.seg-btn.center
              button.ui.button.blue.mini(v-if="runSopData.executPosblYn == 'Y'", @click='runSelectSop') 실행
              button.ui.button.yellow.mini(@click='errorSelectSop') 모니터링
              button.ui.button.mini(@click="$emit('close')") 취소
        div.modal-close(@click="$emit('close')")
            div.close X
              
</template>

<script>
import DataList from '@/components/DataList.vue'
import SopSlideApi from '@/api/SopSlide'
import { codeGenerator } from '@/util'

export default {
  name: 'run-sop-modal',
  props: {
    data: Object,
    title: String,
    text: String
  },
  data () {
    return {
      runSopData: [],
      runParams: {}
    }
  },
  components: {
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      const requestData = JSON.stringify({
        sopId: this.data.sopId,
        sopExecutSn: this.data.sopExecutSn
      })
      SopSlideApi.runSopInfo(requestData).then(result => {
        console.log(result.data)
        this.runSopData = result.data.legacySopExecut
      }).catch(error => {
        this.$emit('close')
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
      
    },
    runSelectSop () {
      if( this.runSopData != undefined) {
        this.$router.push({ name: 'sop-run', params: this.runSopData})
        this.$emit('close')
      }else {
        alert('SOP를 선택하세요')
      }
    },
    errorSelectSop () {
      const requestData = JSON.stringify({
        iwId: this.data.iwId
      })
      SopSlideApi.setErrorSop(requestData).then(result => {
        console.log(result.data)
      }).catch(error => {
        this.$emit('close')
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
    }
  }
  
}
</script>

<style lang="less">
.modal.select-sop-info {
    background-color: #fff;
    position: relative;
    height: 100%;
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
        padding: 5px;
        background-color: rgba(0, 0, 0, 0.2);
        .content-wrapper {
          height: 100%;
          padding: 0;
          .list-content {
            height: 88%;
            .ui.bottom.attached.segment {
              background-color: rgba(0, 0, 0, 0.8);
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
    .seg-btn {
      display:flex;
      .ui.button {
        border-radius: 0 !important;
      }
      &.center {
        justify-content: center;
      }
    }
    .ui.table {
      td:nth-child(odd) {
        text-align: center;
        min-width: 100px;
        background-color: #f9fafb;
      }
    }
}
</style>

