import HTTP from '@/api'

const TargetURL = '/n3n.sop.OprtrInfo'

export default {
  // 운영자관리목록조회
  getList: () => {
    return HTTP.post(`${TargetURL}.selectOprtrInfoList.do`, {})
  },
  // 운영자상세조회
  getDetail: () => {
    return HTTP.post(`${TargetURL}.selectOprtrInfoDetail.do`, {})
      .then(res => {
        return res.data
      })
      .catch(error => {
        return console.log(`ERROR:${error}`)
      })
  },
  // 운영자정보삭제
  deleteUser: (payload) => {
    return HTTP.post(`${TargetURL}.deleteOprtrInfo.do`, payload)
  },
  // 운영자정보등록
  createUser: (payload) => {
    return HTTP.post(`${TargetURL}.saveOprtrInfo.do`, payload)
  },
  // 운영자정보수정
  updateUser: (payload) => {
    return HTTP.post(`${TargetURL}.saveOprtrInfo.do`, payload)
  },
  // 운영자비밀번호초기화저장
  resetPasswordInit: (payload) => {
    return HTTP.post(`${TargetURL}.updatePasswordInit.do`, payload)
  },
  // 운영자비밀번호초기화저장
  resetPassword: (payload) => {
    return HTTP.post(`${TargetURL}.updatePassword.do`, payload)
  }
}
