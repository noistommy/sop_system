import HTTP from '@/api'

const TargetURL = '/n3n.sop.SopManage'

export default {
  // SOP 목록조회
  getList: (payload) => {
    return HTTP.post(`${TargetURL}.selectSopManageList.do`, payload)
  },
  // SOP 상세조회
  getItem: (payload) => {
    return HTTP.post(`${TargetURL}.selectDeptEmpInfoList.do`, payload)
  },
  // SOP 생성
  createItem: (payload) => {
    return HTTP.post(`${TargetURL}.saveSopManageInfo.do`, payload)
  },
  // SOP 삭제
  deleteItem: (payload) => {
    return HTTP.post(`${TargetURL}.deleteSopManageInfo.do`, payload)
  }
}
