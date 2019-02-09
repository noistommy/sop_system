<template lang="pug">
    table.datatable(:class="tableType")
        thead
            tr
              th(v-if="isListNumber").center.aligned NO
              th( v-for="th of headers", :class="[`${th.align} aligned`]" ) {{th.text}}
        tbody
            <slot name="items" v-for="(item, index) of items" :item="item" :idx="index" :selected="activeItem(item)"></slot>
        tfoot(v-if="isFooter")
            tr
                th( :colspan="colspan" )
                    template(v-if="isPagination && page.totalCount > 10")
                        Pagination( :totalCount="page.totalCount",
                        :currentPage="pageInfo.currentPageNo",
                        :recordCountPerPage="page.recordCountPerPage",
                        @currpage="setCurrentPage" )

</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'data-table',
  components: {
    Pagination
  },
  props: {
    tableType: String,
    headers: Array || Object,
    items: Array,
    isFooter: Boolean,
    isPagination: Boolean,
    isListNumber: Boolean,
    page: Object,
    value: Array
  },
  data () {
    return {
      selItem: false,
      colspan: 0,
      listNumber: 1,
      pageInfo: this.page
    }
  },
  created () {
    if(this.headers){
      this.colspan = this.headers.length
      if (this.isListNumber) {
        this.colspan = this.headers.length + 1
      }
    }
  },
  methods: {
    setCurrentPage (pagenum) {
      this.pageInfo.currPage = pagenum
      this.$emit('search', pagenum)
    },
    activeItem(data) {
      let isSelected = false
      if(this.value == []) return 
      this.value.forEach((e, i) => {
        if(e.id == data.id) {
          isSelected = true
        }
      })
      return isSelected
    }
  }
}
</script>

<style lang="less">
.ellipse {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

 td {
     .ellipse
 }

</style>
