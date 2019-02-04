import HTTP from '@/api'

const TargetURL = '/n3n.sop.EqpmnFgManage'

export default {
  // 장비구분관리목록조회
  getSensorList: () => {
    return HTTP.post(`${TargetURL}.selectEqpmnFgManageList.do`, {})
      .then(res => {
        return res.data
      })
      .catch(error => {
        return console.log(`ERROR:${error}`)
      })
  },
  // 장비구분별센서목록조회
  getSensorTypeList: () => {
    return HTTP.post(`${TargetURL}.selectEqpmnFgManageList.do`, {})
      .then(res => {
        return res.data
      })
      .catch(error => {
        return console.log(`ERROR:${error}`)
      })
  },
  // 장비구분상세정보수정
  updateSensorDetail: () => {
    return HTTP.post(`${TargetURL}.updateEqpmnFgDetailInfo.do`, {})
      .then(res => {
        return res.data
      })
      .catch(error => {
        return console.log(`ERROR:${error}`)
      })
  },
  // 장비구분별센서목록수정
  updateSensorTypeDetail: () => {
    return HTTP.post(`${TargetURL}.updateEqpmnFgSensorList.do`, {})
      .then(res => {
        return res.data
      })
      .catch(error => {
        return console.log(`ERROR:${error}`)
      })
  }
}
