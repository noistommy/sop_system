<template lang="pug">
    table.datatable(:class="tableType")
        thead
            tr
                th( v-for="th of headers", :class="[`${th.align} aligned`]" ) {{th.text}}
        tbody
            <slot name="items" v-for="(item, index) of items" :item="item" :no="index+1"></slot>
        tfoot(v-if="isFooter")
            tr
                th( :colspan="colspan" )
                    template(v-if="isPagination")
                        Pagination( :totalCount="page.totalCount",
                        :currentPage="page.currentPageNo",
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
    value: Array,
    isFooter: Boolean,
    isPagination: Boolean,
    isListNumber: Boolean,
    page: Object
  },
  data () {
    return {
      colspan: 0,
      listNumber: 1,
      pageInfo: {}
    }
  },
  created () {
    if(this.headers){
      this.colspan = this.headers.length
    }
    this.pageInfo = this.page
    console.log(this.pageInfo)
  },
  methods: {
    setCurrentPage (pagenum) {
      console.log(pagenum)
      this.page.currPage = pagenum
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
