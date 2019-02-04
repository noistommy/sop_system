import HTTP from '@/api'

const TargetURL = '/n3n.sop.Notice'

export default {
  // 공지사항목록조회
  getNoticeList: () => {
    return HTTP.post(`${TargetURL}.selectNoticeList.do`, {})
      .then(res => {
        return res.data
      })
      .catch(error => {
        return console.log(`ERROR:${error}`)
      })
  },
  // 공지사항상세조회
  getNoticeDetail: () => {
    return HTTP.post(`${TargetURL}.selectNoticeDetail.do`, {})
      .then(res => {
        return res.data
      })
      .catch(error => {
        return console.log(`ERROR:${error}`)
      })
  },
  // 공지사항저장
  setNotice: () => {
    return HTTP.post(`${TargetURL}.saveNotice.do`, {})
      .then(res => {
        return res.data
      })
      .catch(error => {
        return console.log(`ERROR:${error}`)
      })
  },
  // 공지사항수정
  updateNotice: () => {
    return HTTP.post(`${TargetURL}.saveNotice.do`, {})
      .then(res => {
        return res.data
      })
      .catch(error => {
        return console.log(`ERROR:${error}`)
      })
  },
  // 공지사항목록삭제
  deleteNotice: () => {
    return HTTP.post(`${TargetURL}.deleteNotice.do`, {})
      .then(res => {
        return res.data
      })
      .catch(error => {
        return console.log(`ERROR:${error}`)
      })
  }
}
