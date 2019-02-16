<template lang="pug">
    div.search-comp
      slot(name="condition1")
      slot(name="condition2")

      template(v-if="isTextSearch")
        div.ui.left.icon.input
          input(v-model="searchText", @blur="setText")
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
    }
  },
  data () {
    return {
       selectedDateStart: this.startDate,
       selectedDateEnd: this.endDate,
       selectedDates: this.rangeDate,
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
      this.value.searchText = this.searchText
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
