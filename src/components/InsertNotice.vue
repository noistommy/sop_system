<template lang="pug">
  div.insert-notice
    div.modal
      div.modal-header {{title}}
      div.modal-content
        div.content-wrapper
          div.ui.form
            div.field(v-if="this.type=='edit'")
              label 작성자
              input(readonly).readonly
            div.field
              label 제목
              input(type="text", v-model="setData.noticeTitle")
            div.field
              label 내용
              textarea(rows="3", v-model="setData.noticeContents")
        div.btnSet.center
          button.ui.button.blue.large(@click="setNotice") 저장
          button.ui.button.large(@click="$emit('close')") 취소
      div.modal-close(@click="$emit('close')")
          //- i.icon.close
          div.close X
</template>

<script>
import NoticeApi from '@/api/Notice'
export default {
  name: 'insert-notice',
  components: {
  },
  props: {
    type: String,
    title: String,
    noticeId: String
  },
  data () {
    return {
      setData: {
        noticeTitle: '',
        noticeContents: ''
      }
    }
  },
  created () {
    this.getNoticeItem()
  },
  methods: {
    getNoticeItem() {
      const requestData = JSON.stringify({ noticeSn:this.noticeSn })
      NoticeApi.getItem(requestData).then(result => {
        this.setData = result.data
      }).catch(error => {
        console.log(error.response)
      })
    },
    setNotice() {
      const requestData = JSON.stringify(this.setData)
      NoticeApi.setItem(requestData).then(result => {
        console.log(result)
      }).catch(error => {
        console.log(error.response)
      })

    }
  }
}
</script>

<style lang="less">
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
      padding: 15px;
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
    .ui.form input.readonly {
      border: 0;
    }
}
</style>
