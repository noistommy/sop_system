import HTTP from '@/api'

const TargetURL = '/n3n.sop.Notice'

export default {
  // 공지사항목록조회
  getList: () => {
    return HTTP.post(`${TargetURL}.selectNoticeList.do`, {})
  },
  // 공지사항상세조회
  getItem: () => {
    return HTTP.post(`${TargetURL}.selectNoticeDetail.do`, {})
  },
  // 공지사항저장
  setItem: () => {
    return HTTP.post(`${TargetURL}.saveNotice.do`, {})
  },
  // 공지사항수정
  updateItem: () => {
    return HTTP.post(`${TargetURL}.saveNotice.do`, {})
  },
  // 공지사항목록삭제
  deleteItem: (payload) => {
    return HTTP.post(`${TargetURL}.deleteNotice.do`, payload)
  }
}
