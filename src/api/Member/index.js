import HTTP from '@/api'

const TargetURL = '/n3n.sop.OrgnztInfo'

export default {
  // 조직도 목록조회
  getMembersList: () => {
    return HTTP.post(`${TargetURL}.selectOrgnztInfoTrList.do`, {}).then(res => {
      return res.data
    }).catch(error => {
      return console.log(`ERROR:${error}`)
    })
  },
  // 조직직원목록조회
  getMemberList: () => {
    return HTTP.post(`${TargetURL}.selectDeptEmpInfoList.do`, {}).then(res => {
      return res.data
    }).catch(error => {
      return console.log(`ERROR:${error}`)
    })
  }
}
