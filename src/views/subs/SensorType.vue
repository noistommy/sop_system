<template lang="pug">
  div.SensorType.sub-container
    div.sub-wrapper
      div.sub-header
        div.title 장비유형 관리
      div.sub-content.column
        div.content.section.section-1
          h3.title 장비관리
          div.contant-wrapper
            DataList(
              v-model="sensorType.selected"
              :headers="sensorType.headers",
              :items="sensorType.sensorTypeData",
              :itemKey="sensorType.itemkey",
              :isListNumber="sensorType.isListNumber",
            )
              <template slot="items" slot-scope="props">
                div.item.lr.listitem(:class="{active:props.selected}", @click="selectedItem(props)" )
                  .ld.center {{props.item.eqpmnClId}}
                  .ld {{props.item.eqpmnClNm}}
              </template>
        div.content.section.section-2
          h3.title 장비상세정보
          div.contant-wrapper
            div.section_1
              div.ui.form
                table.ui.table.celled
                  tbody
                    tr
                      td.center.aligned
                        span 종류
                      td
                        input(type="text", readonly, v-model="sensorDetail").readonly
                        label
                    tr
                      td.center.aligned 
                        span 종류명*
                      td
                        input(type="text", v-model="sensorDetail")
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
                //- h5 센서구분별정보
                DataTable(
                    v-model="sensorByType.selected"
                    :headers="sensorByType.headers",
                    :items="sensorByType.sensorByTypeData",
                    :isFooter="sensorByType.isfooter",
                    :isListNumber="sensorByType.isListNumber",
                    :isPagination="sensorByType.isPagination",
                    :page="sensorByType.pageInfo"
                  ).ui.table.celled.selectable
                    template(slot="items", slot-scope="props")
                      tr
                        td.center.aligned {{props.item.iwId}}
                        td {{props.item.sensorNm}}
                        td {{props.item.buldNm}}
                        td.center.aligned {{props.item.buldFloor}}
                        td {{props.item.alarmPermYn}}
                div.btnSet.right
                    div.buttons
                      button.ui.button.blue 저장
                      button.ui.button 취소
      div.sub-footer
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import DataList from '@/components/DataList.vue'
import SearchComp from '@/components/SearchComp.vue'
import { sensorTypeHeader, sensorByTypeHeader } from '@/setting'
import SensorApi from '@/api/Sensor'

export default {
  name: 'sensor-type',
  data () {
    return {
      sensorType: {
        selected: [],
        headers: sensorTypeHeader.headers,
        sensorTypeData: [],
        isListNumber: false,
        itemkey: 'eqpmnClId'
      },
      sensorDetail: {},
      sensorByType: {
        selected: [],
        headers: sensorByTypeHeader.headers,
        sensorByTypeData: [],
        isFooter: true,
        idPagination: true,
        isListNumber: false,
        pageInfo: {} 
      }
    }
  },
  components: {
    DataTable,
    DataList,
    SearchComp
  },
  created () {
    this.getSensorlist()
  },
  computed: {
    alarmYn () {
      return this.sensorDetail.alarmPermYn == 'Y'
    }
  },
  methods: {
    getSensorlist () {
      SensorApi.getList()
      .then(result => {
        this.sensorType.sensorTypeData = result.data.eqpmnFgManageList
        this.sensorType.selected[0]=result.data.eqpmnFgManageList[0]
        this.getSensorDetail()
      })
      .catch(error => {
        console.log(error)
      })
    },
    getSensorDetail () {
      const requestData = JSON.stringify({
        eqpmnClId: this.sensorType.selected[0].eqpmnClId
      })
      SensorApi.getDetail()
      .then(result => {
        this.sensorByType.sensorByTypeData = result.data.eqpmnFgSensorList
        this.sensorDetail = result.data.eqpmnFgInfo
        result.data.param.totalCount = result.data.totCnt
        this.sensorByType.pageInfo = result.data.param
      })
      .catch(error => {
        console.log(error)
      })
    },
    selectedItem(itemInfo) {
      this.sensorType.selected = []
      if (!itemInfo.selected) {
        this.sensorType.selected.push(this.sensorType.sensorTypeData[itemInfo.idx])
        this.getSensorDetail()
      }
    },
    toggleItems(itemInfo) {
      if(this.sensorDetail.alarmPermYn == 'N') return 
      this.sensorByType.selected[0] = this.sensorByType.sensorByTypeData[itemInfo.idx]
      this.sensorByType.sensorByTypeData.forEach((e, i) => {
        if(e[this.sensorByType.itemkey] == this.sensorByType.selected[0][this.sensorByType.itemkey]) {
          if(e.alarmPermYn=='Y') {
            e.alarmPermYn='N'
          }else {
            e.alarmPermYn='Y'
          }
        }
      })
      this.sensorByType.selected = []
    },
    toggleCheck () {
      this.sensorDetail.alarmPermYn = this.sensorDetail.alarmPermYn == 'Y' ? 'N' : 'Y'
    },
    reload () {
      this.getSensorDetail()
    }
  }
}
</script>

<style lang="less">
.SensorType {
  .content.section.section-1 {
    width: 25% !important;
  }
  .contant-wrapper {
    .ui.table {
      tr {
        td{
          &:nth-child(1) {
            background-color: #f9fafb;
          }
        }
      }
    }
  }
  .ld,.lh {
    width: 30% !important;
  }
 
}
</style>
