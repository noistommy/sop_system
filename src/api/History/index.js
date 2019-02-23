import HTTP from '@/api'

const TargetURL = '/n3n.sop.SopExecutManage'

export default {
  // SOP 실행 이력 리스트
  getSOPList: (payload) => {
    return HTTP.post(`${TargetURL}.selectSopExecutEndHistList.do`, payload)
  },
  // SMS 전송 이력 리스트
  getSMSList: (payload) => {
    return HTTP.post(`${TargetURL}.selectSopExecutSmsHistList.do`, payload)
  },
  // 센서 탐지 이력 리스트
  getSensorList: (payload) => {
    return HTTP.post(`${TargetURL}.selectSensorDetctHistList.do`, payload)
  },
  // SOP 실행 이력 다운로드
  getSOPExcel: (payload) => {
    return HTTP.post(`${TargetURL}.selectSopExecutEndHistListExcel.do`, payload)
  },
  // SMS 전송 이력 리스트
  getSMSExcel: (payload) => {
    return HTTP.post(`${TargetURL}.selectSopExecutSmsHistListExcel.do`, payload)
  },
  // 센서 탐지 이력 리스트
  getSensorExcel: (payload) => {
    return HTTP.post(`${TargetURL}.selectSensorDetctHistListExcel.do`, payload)
  }
}
