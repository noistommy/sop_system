
const sopMenuList = {
  defaultTab: 'sop-list',
  tabList: [
    { name: '재난관리조회', pathName: 'sop-list', default: true, icon: '' },
    { name: '재난관리생성', pathName: 'sop-edit', default: false, icon: '' },
    { name: '재난관리실행', pathName: 'sop-run', default: false, icon: '' }
  ]
}

const memberMenuList = {
  defaultTab: 'membergroup',
  tabList: [
    { name: '조직도관리', pathName: 'membergroup', default: true, icon: '' },
    { name: '자위소방대관리', pathName: 'firebrigade', default: false, icon: '' },
    { name: '협력업체관리', pathName: 'partner', default: false, icon: '' }
  ]
}

const historyMenuList = {
  defaultTab: 'sophistory',
  tabList: [
    { name: 'SOP실행이력', pathName: 'sophistory', default: true, icon: '' },
    { name: 'SMS전송이력', pathName: 'smshistory', default: false, icon: '' },
    { name: '센서탐지이력', pathName: 'sensorhistory', default: false, icon: '' }
  ]
}

const standardInfoMenuList = {
  defaultTab: 'location-info',
  tabList: [
    { name: '건물/층관리', pathName: 'location-info', default: true, icon: '' },
    { name: '장비유형관리', pathName: 'sensor-type', default: false, icon: '' },
    { name: '표준문자관리', pathName: 'standard-sms', default: false, icon: '' },
    { name: '표준방송관리', pathName: 'standard-broad', default: false, icon: '' },
    { name: '공통코드관리', pathName: 'public-code', default: false, icon: '' },
    { name: '운영자관리', pathName: 'system-user', default: false, icon: '' }
  ]
}

// TABLE HEADER
// 실행이력

const sopHistoryTableHeader = {
  headers: [
    { text: 'NO', align: 'center', value: 'no', size: '' },
    { text: '날짜', align: 'center', value: 'date', size: '' },
    { text: '분류', align: 'center', value: 'type', size: '' },
    { text: 'SOP명', align: 'center', value: 'title', size: '' },
    { text: '위치', align: 'center', value: 'location', size: 'four' },
    { text: '종료시간', align: 'center', value: 'endtime', size: '' }
  ]
}
// sms전송이력
const smsHistoryTableHeader = {
  headers: [
    { text: 'NO', align: 'center', value: 'no', size: '' },
    { text: '날짜', align: 'center', value: 'date', size: '' },
    { text: '위치', align: 'center', value: 'location', size: 'four' },
    { text: '전송인원', align: 'center', value: 'endtime', size: '' },
    { text: '전송내용', align: 'center', value: 'endtime', size: 'six' }
  ]
}
// 센서탐지이력
const sensorHistoryTableHeader = {
  headers: [
    { text: 'NO', align: 'center', value: 'no', size: '' },
    { text: '발생시간', align: 'center', value: 'date', size: '' },
    { text: '종료시간', align: 'center', value: 'date', size: '' },
    { text: '발생위치', align: 'center', value: 'location', size: 'four' },
    { text: '구역명', align: 'center', value: 'endtime', size: '' },
    { text: '센서종류', align: 'center', value: 'endtime', size: '' },
    { text: '처리상태', align: 'center', value: 'endtime', size: '' }
  ]
}
// 공지사항
const noticeTableHeader = {
  headers: [
    { text: 'NO', align: 'center', value: 'no', size: '' },
    { text: '제목', align: 'center', value: 'date', size: '' },
    { text: '게시시간', align: 'center', value: 'endtime', size: '' },
    { text: '작성자', align: 'center', value: 'manager', size: '' },
    { text: '분류', align: 'center', value: 'type', size: '' },
    { text: '작성일', align: 'center', value: 'title', size: '' },
    { text: '조회수', align: 'center', value: 'location', size: 'four' }
  ]
}
// 조직도
const memberGroupeHeader = {
  headers: [
    { text: '이름', align: 'center', value: 'emplNm', size: '' },
    { text: '직급', align: 'center', value: 'ofcpsCdNm', size: '' },
    { text: '직위', align: 'center', value: 'clsfCdNm', size: '' },
    { text: '부서', align: 'center', value: 'deptNm', size: '' },
    { text: '휴대전화번호', align: 'center', value: 'moblphonNo', size: 'four' }
  ]
}
// 자위소방대
const fireBrigadeGroupHeader = {
  headers: [
    { text: '이름', align: 'center', value: 'emplNm', size: '' },
    { text: '직급', align: 'center', value: 'ofcpsCdNm', size: '' },
    { text: '직위', align: 'center', value: 'clsfCdNm', size: '' },
    { text: '부서', align: 'center', value: 'deptNm', size: '' }
  ]
}
// 협력업체
const partnerGroupeHeader = {
  headers: [
    { text: '이름', align: 'center', value: 'emplNm', size: '' },
    { text: '직급', align: 'center', value: 'ofcpsCdNm', size: '' },
    { text: '직위', align: 'center', value: 'clsfCdNm', size: '' },
    { text: '휴대전화번호', align: 'center', value: 'moblphonNo', size: 'four' }
  ]
}
// 건물/층 관리 - 건물관리
// 건물/층 관리 - 건물층 정보
// 장비관리-장비구분관리
// 장비관리-구분별 센서 목록
// 표준문자관리
// 표준방송관리
// 공통코드-공통코드 관리
// 공통코드-공통코드 상세목록
// 운영자 관리

export {
  sopMenuList,
  memberMenuList,
  historyMenuList,
  standardInfoMenuList,
  sopHistoryTableHeader,
  smsHistoryTableHeader,
  sensorHistoryTableHeader,
  noticeTableHeader,
  memberGroupeHeader,
  fireBrigadeGroupHeader,
  partnerGroupeHeader
}
