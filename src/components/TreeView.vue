<template lang="pug">
    div.treeitem
        div.treecontent
            div.treeheader(:style="isActiveItem" @click.stop="getClick(treeItem)")
                template(v-if="childCount > 0")
                    i.icon.caret(:class="activeItem ? 'down' : 'right'", @click.stop="setActive")
                    span {{treeItem.title}} 
                    span.badge(v-if="childCount > 0") {{childCount}}
                template(v-else-if="treeItem.title")
                    div {{treeItem.title}} 
                template(v-else)
                    div.item-wrapper
                        div {{treeItem.clsfCdNm}} 
                        div {{treeItem.childDeptNm}} 
                        div {{treeItem.emplNm}} 
                        //- div.ui.checkbox
                        //-     input(type="checkbox")
                        //-     label
                    //- div {{treeItem.moblphonNo}} 
            template(v-if="childCount > 0")
                div.list(:class="[{active:activeItem}, `level-${level}`]", v-if="childCount > 0" )
                    tree-view(v-model="selectTeam",
                    @select="getItemInfo",
                    v-for="item in treeItem.children",
                    :treeItem="item",
                    :level="childLevel",
                    :isActive=" branchActive")
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
    value: Object,
    selectYn :Boolean,
    isSelect: Boolean
  },
  data() {
      return {
        childLevel: this.level + 1,
        childrenList: this.treeItem,
        branchActive: true,
        activeItem: this.isActive,
        selectedItem: false,
        selectTeam: {},
        activeStyle : {
            backgroundColor:'#80b7be',
            color: '#525252',
            fontWeight: 'bold'
        },
        selectedYn: this.selectYn,
        allselect:this.isSelect
      }
  },
  components: {
    'tree-view': TreeView
  },
  created () {

  },
  mounted () {
  },
  computed: {
      childCount () {
        if(this.treeItem.children == undefined) return 
        return this.treeItem.children.length 
      },

      isActiveItem () {
          return this.selectedYn || this.allselect ? this.activeStyle : {}
      }
  },
  methods: {
      setActive() {
          this.activeItem = !this.activeItem
      },
      setSelect() {
          this.selectedItem = !this.selectedItem
      },
      selectHover(event) {
      },
      getClick(selItem) {
        this.$emit('select', selItem)
        this.selectedYn = !this.selectedYn
        if(this.allselect) {
            this.allselect = false
        }
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
                    background-color: #818080;
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
            &:hover {
                background-color: #818080;
                // color: rgb(223, 201, 77);
                color: #fff;
                font-weight: bold;
            }
            .item-wrapper {
                display: flex;
                > div {
                    &:first-child {
                        width: 30%;
                    }
                    // display: inline-block;
                }
            }
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
