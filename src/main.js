import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/vuex/store'
import 'jquery'
import axios from 'axios'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'

import VModal from 'vue-js-modal'

import AuthApi from '@/api/Auth'

// Import Semantic ui
import '../semantic/dist/semantic'
import '../semantic/dist/semantic.min.css'

import './assets/css/fontello.css'

Vue.use(VModal, {
  dynamic: true,
  injectModalsContainer: true,
  dialog: true
})

Vue.use(VCalendar, {
  firstDayOfWeek: 1
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  console.log('beforeEach')
  AuthApi.session().then(result => {
    console.log(result)
  }).catch(error => {
    console.log(error)
  })
  return next()
})
