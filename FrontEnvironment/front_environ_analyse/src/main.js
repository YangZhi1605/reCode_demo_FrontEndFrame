import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/filters'
import "babel-polyfill"
import 'lib-flexible/flexible'
import '@/assets/scss/index.scss'

import FastClick from 'fastclick'
FastClick.attach(document.body)

import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

import transition from '@/components/layout/transition';
Vue.component('lg-transition', transition);

//引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from "axios";
Vue.config.productionTip = false
//注册ElementUI
Vue.use(ElementUI)
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 将路由对象挂载到Vue实例上
  router,
  store,
  components: { App },
  template: '<App/>'
})
