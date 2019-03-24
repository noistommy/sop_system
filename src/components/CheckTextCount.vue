<template lang="pug">
    div.checkText.field
        textarea(v-if="formType == 'textarea'", :rows="rownum", @input="isChecked", v-model="checkText")
        input(v-else, v-model="checkText", @input="isChecked")
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
    textData: String,
    rownum: Number,
    value: String,
    maxLength: Number
  },
  data() {
    return {
      codeByte: 0,
      checkText: this.value
    };
  },
  created() {
  },
  updated() {
    this.checkText = this.value
  },
  computed: {
    //UTF-8 data
    byteCal() {
      this.codeByte = 0
      if(this.value == undefined) return 0
      for (let idx = 0; idx < this.value.length; idx++) {
        const oneChar = escape(this.value.charAt(idx));
        if (oneChar.length == 1) {
          this.codeByte++;
        } else if (oneChar.indexOf("%u") != -1) {
          this.codeByte += 3;
        } else if (oneChar.indexOf("%") != -1) {
          this.codeByte++;
        } else {
          this.codeByte += 4;
        }
      }
      if (this.codeByte >= this.maxLength) {
        this.$modal.show('dialog', {
          title: "글자수 제한",
          text: `${this.maxLength}byte 이상 작성하실 수 없습니다`
        });
        return this.maxLength;
      } else {
        return this.codeByte;
      }
    }
  },
  methods: {
    isChecked (event) {
      this.checkText = event.target.value
      this.$emit('input', this.checkText)
    },
  }
}
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

