import HTTP from '@/api'

const TargetURL = '/n3n.sop.OrgnztInfo'

export default {
  // 조직도 목록조회
<<<<<<< HEAD
  getList: () => {
    return HTTP.post(`${TargetURL}.selectOrgnztInfoTrList.do`, {})
  },
  // 조직직원목록조회
  getItems: (payload) => {
    return HTTP.post(`${TargetURL}.selectDeptEmpInfoList.do`, payload)
=======
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
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
  }
}
