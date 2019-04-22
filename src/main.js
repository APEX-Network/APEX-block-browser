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
import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';
import axios from 'axios'
// import SetClickValue from './utils/setClickValue'
import BitcoinJS from 'bitcoinjs-lib'
import base58check from 'base58check'
import base58 from 'base58'
import Select2 from 'v-select2-component';
Vue.component('Select2', Select2);

// Vue.use(api)
Vue.prototype.$axios = axios;
Vue.prototype.$BitcoinJS = BitcoinJS;
Vue.prototype.$Base58check = base58check;
Vue.prototype.$Base58 = base58;
// Vue.prototype.setClickValue = SetClickValue;
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard)
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(vuescroll, {
    ops: {
    mode: "native",
    bar: {
    /** 当不做任何操作时滚动条自动消失的时间 */
    showDelay: 500,
    /** 是否只在滚动的时候现实滚动条 */
    onlyShowBarOnScroll: true,
    /** 是否保持显示*/
    keepShow: false,
    /** 背景色*/
    background: "#c1c1c1",
    /**  透明度  */
    opacity: 1,
    /** 当你鼠标移动到滚动条的时候滚动条的样式， 返回一个style对象， 和现在的对象融合*/
    hoverStyle: false,
    /** 是否保持rail显示即使内容高度不足的情况下。 */
    keepShow: false
  }
},  
// name: 'myScroll' // 在这里自定义组件名字，默认是vueScroll
})


Vue.prototype.$echarts = echarts;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>',
})
