import HTTP from '@/api'

const TargetURL = '/n3n.sop.CmmnCd'

export default {
  // 공통코드목록조회
  getList: (payload) => {
    return HTTP.post(`${TargetURL}.selectCmmnCdDetailList.do`, payload)
  },
  // 공통코드상세정보조회
  getItem: (payload) => {
    return HTTP.post(`${TargetURL}.selectCmmnCdDetailInfo.do`, payload)
  },
  // 공통코드그룹정보저장
  updateCodeGroup: (payload) => {
    return HTTP.post(`${TargetURL}.saveCmmnCdGroupInfo.do`, payload)
  },
  // 공통코드상세정보저장
  updateCodeItem: (payload) => {
    return HTTP.post(`${TargetURL}.saveCmmnCdDetailInfo.do`, payload)
  }
}
