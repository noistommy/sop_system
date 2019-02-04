import HTTP from '@/api'

const TargetURL = '/n3n.sop.ccpyInfo'

export default {
  // 협력업체목록조회
  getPartnerList: () => {
    return HTTP.post(`${TargetURL}.selectCcpyInfoList.do`, {}).then(res => {
      return res.data
    }).catch(error => {
      return console.log(`ERROR:${error}`)
    })
  },
  // 협력업체상세정보조회
  getPartnerDetailInfo: () => {
    return HTTP.post(`${TargetURL}.selectSlfdfnFbrdDetailInfo.do`, {}).then(res => {
      return res.data
    }).catch(error => {
      return console.log(`ERROR:${error}`)
    })
  },
  // 협력업체정보저장
  updatePartnerInfo: () => {
    return HTTP.post(`${TargetURL}.saveSlfdfnFgtMemberInfo.do`, {}).then(res => {
      return res.data
    }).catch(error => {
      return console.log(`ERROR:${error}`)
    })
  },
  // 협력업체정보등록
  setPartnerInfo: () => {
    return HTTP.post(`${TargetURL}.saveSlfdfnFbrdInfo.do`, {}).then(res => {
      return res.data
    }).catch(error => {
      return console.log(`ERROR:${error}`)
    })
  },
  // 협력업체직원정보저장
  updatePartnerEmployee: () => {
    return HTTP.post(`${TargetURL}.selectUpperSlfdfnFbrdList.do`, {}).then(res => {
      return res.data
    }).catch(error => {
      return console.log(`ERROR:${error}`)
    })
  },
  // 협력업체직원정보등록
  setPartnerEmployee: () => {
    return HTTP.post(`${TargetURL}.selectSlfdfnFbrdEmpInfoAllList.do`, {}).then(res => {
      return res.data
    }).catch(error => {
      return console.log(`ERROR:${error}`)
    })
  }
}
