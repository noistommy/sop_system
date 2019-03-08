<template lang="pug">
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
  props: {
    title: String,
    text: String,
    data: Object
  },
  data () {
    return {
      contentData: this.data.vrifyContents,
      contentYn:this.data.vrifyYn,
      message:this.data.vrifyMessage
    }
  },
  created () {
  },
  methods: {
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
          padding: 15px;
          background-color: #f9f9f9;
        }
        .state-message {
          padding: 15px;
        }
        .foot-btn {
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
