import HTTP from '@/api'

const TargetURL = '/n3n.sop.BuldManage'

export default {
  // 건물관리목록조회
  getList: () => {
    return HTTP.post(`${TargetURL}.selectBuldManageList.do`, {})
  },
  // 건물층정보목록조회
  getItem: (payload) => {
    console.log(payload)
    return HTTP.post(`${TargetURL}.selectBuldFloorInfoList.do`, payload)
  },
  // // 건물상세정보수정
  // updateLocationList: () => {
  //   return HTTP.post(`${TargetURL}.updateBuldDetailIfno.do`, {}).then(res => {
  //     return res.data
  //   }).catch(error => {
  //     return console.log(`ERROR:${error}`)
  //   })
  // },
  // 건물층정보목록수정
  updateItem: (payload) => {
    return HTTP.post(`${TargetURL}.saveBuldDetailInfo.do`, payload)
  }
}
