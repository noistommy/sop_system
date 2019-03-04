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
  },
  // SOP 수동 실행
  runStepListByOper: (payload) => {
    return HTTP.post(`${TargetURL}.insertSopExecutManage.do`, payload)
  },
  // SOP 실행
  runStepList: (payload) => {
    return HTTP.post(`${TargetURL}.deleteSopManageInfo.do`, payload)
  },
  // SOP 종료
  closeSopList: (payload) => {
    return HTTP.post(`${TargetURL}.updateSopEnd.do`, payload)
  },
  // 제어권 전달
  passOperation: (payload) => {
    return HTTP.post(`${TargetURL}.updateSopExecutOprtr.do`, payload)
  },
  // sop 실행 이력
  getSophistoryList: (payload) => {
    return HTTP.post(`${TargetURL}.updateSopExecutOprtr.do`, payload)
  }
}
