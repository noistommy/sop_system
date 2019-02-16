import HTTP from '@/api'

const TargetURL = '/n3n.sop.SopExecutManage'

export default {
  // SOP 실행 이력 리스트
<<<<<<< HEAD
  getSOPList: (payload) => {
    return HTTP.post(`${TargetURL}.selectSopExecutEndHistList.do`, payload)
  },
  // SMS 전송 이력 리스트
  getSMSList: (payload) => {
    return HTTP.post(`${TargetURL}.selectSopExecutSmsHistList.do`, payload)
  },
  // 센서 탐지 이력 리스트
  getSensorList: (payload) => {
    return HTTP.post(`${TargetURL}..selectSensorDetctHistList.do`, payload)
=======
  getSOPHistory: () => {
    return HTTP.post(`${TargetURL}.selectSopExecutEndHistList.do`, {}).then(res => {
      return res.data
    }).catch(error => {
      return console.log(`ERROR:${error}`)
    })
  },
  // SMS 전송 이력 리스트
  getSMSHistory: () => {
    return HTTP.post(`${TargetURL}.selectSopExecutSmsHistList.do`, {}).then(res => {
      return res.data
    }).catch(error => {
      return console.log(`ERROR:${error}`)
    })
  },
  // 센서 탐지 이력 리스트
  getSensorHistory: () => {
    return HTTP.post(`${TargetURL}..selectSensorDetctHistList.do`, {}).then(res => {
      return res.data
    }).catch(error => {
      return console.log(`ERROR:${error}`)
    })
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
  }
}
