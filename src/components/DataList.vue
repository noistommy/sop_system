<template lang="pug">
    div.datalist
      h3(v-if="isTitle") 제목
      div.lhead.ui.list(:class="listType")
          div.item.lr.listitem
            div.lh(v-if="isListNumber").center.aligned NO
            div.lh( v-for="lh of headers", :class="[`${lh.align} aligned ${lh.size}`]") {{lh.text}}
      div.lbody.ui.list(:class="listType")
        <slot name="items" v-for="(item, index) of items" :item="item" :idx="index" :selected="activeItem(item)"></slot>
      div.ui.form(v-if="isEditor")
        div.lfoot.ui.list(:class="listType")
          div.item.lr.listitem
            div.ld(v-for="lf in headers")
              div.field
                label
                input(typw="text", placeholder="lf.text")
</template>

<script>

export default {
  name: 'data-list',
  components: {
  },
  props: {
    listType: String,
    headers: Array || Object,
    items: Array,
    isListNumber: Boolean,
    isEditor: Boolean,
    itemKey: String,
    value: Array,
    isTitle: Boolean
  },
  data () {
    return {
      selItem: false,
      listNumber: 1,
    }
  },
  created () {
  },
  methods: {
    activeItem(data) {
      let isSelected = false
      if(this.value == []) return 
      this.value.forEach((e, i) => {
        if(e[this.itemKey] == data[this.itemKey]) {
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

 .ld {
     .ellipse
 }

 .datalist {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid rgba(34,36,38,.15);
    .lhead.list,
    .lbody.list,
    .lfoot.list {
      margin: 0;
      overflow-x: hidden;
      .listitem.item.lr {
        padding: 0 !important;
        background-color: #fff;
        display: flex;
        .ld,.lh {
          padding: .9rem 1.2rem;
          width: 30%;
          flex: 1 1 auto;
          &:last-child {
            border:0;
            // width: auto;
            flex-grow: 1;
          }
          &.center {text-align: center;}
          &.left {text-align: left;}
          &.right {text-align: right;}
        }
        .lh {
          background-color: #f9fafb;
          font-weight: bold;
        }
        &:nth-child(odd) {
          background-color: rgba(0,0,50,.02)
        }
      }
    }
    .lfoot.list {
      position: absolute;
      top:0;
    }
    .lhead.list {
      // .border-radius(5px, 0, 5px, 0);
      border-bottom: 0;
      border-bottom: 1px solid rgba(34,36,38,.15);
      .listitem.item.lr {
        // background-color: #ccc !important;
      }
    }
    .lbody.list {
      // .border-radius(0, 5px, 0, 5px);
      overflow-y: auto;
      height: 95%;
      .listitem.item.lr {
        &:hover {
          background-color: #fff;
        }
        &.active {
          background-color: rgba(74, 151, 202, 0.815);
          color: #fff;
        }
      }
    }
    // ::-webkit-scrollbar {
    //   width:0;
    //   position: absolute;
    //   top:0;
    //   right: 0;
    // }
    .ui.form {
      position {
        
      }
    }
    .totalLength {
      // display: none;
      position: absolute;
      right: 0;
      top: -5px;
    }
  }

</style>
