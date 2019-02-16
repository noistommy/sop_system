<template lang="pug">
    table.datatable(:class="tableType")
        thead
            tr
<<<<<<< HEAD
              th(v-if="isSelect").center.aligned.collapsing
              th(v-if="isListNumber", :class="['wide one']").center.aligned NO
              th( v-for="th of headers", :class="[`${th.align} aligned`, `wide ${th.size}`]" ) {{th.text}}
        tbody
          tr(v-if="items.length == 0").no-data
            td(:colspan="colspan")
              .nodata-message
                //- span
                //-   i.icon.warning
                span.header NO DATA
                span 데이터가 없습니다
          <slot name="items" v-for="(item, index) of items" :item="item" :idx="index" :colspan="colspan" :selected="activeItem(item)"></slot>
=======
              th(v-if="isListNumber").center.aligned NO
              th( v-for="th of headers", :class="[`${th.align} aligned`]" ) {{th.text}}
        tbody
            <slot name="items" v-for="(item, index) of items" :item="item" :idx="index" :selected="activeItem(item)"></slot>
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
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
<<<<<<< HEAD
    itemKey: String,
    isFooter: Boolean,
    isPagination: Boolean,
    isListNumber: Boolean,
    isSelect: Boolean,
=======
    isFooter: Boolean,
    isPagination: Boolean,
    isListNumber: Boolean,
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
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
<<<<<<< HEAD
        this.colspan++
      }
      if (this.isSelect) {
        this.colspan++
=======
        this.colspan = this.headers.length + 1
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
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
<<<<<<< HEAD
        if(e[this.itemKey] == data[this.itemKey]) {
          return isSelected = true
        }
      })
      
=======
        if(e.id == data.id) {
          isSelected = true
        }
      })
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
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
.table-title {
  position: relative;
  .total {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 1rem;
    font-weight: 100;
  }
}
.datatable {
  .ui.checkbox label {
    padding: 0;
  }
  .no-data {
    color: rgba(202, 74, 74, 0.7);
    text-align: center;
    // background-color: rgba(202, 74, 74, 0.5);
    .nodata-message {
      display: flex;
      // justify-content: center;
      font-size: 1rem;
      span {
        display:inline-block;
        padding: 3px 5px;
        &.header {
          font-size: 1.2rem;
          font-weight: 700;
          background-color: rgba(202, 74, 74, 0.7);
          color: rgba(202, 74, 74, 1);
          padding: 3px 5px
        }
      }
    }
  }
}

tr[active] {
  // background-color: rgba(145, 229, 250, 0.233);
  background-color: rgba(74, 151, 202, 0.815);
  color:#fff;
  font-weight: 700;
}

 td {
     .ellipse
 }

</style>
