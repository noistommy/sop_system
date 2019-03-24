<template lang="pug">
modal(name='run-sensor-list', :width='600', :height='600', :clickToClose="false", @before-open="setProps")
  div.modal.select-sensor
      div.modal-header {{title}} ({{text}})
      div.modal-content 
        div.content-wrapper
          div.list-content
            DataList(
              v-model="selected",
              :headers="headers",
              :items="runBySensorData",
              :itemKey="itemkey",
              :isListNumber="isListNumber"
            )
              template(slot="items", slot-scope="props")
                div.item.lr.listitem(@click="selectedItem(props)" )
                  .ld.center {{props.item.msfrtnKndNm}}
                  .ld.center {{props.item.crisisGnfdStepNm}}
                  .ld.center {{props.item.sopTitle}}
                  .ld.center {{props.item.executYnNm}}
          div.btnSet.right
            button.ui.button.blue(@click='runSelectSop') 실행
            button.ui.button.yellow(@click='errorSelectSop') 오작동
            button.ui.button(@click="$emit('close')") 취소
          div.modal-close(@click="$emit('close')")
              div.close X
              
</template>

<script>
import DataList from '@/components/DataList.vue'
import SopSlideApi from '@/api/SopSlide'
import { codeGenerator } from '@/util'

export default {
  name: 'run-sensor-list',
  // props: {
  //   data: String,
  //   title: String,
  //   text: String
  // },
  data () {
    return {
      selected:[],
      headers: [
        { text: '재난종류', align: 'center', value: 'msfrtnKndNm', size: '' },
        { text: '위기발령단계', align: 'center', value: 'crisisGnfdStepNm', size: '' },
        { text: 'SOP명', align: 'center', value: 'sopTitle', size: '' },
        { text: '종료여부', align: 'center', value: 'executYnNm', size: '' }
      ],
      runBySensorData: [],
      isListNumber: false,
      itemkey: 'sopExecutSn',
      runParams: {},
      title: '',
      text: '',
      data: ''
    }
  },
  components: {
    DataList
  },
  created () {
    this.getList()
  },
  methods: {
    setProps (event) {
      this.title = event.params.title
      this.text = event.params.text
      this.data = event.params.data
    },
    selectedItem(itemInfo) {
      this.selected = []
      if(!itemInfo.selected) {
        this.selected.push(this.sopList.sopListData[itemInfo.idx])
      }
    },
    getList () {
      if(this.data == '') return 
      const requestData = JSON.stringify({
        iwId: this.data
      })
      SopSlideApi.getPopupItem(requestData).then(result => {
        console.log(result.data)
        this.runBySensorData = result.data.sopChoisePopupList
      }).catch(error => {
        this.$emit('close')
        const err = error.response
        console.log(err)
        this.$modal.show('dialog', codeGenerator(err.data.msgCode, err.data.msgValue))
      })
      
    },
    runSelectSop () {
      if( this.selected[0] != undefined) {
        this.$router.push({ name: 'sop-run', params: { iwId: this.data, selectData:this.selected[0] }})
        this.$emit('close')
      }else {
        alert('SOP를 선택하세요')
      }
    },
    errorSelectSop () {
      const requestData = JSON.stringify({
        iwId: this.data
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
.modal.select-sensor {
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
        padding: 15px;
        .content-wrapper {
          height: 100%;
          padding: 0;
          .list-content {
            height: 88%;
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
      padding: 15px;
      width: 100%;
      right: 15px;
      bottom: 0;
      display: flex;
      justify-content: flex-end;
      .ui.button {
        border-radius: 0 !important;
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

