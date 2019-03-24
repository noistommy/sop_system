import HTTP from '@/api'
import BASE_URL from '@/api/config'

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
  },
  // SOP 실행 종료
  updateSopEnd: (payload) => {
    return HTTP.post(`${TargetURL}.updateSopEnd.do`, payload)
  },
  // SOP 제어권 전달
  controlOutSop: (payload) => {
    return HTTP.post(`${TargetURL}.updateSopExecutOprtr.do`, payload)
  },
  sopHistoryDownload: () => {
    location.href = `${BASE_URL}${TargetURL}.selectSopExecutEndHistListExcel.do`
  },
  smsHistoryDownload: () => {
    location.href = `${BASE_URL}${TargetURL}.selectSopExecutSmsHistListExcel.do`
  },
  sensorHistoryDownload: () => {
    location.href = `${BASE_URL}${TargetURL}.selectSensorDetctHistListExcel.do`
  }
}
