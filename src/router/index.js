import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import SopManage from '@/views/SopManage.vue'
import MemberManage from '@/views/MemberManage.vue'
import HistoryManage from '@/views/HistoryManage.vue'
import StandardInfoManage from '@/views/StandardInfoManage.vue'
import NoticeManage from '@/views/NoticeManage.vue'
import TestPage from '@/views/TestPage.vue'
import {
  SopList,
  SopEdit,
  SopRun,
  MemberGroup,
  FireBrigade,
  Partner,
  SopHistory,
  SmsHistory,
  SensorHistory,
  LocationInfo,
  SensorType,
  StandardSms,
  StandardBroad,
  PublicCode,
  SystemUser
} from '@/views/subs'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/sopmanage',
      name: 'sop-manage',
      component: SopManage,
      children: [
        {
          path: 'soplist',
          name: 'sop-list',
          component: SopList
        },
        {
          path: 'sopedit',
          name: 'sop-edit',
          component: SopEdit
        },
        {
          path: 'soprun',
          name: 'sop-run',
          component: SopRun
        }
      ]
    },
    {
      path: '/membermanage',
      name: 'member-manage',
      component: MemberManage,
      children: [
        {
          path: 'membergroup',
          name: 'membergroup',
          component: MemberGroup
        },
        {
          path: 'firebrigade',
          name: 'firebrigade',
          component: FireBrigade
        },
        {
          path: 'partner',
          name: 'partner',
          component: Partner
        }
      ]
    },
    {
      path: '/historymanage',
      name: 'history-manage',
      component: HistoryManage,
      children: [
        {
          path: 'sophistory',
          name: 'sophistory',
          component: SopHistory
        },
        {
          path: 'smshistory',
          name: 'smshistory',
          component: SmsHistory
        },
        {
          path: 'sensorhistory',
          name: 'sensorhistory',
          component: SensorHistory
        }
      ]
    },
    {
      path: '/standardinfomanage',
      name: 'standard-info-manage',
      component: StandardInfoManage,
      children: [
        {
          path: 'locationinfo',
          name: 'location-info',
          component: LocationInfo
        },
        {
          path: 'sensortype',
          name: 'sensor-type',
          component: SensorType
        },
        {
          path: 'standardsms',
          name: 'standard-sms',
          component: StandardSms
        },
        {
          path: 'standardbroad',
          name: 'standard-broad',
          component: StandardBroad
        },
        {
          path: 'publiccode',
          name: 'public-code',
          component: PublicCode
        },
        {
          path: 'systemuser',
          name: 'system-user',
          component: SystemUser
        }
      ]
    },
    {
      path: '/notice',
      name: 'notice-manage',
      component: NoticeManage
    },
    {
      path: '/testpage',
      name: 'test-page',
      component: TestPage
    },
    {
      path: '/login',
      name: 'login',
      // component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
      meta: {
        layout: 'login'
      }
    },
    {
      path: '*',
      name: 'error',
      meta: {
        layout: 'notfound'
      }
    }
  ]
})
