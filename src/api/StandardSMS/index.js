import HTTP from '@/api'

const TargetURL = '/n3n.sop.SmsManage'

export default {
  // 표준문자목록조회
  getStandardSMSList: () => {
    return HTTP.post(`${TargetURL}.selectStdSmsList.do`, {})
      .then(res => {
        return res.data
      })
      .catch(error => {
        return console.log(`ERROR:${error}`)
      })
  },
  // 표준문자상세정보조회
  getStandardSMSDetail: () => {
    return HTTP.post(`${TargetURL}.selectStdSmsDetailInfo.do`, {})
      .then(res => {
        return res.data
      })
      .catch(error => {
        return console.log(`ERROR:${error}`)
      })
  },
  // 표준문자정보저장
  updateStandardSMS: () => {
    return HTTP.post(`${TargetURL}.saveStdSmsInfo.do`, {})
      .then(res => {
        return res.data
      })
      .catch(error => {
        return console.log(`ERROR:${error}`)
      })
  },
  // 표준문자검증
  checkStandardSMS: () => {
    return HTTP.post(`${TargetURL}.selectStdSmsVrify.do`, {})
      .then(res => {
        return res.data
      })
      .catch(error => {
        return console.log(`ERROR:${error}`)
      })
  }
}
