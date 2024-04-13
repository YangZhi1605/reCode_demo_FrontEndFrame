import Vue from 'vue'
import Router from 'vue-router'
import Index from "../components/Index.vue";
import UserList from "../components/user/UserList.vue";
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/index'},
    {path: '/index',component:Index},
    {path: '/users',component:UserList},

  ]
})
