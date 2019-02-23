<template lang="pug">
    div.checkText.field
        textarea(v-if="formType == 'textarea'", v-model="checkText" :rows="rownum")
        input(v-else, v-model="checkText")
        div.text-counter
            div.check-text 현재 
                span.byte {{byteCal}} 
                | byte | 최대 {{maxLength}} byte
</template>

<script>
export default {
  name: "chack-text-count",
  props: {
    formType: String,
    rownum: Number,
    value: String,
    maxLength: Number
  },
  data() {
    return {
      codeByte: 0,
      checkText: '내용입력'
    };
  },
  created() {
  },
  updated() {
      this.checkText = this.value
  },
  computed: {
    byteCal() {
      for (let idx = 0; idx < this.checkText.length; idx++) {
        const oneChar = escape(this.checkText.charAt(idx));
        if (oneChar.length == 1) {
          this.codeByte++;
        } else if (oneChar.indexOf("%u") != -1) {
          this.codeByte += 2;
        } else if (oneChar.indexOf("%") != -1) {
          this.codeByte++;
        }
      }
    //   this.value = this.checkText
      if (this.codeByte >= this.maxLength) {
        this.$modal.show("dialog", {
          title: "글자수 제한",
          text: `${this.maxLength}byte 이상 작성하실 수 없습니다`
        });
        return this.maxLength;
      } else {
        return this.codeByte;
      }
    }
  }
};
</script>

<style lang="less">
.text-counter {
  padding-top: 5px;
  color: #787878;
  .check-text {
      span.byte {
        color: #fd5651;
      }
  }
}
</style>

