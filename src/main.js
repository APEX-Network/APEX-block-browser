// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './vuex/store'
import i18n from './lang/i18n'
import echarts from 'echarts'
import 'babel-polyfill'
import './assets/css/bootstrap.min.css'
import './assets/css/shard.css'
import './assets/css/layout.css'
import VueClipboard from 'vue-clipboard2'
 
Vue.use(VueClipboard)
Vue.use(Vuex)
Vue.config.productionTip = false


Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
