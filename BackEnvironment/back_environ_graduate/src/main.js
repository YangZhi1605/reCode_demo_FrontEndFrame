// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// 引入element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
// 引入路由
import router from './router';
// 引入状态管理
import store from './vuex/store';
// 引入icon
import './assets/icon/iconfont.css'
//wc.它这里又是默认的npm 的axios。我那个前台反而又不可以
import axios from 'axios'
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

// 使用element UI
Vue.use(ElementUI);
// 过滤器
import * as custom from './utils/util'

Object.keys(custom).forEach(key => {
    Vue.filter(key, custom[key])
})

// 路由拦截器
router.beforeEach((to, from, next) => {
  //首先检查即将跳转的路由是否存在
    if (to.matched.length != 0) {
      //根据路由的meta属性决定是否需要登录验证。如果reqireAuth为true，代表这个路由需要登录后才能访问
        if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
          //通过查看localStorage中是否有用户信息来判断是否登录，localStorage是浏览器提供的本地存储，不会因为刷新而消失。不是下面的vuex
          //我将所有的"userInfo"检查替换为了"token"检查。只有当localStorage中有"token"字段时，我们才会视为用户已经登录。同时，这同样适用于对于不需要登录就可以访问的路由：如果用户已经登录，我们会检查他是否正在尝试访问根路由或登录页面，如果是，我们将重定向他到首页。
            if (Boolean(localStorage.getItem("token"))) { // 通过vuex state获取当前的user是否存在
                next();
            }
            //如果没有登录，跳转到登录页面。并且将跳转的路由path作为参数，并附上一个查询参数redirect，以便登录成功后跳转到原先尝试访问的页面
            else {
                next({
                    path: '/login',
                    query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                })
            }
        }
        //meta.requireAuth为false，代表这个路由不需要登录验证，直接跳转。这种情况仍然会检查是否已经登录了。
        else {
            if (Boolean(localStorage.getItem("token"))) { // 判断是否登录
              //如果已经登录，还会监测to.path是否为根路径"/"或者登录页"/login"，如果是，跳转到默认页面，比如此时的/goods/Goods
                if (to.path != "/" && to.path != "/login") { //判断是否要跳到登录界面
                    next();
                }
                else {
                    /**
                     * 防刷新，如果登录，修改路由跳转到登录页面，修改路由为登录后的首页
                     */
                    next({
                        path: '/goods/Goods'
                    })
                }
            } else {//不是上面的两种情况，直接跳转到需要的页面
                next();
            }
        }
    }
    else {//如果即将跳转的路由不存在，跳转到login页面
        next({
            path: '/login',
            query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store, //使用store vuex状态管理
    components: { App },
    template: '<App/>',
    data: {
        // 空的实例放到根组件下，所有的子组件都能调用
        Bus: new Vue()
    }

})
