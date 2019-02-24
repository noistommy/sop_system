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
  setPartnerInfo: () => {
    return HTTP.post(`${TargetURL}.saveSlfdfnFbrdInfo.do`, {})
  },
  // 협력업체직원정보저장
  updatePartnerEmployee: () => {
    return HTTP.post(`${TargetURL}.selectUpperSlfdfnFbrdList.do`, {})
  },
  // 협력업체직원정보등록
  setPartnerEmployee: () => {
    return HTTP.post(`${TargetURL}.selectSlfdfnFbrdEmpInfoAllList.do`, {})
  }
}
