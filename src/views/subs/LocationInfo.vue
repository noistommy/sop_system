<template lang="pug">
  div.LocationInfo.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 건물/층 관리
<<<<<<< HEAD
      div.sub-content.column
        div.content.section.section-1
          h3.title 건물관리
          div.contant-wrapper
            DataList(
              v-model="locationInfo.selected"
              :headers="locationInfo.headers",
              :items="locationInfo.locationInfoData",
              :itemKey="locationInfo.itemkey",
              :isListNumber="locationInfo.isListNumber",
            )
=======
        SearchComp(
            :isDateSearch="false",
            :isTextSearch="true")
            template( slot="condition1", slot-scope="props")
              select.ui.dropdown
                option 1
                option 2
                option 3
      div.sub-content.column
        div.content.section.section-1
            DataTable(
              v-model="selected"
              :headers="locationInfo.headers",
              :items="locationInfo.sopHistoryData",
              :isFooter="locationInfo.isfooter",
              :isListNumber="locationInfo.isListNumber",
              :isPagination="locationInfo.isPagination",
              :page="locationInfo.pageInfo"
            ).ui.table.celled.selectable
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
              <template slot="items" slot-scope="props">
                div.item.lr.listitem(:class="{active:props.selected}", @click.stop="selectedItem(props)" )
                  .ld {{props.item.buldId}}
                  .ld {{props.item.buldNm}}
              </template>
        div.content.section.section-2
<<<<<<< HEAD
          h3.title 건물상세정보
          div.contant-wrapper
            div.setion_1
              div.ui.form
                table.ui.table.celled
                  tbody
                    tr
                      td.center.aligned
                        span 건물ID
                      td
                        input(type="text", readonly, v-model="locationDetail.buldId").readonly
                        label
                    tr
                      td.center.aligned 
                        span 건물명*
                      td
                        input(type="text", v-model="locationDetail.buldNm")
                        label
                    tr
                      td.center.aligned 
                        span 알람허용여부
                      td
                        div.ui.toggle.checkbox(@click="toggleCheck")
                          input(type="checkbox", :checked="alarmYn")
                          label 허용
                
            div.section_2
              div.wrapper
                DataList(
                  v-model="locationFloor.selected",
                  :headers="locationFloor.headers",
                  :items="locationFloor.locationFloorData",
                  :itemKey="locationFloor.itemkey",
                  :isListNumber="locationFloor.isListNumber"
                )
                  template(slot="items", slot-scope="props")
                    div.item.lr.listitem(@click.stop="toggleItems(props)" )
                      .ld.center {{props.item.buldFloor}}
                      .ld.center
                        //- input(type="text", value="")
                        div.ui.toggle.checkbox()
                          input(
                            type="checkbox",
                            :checked="props.item.alarmPermYn=='Y'",
                            :disabled="alarmYn == false")
                          label 허용
            div.selcion_3
              div.btnSet.right
                div.buttons
                  button.ui.button.blue(@click="updateDetail") 저장
                  button.ui.button(@click="reload") 취소
=======
          DataTable(
              v-model="selected"
              :headers="locationFloor.headers",
              :items="locationFloor.locationFloorData",
              :isFooter="locationFloor.isfooter",
              :isListNumber="locationFloor.isListNumber",
              :isPagination="locationFloor.isPagination",
              :page="locationFloor.pageInfo"
            ).ui.table.celled.selectable
              <template slot="items" slot-scope="props">
                tr
                  td.center.aligned {{props.item.no}}
                  td {{props.item.date}}
                  td {{props.item.manager}}
                  td.center.aligned {{props.item.type}}
                  td {{props.item.title}}
                  td.ellipse {{props.item.location}}
                  td {{props.item.endtime}}
              </template>

>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
      div.sub-footer
</template>

<script>
import DataList from '@/components/DataList.vue'
import DataTable from '@/components/DataTable.vue'
import SearchComp from '@/components/SearchComp.vue'
import { locationInfoHeader, locationFloorHeader } from '@/setting'
<<<<<<< HEAD
import LocationApi from '@/api/Location'
=======
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e

export default {
  name: 'location-info',
  data () {
    return {
      locationInfo: {
<<<<<<< HEAD
        selected: [],
        headers: locationInfoHeader.headers,
        locationInfoData: [],
        isListNumber: false,
        itemkey: 'buldId'
      },
      locationDetail: {
        buldId: '',
        buldNm: '',
        alarmPermYn: 'N'
      },
      locationFloor: {
        selected: [],
        headers: locationFloorHeader.headers,
        locationFloorData: [],
        isListNumber: false,
        itemkey: 'buldFloor'
      },
      checkedList: []
=======
        headers: locationInfoHeader.headers,
        locationInfoData: [],
        isFooter: false,
        idPagination: false,
        isListNumber: false,
        pageInfo: {} 
      },
      locationFloor: {
        headers: locationFloorHeader.headers,
        locationFloorData: [],
        isFooter: false,
        idPagination: false,
        isListNumber: false,
        pageInfo: {} 
      },
      selected: []
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
    }
  },
  components: {
    DataTable,
    DataList,
    SearchComp
  },
  created () {
    this.getLocationList()
  },
  mounted() {
  },
  computed: {
    alarmYn () {
      return this.locationDetail.alarmPermYn == 'Y'
    }
  },
  methods: {
    getLocationList () {
      LocationApi.getList().then(result => {
        console.log(result)
        this.locationInfo.locationInfoData = result.data.buldManageList
        this.locationInfo.selected[0]=this.locationInfo.locationInfoData[0]
        this.getDetail()
      }).catch(error => {
        console.log(`${error}`)
      })
    },
    getDetail () {
      const requestData = JSON.stringify({
        buldId: this.locationInfo.selected[0].buldId
      })
      LocationApi.getItem(requestData).then(result => {
        console.log(result)
        this.locationFloor.locationFloorData = result.data.buldFloorInfoList
        this.locationDetail = result.data.buldManageInfo
      }).catch(error => {
        console.log(error.response)
      })
    },
    updateDetail () {
      const requestObj = Object.assign({buldManageInfo: this.locationDetail}, { buldFloorInfoList:this.locationFloor.locationFloorData})
      console.log(requestObj)
      const requestData = JSON.stringify({
        buldId: this.locationInfo.selected[0].buldId
      })
      LocationApi.updateItem(requestData).then(result => {
        console.log(result)
      }).catch(error => {
        console.log(error.response)
      })
    },
    selectedItem(itemInfo) {
      this.locationInfo.selected = []
      if (!itemInfo.selected) {
        this.locationInfo.selected.push(this.locationInfo.locationInfoData[itemInfo.idx])
        this.getDetail()
      }
    },
    toggleItems(itemInfo) {
      if(this.locationDetail.alarmPermYn == 'N') return 
      this.locationFloor.selected[0] = this.locationFloor.locationFloorData[itemInfo.idx]
      this.locationFloor.locationFloorData.forEach((e, i) => {
        if(e[this.locationFloor.itemkey] == this.locationFloor.selected[0][this.locationFloor.itemkey]) {
          if(e.alarmPermYn=='Y') {
            e.alarmPermYn='N'
          }else {
            e.alarmPermYn='Y'
          }
        }
      })
      this.locationFloor.selected = []
    },
    toggleCheck () {
      this.locationDetail.alarmPermYn = this.locationDetail.alarmPermYn == 'Y' ? 'N' : 'Y'
    },
    reload () {
      this.getDetail ()
    }
  }
}
</script>

<style lang="less">
.contant-wrapper {
    height: 95%;
    max-height: auto;
    display: flex;
    flex-direction: column;
    // flex: 1 2 auto;
    > div {
      padding-bottom: 15px
    }
    .section_2{
      height: 70%;
      .wrapper {
        height: 100%;
        .lbody {
          height: 90%;
        }
      }
    }
    .ui.table {
      tr {
        td{
          &:nth-child(1) {
            background-color: #f9fafb;
          }
        }
      }
    }
.LocationInfo {
  .content.section.section-1 {
      width: 50% !important;
    }
  
  }
  .ld {
    width: 50% !important;
  }
  .lh {
    width: 50% !important;
  }
  .readonlytext {
    padding: .6em 1em;
  }
}
</style>
