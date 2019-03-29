<template lang="pug">
   modal(name="check-msg-modal", width='350px', height='350px' :clickToClose="false", @before-open="setProps")
    div.modal
      div.modal-header {{title}}
      div.modal-content 
        //- div.discription {{text}}
        div.content-text {{contentData}}
        div.state-message {{message}}
        div.foot-btn
          button.ui.floated.right.button(@click="$emit('close')", :class="contentYn=='Y'?'green':'orange'") {{contentYn=='Y'?'정상':'오류'}}
      div.modal-close(@click="$emit('close')")
          div.close X
</template>

<script>
import UsersApi from '@/api/Users'

export default {
  name: 'check-media-modal',
  components: {
  },
  // props: {
  //   title: String,
  //   text: String,
  //   data: Object
  // },
  data () {
    return {
      title: '',
      text:'',
      contentData: '',
      contentYn:'',
      message:''
    }
  },
  created () {
  },
  methods: {
    setProps (event) {
      this.title = event.params.title
      this.text = event.params.text
      this.contentData = event.params.data.vrifyContents
      this.contentYn = event.params.data.vrifyYn
      this.message = event.params.data.vrifyMessage
    }
  }
}
</script>

<style lang="less">

.modal {
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
        .content-text {
          width: 100%;
          padding: 15px;
          background-color: #f9f9f9;
          height: 180px;
          white-space: normal !important;
          overflow-y: auto;
          word-break:break-all;
        }
        .state-message {
          padding: 15px;
        }
        .foot-btn {
          width: 100%;
          position:absolute;
          left: 0;
          bottom: 20px;
          display: flex;
          justify-content: center;
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
      .noposition {
        position: none;
      }
    }
    .ui.form {
      .inline {
        label {
          width: 32%;
        }
      }
    }
}
</style>
