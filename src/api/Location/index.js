import HTTP from '@/api'

const TargetURL = '/n3n.sop.BuldManage'

export default {
  // 건물관리목록조회
  getLocationList: () => {
    return HTTP.post(`${TargetURL}.selectBuldManageList.do`, {}).then(res => {
      return res.data
    }).catch(error => {
      return console.log(`ERROR:${error}`)
    })
  },
  // 건물층정보목록조회
  getFloorList: () => {
    return HTTP.post(`${TargetURL}.selectDeptEmpInfoList.do`, {}).then(res => {
      return res.data
    }).catch(error => {
      return console.log(`ERROR:${error}`)
    })
  },
  // 건물상세정보수정
  updateLocationList: () => {
    return HTTP.post(`${TargetURL}.updateBuldDetailIfno.do`, {}).then(res => {
      return res.data
    }).catch(error => {
      return console.log(`ERROR:${error}`)
    })
  },
  // 건물층정보목록수정
  updateFloorList: () => {
    return HTTP.post(`${TargetURL}.updateBuldfloorInfo.do`, {}).then(res => {
      return res.data
    }).catch(error => {
      return console.log(`ERROR:${error}`)
    })
  }
}
