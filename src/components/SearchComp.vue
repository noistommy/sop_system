<template lang="pug">
    div.search-comp
      slot(name="condition1")
      slot(name="condition2")
<<<<<<< HEAD

      template(v-if="isTextSearch")
        div.ui.left.icon.input
          input(v-model="searchText", @blur="setText")
=======
      template(v-if="isDateSearch")
        template(v-if="isRange == 'range'")
          v-date-picker(mode='range', v-model='selectedDate', :class="isRange")
            div.ui.left.icon.input(:type='inputState.type', slot-scope='props')
              input( 
              :value='props.inputValue', 
              :placeholder='inputState.message',
              @input='props.updateValue($event.target.value, { formatInput: false, hidePopover: false })',
              @change='props.updateValue($event.target.value, { formatInput: true, hidePopover: false })', 
              expanded)
              <i class="calendar alternate outline icon"></i>
        template(v-else)
          v-date-picker(mode='single', v-model='selectedDateStart')
            div.ui.left.icon.input(:type='inputState.type', slot-scope='props')
              input( 
              :value='props.inputValue', 
              :placeholder='inputState.message',
              @input='props.updateValue($event.target.value, { formatInput: false, hidePopover: false })',
              @change='props.updateValue($event.target.value, { formatInput: true, hidePopover: false })', 
              expanded)
              <i class="calendar alternate outline icon"></i>
          v-date-picker(mode='single', v-model='selectedDateEnd')
            div.ui.left.icon.input(:type='inputState.type', slot-scope='props')
              input( 
              :value='props.inputValue', 
              :placeholder='inputState.message',
              @input='props.updateValue($event.target.value, { formatInput: false, hidePopover: false })',
              @change='props.updateValue($event.target.value, { formatInput: true, hidePopover: false })', 
              expanded)
              <i class="calendar alternate outline icon"></i>
        select.ui.dropdown
          option(value="") 기간설정
          option(value="0") 최근일주일
          option(value="1") 최근한달
          option(value="2") 최근일년
      template(v-if="isTextSearch")
        div.ui.left.icon.input
          input(v-model="searchText", @keyup="setText")
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
          i.icon.search
      button(@click="searchList").ui.button 검색

</template>

<script>

export default {
  name: 'search-comp',
  components: {
  },
  props: {
    startDate: Date,
    endDate: Date,
    rangeDate: Object,
    isRange:  String,
    isTextSearch: Boolean,
    isDateSearch: Boolean,
    value: {
<<<<<<< HEAD
=======
      type: Object || Array,
      default: {
        type: "00",
        value: ""
      }
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
    }
  },
  data () {
    return {
       selectedDateStart: this.startDate,
       selectedDateEnd: this.endDate,
<<<<<<< HEAD
       selectedDates: this.rangeDate,
=======
       selectedDate: this.rangeDate,
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
       searchText: ""
    }
  },
  created () {
   
  },
  mounted() {
    $('.ui.dropdown').dropdown();
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
    searchList() {
      this.$emit('search')
    },
    setText () {
<<<<<<< HEAD
      this.value.searchText = this.searchText
=======
      this.value.value=this.searchText
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
    }
  }
}
</script>

<style lang="less">
.search-comp {
    position:absolute;
    top:0;
    right: 0;
    width: 70%;
    display: flex;
    justify-content: flex-end;
    > div {
      margin-right: 15px !important;
    }
    .button {
      // position: absolute;
      // right: 0;
    }
    .range {
      width: 250px;
      .ui.input {
        width: 100%;
      }
    }
    .condition1 {
      margin-right: 15px !important;
    }
    .condition2 {
      margin-right: 15px !important;
    }
  }
</style>
