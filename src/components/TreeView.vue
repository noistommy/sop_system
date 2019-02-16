<template lang="pug">
    div.treeitem(v-on:dblclick.stop="setActive")
        div.treecontent
            div.treeheader(@mouseover.self="selectHover", :class="{active:selectedItem}", @click.stop="getList(treeItem)")
                i.icon.caret(:class="activeItem ? 'down' : 'right'", v-if="treeItem.children != ''", @click.stop="setActive")
                i.icon(v-else)
                span {{treeItem.title}} 
                span.badge(v-if="treeItem.children != ''") {{treeItem.children.length}}
            <template>
                div.list(:class="[{active:activeItem}, `level-${level}`]", v-if="treeItem.children != ''" )
                    tree-view(v-model="selectTeam", @select="getItemInfo", v-for="item in treeItem.children", :treeItem="item", :level="childLevel", :isActive=" branchActive")
            </template>
</template>

<script>
import TreeView from '@/components/TreeView.vue'

export default {
  name: 'tree-view',
  props: {
    treeItem: Object,
    isRoot: Boolean,
    isActive: Boolean,
    level: Number,
    value: Object
  },
  data() {
      return {
          childLevel: this.level + 1,
          childrenList: this.treeItem,
          branchActive: true,
          activeItem: this.isActive,
          selectedItem: false,
          selectTeam: {}
      }
  },
  components: {
    'tree-view': TreeView
  },
  created () {
  },
  methods: {
      setActive() {
          return this.activeItem = !this.activeItem
      },
      selectHover(event) {
      },
      getList(selItem) {
        //   if(selItem.title == this.selectTeam.title){
        //       this.selectedItem = true
        //   }

        //   if(!this.selectedItem){
        //       console.log(this.selectedItem)
        //       this.selectedItem = !this.selectedItem
        //   }
          this.$emit('select', selItem)
      },
      getItemInfo(item) {
        this.$emit('select', item)
        this.$emit('input', item)
      }
  }
}

</script>

<style lang="less">
.transition (@type: all, @duration: 500ms, @Function: ease-out) {
    -webkit-transition: @arguments;
    -moz-transition: @arguments;
    -ms-transition: @arguments;
    -o-transition: @arguments;
    transition: @arguments;
  }

.treeView .list {
    overflow: hidden;
    height: 0;
    padding: 0 !important;
    .transition;
    .treeitem {
        // padding-left: 50px;
        .treecontent {
            .treeheader {
                position:relative;
                padding: 0.5em 1.2em;
                color:#ddd;
                &:hover {
                    background-color: #525252;
                    // color: rgb(223, 201, 77);
                    color: #fff;
                    font-weight: bold;
                }
                &.active {
                    background-color: #80b7be;
                    >.treeheader {
                        color: #525252;
                        font-weight: bold;
                    }
                }
            }
        }
        
    }
    &.active{
        height: auto;
        .transition;
    }
    &.level-1 {
        background-color: #555;
        > .treeitem {
            .treecontent {
                .treeheader {
                    border-left: 5px solid rgb(77, 141, 17);
                    border-top: 1.2px solid rgba(143, 143, 143, 0.15);
                    border-bottom: 1.2px solid rgba(10, 10, 10, 0.15);
                    padding-left: 50px;
                }
            }
        }
    }
    &.level-2 {
        background-color: #656565;
        // box-shadow: inset 0 3px 5px #2c2c2c88;
        > .treeitem {
            
            // border-top: 1px solid rgba(34,36,38,.15);
            // border-bottom: 1px solid #555;
            .treecontent {
                .treeheader {
                    border-left: 5px solid rgb(223, 201, 77);
                    border-top: 0;
                    border-bottom: 0;
                    padding-left: 100px;
                }
            }
        }
    }
}


.level-0 {
    max-height: 650px;
    background-color: #fff;
    background-color: #454545;
    color: #f2f2f2;
    border: 1px solid rgba(139, 139, 139, 0.493);
    > .treeitem {
         padding: 0;
        
    }
    border-radius: 5px;
    > .treeitem {
        .treeheader {
            border-left: 5px solid rgb(64, 130, 184);
            border-bottom: 1px solid rgba(34,36,38,.15);
            position:relative;
            padding: 0.5em 1.2em;
            color:#ddd;
        }
    }
}

span.badge {
    position: absolute;
    display: inline-block;
    font-size: .8rem;
    padding: 1px;
    width: 1.5rem;
    text-align: center;
    background-color: rgb(53, 54, 54);
    // border-radius: 0.9rem;
    right: 5px;    
}

// .level-0 > .treeitem .treeheader:hover { color:rgb(64, 130, 184) !important; }
// .level-1 > .treeitem .treeheader:hover { color:rgb(77, 141, 17) !important; }
// .level-2 > .treeitem .treeheader:hover { color: rgb(223, 201, 77) !important; }

</style>
