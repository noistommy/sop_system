<template lang="pug">
  div.insert-notice
    div.modal
      div.modal-header {{title}}
      div.modal-content
        div.date-wrapper 
          div 게시기간  
          template
            v-date-picker(mode='single', v-model='startDate', show-caps)
              div.ui.input(:type='inputState.type', slot-scope='props')
                input(
                :value='props.inputValue', 
                :placeholder='inputState.message',
                @input='props.updateValue($event.target.value, { formatInput: false, hidePopover: false })',
                @change='props.updateValue($event.target.value, { formatInput: true, hidePopover: false })', 
                expanded)
            span ~
            v-date-picker(mode='single', v-model='endDate', show-caps)
              div.ui.input(:type='inputState.type', slot-scope='props')
                input(
                :value='props.inputValue', 
                :placeholder='inputState.message',
                @input='props.updateValue($event.target.value, { formatInput: false, hidePopover: false })',
                @change='props.updateValue($event.target.value, { formatInput: true, hidePopover: false })', 
                expanded)

        div.content-wrapper
            div.ui.form
              table.ui.table
                tbody
                  tr(v-if="this.type=='edit'")
                    td 작성자
                    td
                      div.field
                        label
                        input(readonly="", v-model="setData.frstRegNm").readonly
                  tr
                    td 제목
                    td
                      div.field
                        label
                        input(type="text", v-model="setData.noticeTitle")
                  tr
                    td 내용
                    td
                      div.field
                        label
                        textarea(v-model="setData.noticeContents")
        div.btnSet.center
          button.ui.button.blue.large(@click="setNotice") 저장
          button.ui.button.large(@click="$emit('close')") 취소
      div.modal-close(@click="$emit('close')")
          //- i.icon.close
          div.close X
</template>

<script>
import SearchDate from '@/components/SearchDate'
import NoticeApi from '@/api/Notice'
import { convertDateFormat } from '@/util'
import { codeGenerator } from '@/util'
 
export default {
  name: 'insert-notice',
  components: {
    SearchDate
  },
  props: {
    type: String,
    title: String,
    notice: Object
  },
  data () {
    return {
      setData: this.notice,
      uploadDate: {
        start: new Date(),
        end: new Date(),
      },
      startDate: new Date(),
      endDate: new Date(),

    }
  },
  created () {
    if(this.type=='new') {
        this.setdata = {
          noticeTitle: '',
          noticeContents: '',
          ntceBeginDt: '',
          ntceEndDt:''
        }
      }
  },
  computed: {
    inputState() {
      if (!this.selectedValue) {
        return {
          type: 'is-danger',
          message: 'Date required.'
        }
      }
      return {
        type: 'is-primary',
        message: ''
      }
    }
  },
  methods: {
    // getNoticeItem() {
    //   const requestData = JSON.stringify({ noticeSn:this.noticeSn })
    //   NoticeApi.getItem(requestData).then(result => {
    //     this.setData = result.data
    //   }).catch(error => {
    //     console.log(error.response)
    //   })
    // },
    setNotice() {
      if(this.type=='new') {
        this.setdata = {
          noticeTitle: '',
          noticeContents: '',
          ntceBeginDt: '',
          ntceEndDt:''
        }
      }
      this.setData.ntceBeginDt = convertDateFormat(this.startDate, '')
      this.setData.ntceEndDt = convertDateFormat(this.endDate, '')
      if(this.setData.ntceEndDt==null) {this.setData.ntceEndDt = '99991231'}
      const requestData = JSON.stringify(this.setData)
      NoticeApi.setItem(requestData).then(result => {
        console.log(result)
        this.$emit('close')
        this.$modal.show('dialog', codeGenerator('Y', '저장되었습니다'))
      }).catch(error => {
        const err = error.response
        console.log(err)
        alert(err.data.msgValue)
      })

    }
  }
}
</script>

<style lang="less">
.insert-notice {
  .modal {
      background-color: #fff;
      // border: 1px solid #5d5e68;
      border-radius: 5px;
      // box-shadow: 0 0 10px rgba(0, 0, 0, .5);
      display: flex;
      flex-direction: column;
      position: relative;
      .modal-header {
          background-color: #363847;
          color: #fff;
          padding: .8em 1.2em;
          font-weight: 700;
      }
      .modal-content {
        flex-grow: 1;
        padding: 15px 15px 55px 15px;
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
      .btnSet {
        display: flex;
        justify-content: center;
      }
      .ui.form {
        td:nth-child(odd) {
          background-color: #f9fafb;
          text-align: center;
        }
        input.readonly {
          border: 0;
        }  
      }
      .date-wrapper {
        display: flex;
        align-items: center;
        > div, span {
          margin-right: 5px;
          &:nth-child(1) {
            text-align: center;
            width: 125px
          }
        }
      }
  }
}
</style>
