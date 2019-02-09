<template lang="pug">
    div.pagination-wrapper
        div.ui.pagination.menu
            a.item(@click="prev", :class="{disabled: disabledStart}")
                i.icon.left.arrow
            a.item(v-for="page in pagination", :class="{active: page == current}" @click="setCurrentPage(page)") {{page}}
            a.item(@click="next", :class="{disabled: disabledEnd}")
                i.icon.right.arrow
</template>

<script>
export default {
  name: 'pagination',
  props: {
    totalCount: Number,
    currentPage: Number,
    recordCountPerPage: Number
  },
  data () {
    return {
      current: 1,
      pagination: [],
      totalPage: 1,
      minCount: 1,
      maxCount: 5,
      prevDisabled: true,
      nextDisabled: false
    }
  },
  created () {
    this.setPage()
    this.setPagination()
  },
  computed: {
    disabledStart () {
      return this.current == 1
    },
    disabledEnd () {
      return this.current == this.totalPage
    },
    getCurrentList() {
      return this.$emit('currpage', this.current)
    }
  },
  methods: {
    setPagination () {
      this.pagination = []

      for (let n = this.minCount; n <= this.maxCount; n++) {
        this.pagination.push(n)
      }
    },
    setPage () {
      this.totalPage = Math.floor(parseFloat(this.totalCount / this.recordCountPerPage) + 1)
      if (this.totalPage < this.maxCount) {
        this.maxCount = this.totalPage
      }
    },
    setCurrentPage (page) {
      this.current = page
      this.$emit('currpage', this.current)
    },
    next () {
      if (this.current + 1 > this.totalPage) return
      if (this.current == this.maxCount) {
        this.maxCount++
        this.minCount++
        this.setPagination()
      }
      this.current++
      this.$emit('currpage', this.current)
    },
    prev () {
      if (this.current - 1 < 1) return
      if (this.current == this.minCount) {
        this.maxCount--
        this.minCount--
        this.setPagination()
      }
      this.current--
      this.$emit('currpage', this.current)
    }
  }
}
</script>

<style lang="less">
    .pagination-wrapper {
        WIDTH:100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
