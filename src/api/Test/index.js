import HTTP from '@/api'

const TargetURL = '/n3n.sop'

export default {
  getData: () => {
    return HTTP.post(`${TargetURL}.OrgnztInfo.selectOrgnztInfoTrList.do`, {}).then(res => {
      console.log('testTestAPAI')
      return res
    }).catch(error => {
      return console.log(`ERROR:${error}`)
    })
  },
  getDataList: () => {
    return HTTP.post(`${TargetURL}.OrgnztInfo.selectOrgnztInfoTrList.do`, {}).then(res => {
      console.log('testTestAPAI2')
      return res
    }).catch(error => {
      return console.log(`ERROR:${error}`)
    })
  }
}
