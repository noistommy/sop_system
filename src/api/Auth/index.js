import HTTP from '@/api'

const TargetURL = '/n3n.sop.OprtrInfo'

export default {
  // 로그인
  login: (payload) => {
    return HTTP.post(`${TargetURL}.login.do`, payload)
  },
  logout: () => {
<<<<<<< HEAD
    return HTTP.post(`${TargetURL}.logout.do`, {})
=======
    return HTTP.post(`${TargetURL}.logout.do`)
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
  }
}
