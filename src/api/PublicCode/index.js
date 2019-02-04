import HTTP from '@/api'

const TargetURL = '/n3n.sop.CmmnCd'

export default {
  // 공통코드목록조회
  getPublicCodeList: () => {
    return HTTP.post(`${TargetURL}.selectCmmnCdList.do`, {})
      .then(res => {
        return res.data
      })
      .catch(error => {
        return console.log(`ERROR:${error}`)
      })
  },
  // 공통코드상세정보조회
  getPublicCodeDetail: () => {
    return HTTP.post(`${TargetURL}.selectCmmnCdDetailList.do`, {})
      .then(res => {
        return res.data
      })
      .catch(error => {
        return console.log(`ERROR:${error}`)
      })
  },
  // 공통코드그룹정보저장
  updatePublicCode: () => {
    return HTTP.post(`${TargetURL}.saveCmmnCdGroupInfo.do`, {})
      .then(res => {
        return res.data
      })
      .catch(error => {
        return console.log(`ERROR:${error}`)
      })
  },
  // 공통코드상세정보저장
  updatePublicCodeDetail: () => {
    return HTTP.post(`${TargetURL}.CmmnCdDetailInfo.do`, {})
      .then(res => {
        return res.data
      })
      .catch(error => {
        return console.log(`ERROR:${error}`)
      })
  }
}
