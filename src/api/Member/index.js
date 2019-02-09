import HTTP from '@/api'

const TargetURL = '/n3n.sop.OrgnztInfo'

export default {
  // 조직도 목록조회
  getList: (payload) => {
    return HTTP.post(`${TargetURL}.selectOrgnztInfoTrList.do`, payload).then(res => {
      return res.data
    }).catch(error => {
      return console.log(`ERROR:${error}`)
    })
  },
  // 조직직원목록조회
  getItems: (payload) => {
    return HTTP.post(`${TargetURL}.selectDeptEmpInfoList.do`, payload).then(res => {
      return res.data
    }).catch(error => {
      return console.log(`ERROR:${error}`)
    })
  }
}
