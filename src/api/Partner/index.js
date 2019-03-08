import HTTP from '@/api'

const TargetURL = '/n3n.sop.ccpyInfo'

export default {
  // 협력업체목록조회
  getAllList: (payload) => {
    return HTTP.post(`${TargetURL}.selectCcpyInfoList.do`, payload)
  },
  // 협력업체상세정보조회
  getDetail: (payload) => {
    return HTTP.post(`${TargetURL}.selectSlfdfnFbrdDetailInfo.do`, payload)
  },
  // 협력업체정보저장
  updatePartnerInfo: () => {
    return HTTP.post(`${TargetURL}.saveSlfdfnFgtMemberInfo.do`, {})
  },
  // 협력업체정보등록
  createPartnerInfo: (payload) => {
    return HTTP.post(`${TargetURL}.saveSlfdfnFbrdInfo.do`, payload)
  },
  // 협력업체직원정보저장
  updateEmployee: (payload) => {
    return HTTP.post(`${TargetURL}.selectUpperSlfdfnFbrdList.do`, payload)
  },
  // 협력업체직원정보등록
  createEmployee: (payload) => {
    return HTTP.post(`${TargetURL}.selectSlfdfnFbrdEmpInfoAllList.do`, payload)
  },
  // 파일업로드
  fileUpload: (payload) => {
    return HTTP.post(`${TargetURL}.uploadCcpyExcelFile.do`, payload)
  },
  // 업로드샘플
  fileSampleUpload: (payload) => {
    return HTTP.post(`${TargetURL}.selectCcpyExcelDownLoad.do`, payload)
  },
  // 파일다운로드
  fileDownload: (payload) => {
    return HTTP.post(`${TargetURL}.selectCcpyDetailExcelInfo.do`, payload)
  }
}
