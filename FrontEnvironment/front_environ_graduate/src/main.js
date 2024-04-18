// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入axios,因为已经全局导入了，在其他的文件中，就不需要逐一导入。并且我得使用$axios来调用axios
import axios from './assets/dist/axios.min'
//添加axios到Vue的原型中，这样在其他组件中就可以直接使用this.$axios
//** 后面模仿小米商城后导入的 ** //
//引入Swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
// 导入swiper的样式文件
import 'swiper/css/swiper.css'
// import VueAxios from 'vue-axios' //我用了类似的代替了
import VueLazyload from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'
import store from './store'
import VueRouter from 'vue-router'

/*注册相关*/
Vue.use(VueLazyload, {
  // preload: 1.3, // 表示lazyload元素距离底部距离百分比
  // loading: require('./assets/imgs/xxx.svg'), // 正在加载时显示的图片路径
  // error: require('./assets/imgs/xxx.svg'), // 图片加载失败时显示的图片路径
  // attempt: 5, // 图片加载失败后重试次数，默认3
  // loading:'/imgs/loading-svg/loading-bars.svg'
  loading:'./assets/imgs/loading-svg/loading-bars.svg'

})

Vue.use(VueRouter)
Vue.prototype.$message = Message;
Vue.use(VueCookie);
Vue.use(VueAwesomeSwiper)
Vue.prototype.$axios = axios
//注册ElementUI
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
// new Vue({
//   store,
//   router,  // 注入路由配置
//   render: h => h(App)
// }).$mount('#app')
