<template lang="pug">
modal(name="run-sop-modal", width="350", height="200", @before-open="setProps")
  div.modal.select-sop-info
      div.modal-header {{title}}
      div.modal-content.run-sop-modal
        div.ui.attached.segment.inverted
          ul.ui.list.bulleted
            li.item 재난위치: {{runSopData.msfrtnLc}}
            li.item 재난절차: {{runSopData.msfrtnProcss}}
            li.item 발생시간: {{runSopData.occrrncTm}}
        div.ui.bottom.attached.segment.inverted
          div.seg-btn.center
            button.ui.button.blue.mini(v-if="runSopData.executPosblYn == 'Y'", @click='runSelectSop') 실행
            button.ui.button.yellow.mini(@click='monitoringSop') 모니터링
            button.ui.button.mini(@click="$emit('close')") 취소
      div.modal-close(@click="$emit('close')")
          div.close X
              
</template>

<script>
import DataList from '@/components/DataList.vue'
import SopSlideApi from '@/api/SopSlide'
import { codeGenerator } from '@/util'
import { EventBus } from '@/util'

export default {
  name: 'run-sop-modal',
  // props: {
  //   data: Object,
  //   title: String,
  //   text: String
  // },
  data () {
    return {
      title: '',
      data: '',
      runSopData: [],
      runParams: {},
      type: ''
    }
  },
  components: {
  },
  created () {
    // 
  },
  methods: {
    setProps (event) {
      this.title = event.params.title
      this.data = event.params.data
      this.getSopInfo()

      // if(this.$route.name == 'sop-run') {
      //     this.$router.push({name: 'sop-list'})
      //   }
    },
    getSopInfo () {
      const requestData = JSON.stringify({
        sopId: this.data.sopId,
        sopExecutSn: this.data.sopExecutSn
      })
      SopSlideApi.runSopInfo(requestData).then(result => {
        console.log(result.data)
        this.runSopData = result.data.legacySopExecut
      }).catch(error => {
        const err = error.response
        console.log(err)
        if(err) {
          alert(err.data.msgValue)
        }
      })
    },
    runSelectSop () {
       if(this.$route.name == 'sop-run') {
          const sopInfo = {
            sopId:this.data.sopId,
            sopExecutSn:this.data.sopExecutSn,
            type: 'run'
          }
          EventBus.$emit('trans-sop', sopInfo)
        }
      if( this.runSopData != undefined) {
        this.$router.push({ 
          name: 'sop-run',
          params: { 
            sopId: this.data.sopId,
            sopExecutSn:this.data.sopExecutSn,
            type: 'run' 
            }
          })
        this.$emit('close')
      }else {
        alert('SOP를 선택하세요')
      }
    },
    monitoringSop () {
      if(this.$route.name == 'sop-run') {
          const sopInfo = {
            sopId:this.data.sopId,
            sopExecutSn:this.data.sopExecutSn,
            type: 'monitor'
          }
          EventBus.$emit('trans-sop', sopInfo)
        }
      if( this.runSopData != undefined) {
        this.$router.push({ 
          name: 'sop-run',
          params: {
            sopId: this.data.sopId,
            sopExecutSn:this.data.sopExecutSn,
            type: 'monitoring'
            }
          })
        this.$emit('close')
      }else {
        alert('SOP를 선택하세요')
      }
    }
  }
  
}
</script>

<style lang="less" scoped>
// .modal.select-sop-info {
//     background-color: #fff;
//     position: relative;
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     position: relative;
//     .modal-header {
//         background-color: #5d5e68;
//         color: #fff;
//         padding: .8em 1.2em;
//         font-weight: 700;
//     }
    
// }
.modal-content.run-sop-modal {
  flex-grow: 1;
  padding: 0;
  background-color: rgba(0, 0, 0, 0.2);
}
.ui.bottom.attached.segment {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 20px 0;
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
</style>

