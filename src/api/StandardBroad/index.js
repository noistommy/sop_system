import HTTP from '@/api'

const TargetURL = '/n3n.sop.BrdcstManage'

export default {
  // 표준방송목록조회
  getStandardBroadList: () => {
    return HTTP.post(`${TargetURL}.selectStdBrdcstList.do`, {})
      .then(res => {
        return res.data
      })
      .catch(error => {
        return console.log(`ERROR:${error}`)
      })
  },
  // 표준방송상세정보조회
  getStandardBroadDetail: () => {
    return HTTP.post(`${TargetURL}.selectStdBrdcstDetailInfo.do`, {})
      .then(res => {
        return res.data
      })
      .catch(error => {
        return console.log(`ERROR:${error}`)
      })
  },
  // 표준방송정보저장
  updateStandardBroad: () => {
    return HTTP.post(`${TargetURL}.saveStdBrdcstInfo.do`, {})
      .then(res => {
        return res.data
      })
      .catch(error => {
        return console.log(`ERROR:${error}`)
      })
  },
  // 표준방송검증
  checkStandardBroad: () => {
    return HTTP.post(`${TargetURL}.selectStdBrdcstVrify.do`, {})
      .then(res => {
        return res.data
      })
      .catch(error => {
        return console.log(`ERROR:${error}`)
      })
  }
}
