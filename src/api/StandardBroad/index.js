import HTTP from '@/api'

const TargetURL = '/n3n.sop.BrdcstManage'

export default {
  // 표준방송목록조회
  getList: () => {
    return HTTP.post(`${TargetURL}.selectStdBrdcstList.do`, {})
  },
  // 표준방송상세정보조회
  getDetail: (payload) => {
    return HTTP.post(`${TargetURL}.selectStdBrdcstDetailInfo.do`, payload)
  },
  // 표준방송정보저장
  updateDetail: (payload) => {
    return HTTP.post(`${TargetURL}.saveStdBrdcstInfo.do`, payload)
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
