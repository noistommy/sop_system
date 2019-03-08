import HTTP from '@/api'

const TargetURL = '/n3n.sop.SlfdfnFbrdInfo'

export default {
  TargetURL: '/n3n.sop.SlfdfnFbrdInfo',
  // 자위소방대트리목록조회
  getTreeList: () => {
    return HTTP.post(`${TargetURL}.selectSlfdfnFbrdTrList.do`, {})
  },
  // 소방대상세정보조회
  getDetail: (payload) => {
    return HTTP.post(`${TargetURL}.selectSlfdfnFbrdDetailInfo.do`, payload)
  },
  // 자위소방대원정보저장
  setFiremanInfo: () => {
    return HTTP.post(`${TargetURL}.saveSlfdfnFgtMemberInfo.do`, {})
  },
  // 자위소방대정보저장
  setFireBrigadeInfo: (payload) => {
    return HTTP.post(`${TargetURL}.saveSlfdfnFbrdInfo.do`, payload)
  },
  // 상위소방대목록조회
  getUpperFireBrigade: () => {
    return HTTP.post(`${TargetURL}.selectUpperSlfdfnFbrdList.do`, {})
  },
  // 자위소방대원전체목록조회
  getAllFireman: () => {
    return HTTP.post(`${TargetURL}.selectSlfdfnFbrdEmpInfoAllList.do`, {})
  },
  // 자위소방대등록
  createItem: (payload) => {
    return HTTP.post(`${TargetURL}.insertSlfdfnFbrdInfo.do`, payload)
  },
  // 파일업로드
  fileUpload: (payload) => {
    return HTTP.post(`${TargetURL}.uploadSlfdfnFbrdExcelFile.do`, payload)
  },
  // 업로드샘플
  fileSampleUpload: (payload) => {
    return HTTP.post(`${TargetURL}.selectSlfdfnFbrdExcelDownLoad.do`, payload)
  },
  // 파일다운로드
  fileDownload: (payload) => {
    return HTTP.post(`${TargetURL}.selectSlfdfnFbrdDetailExcelInfo.do`, payload)
  }
}
