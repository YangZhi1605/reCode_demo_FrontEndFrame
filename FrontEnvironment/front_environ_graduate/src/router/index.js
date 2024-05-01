import Vue from 'vue'
import Router from 'vue-router'
import Index from "../components/Index.vue";
import Workbench from "../components/workbench/Workbench.vue";
import Workbench1 from "../components/workbench/Workbench1.vue";
import Workbench2 from "../components/workbench/Workbench2.vue";
import Workbench3 from "../components/workbench/Workbench3.vue";
import Workbench4 from "../components/workbench/Workbench4.vue";
import Message from "../components/msgs/Message.vue";
import Order from "../components/order/Order.vue";
import IndexStore from "../components/storehouse/IndexStore.vue";
import Product from "../components/storehouse/product.vue";
import ToTest from "../components/storehouse/ToTest.vue";
import HomeStore from "../components/storehouse/HomeStore.vue";
import Login from "../components/login_register/Login.vue";
import Register from "../components/login_register/Register.vue";

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/index'},
    {path:'/login',component:Login},
    {path:'/register',component:Register},
    {path: '/index', component:Index},
    // 这里用于下拉列表中的路由，应该是一个嵌套路由
    {
      path:'/wrben',component:Workbench,
      children:[
        {path: '/', redirect: '/wrben/wrben1'},
        {path: 'wrben1', component:Workbench1},
        {path: 'wrben2', component:Workbench2},
        {path: 'wrben3', name:'EditPage', component:Workbench3},
        {path: 'wrben4', component:Workbench4},
      ],
    },
    {path: '/msg', component:Message},
    {path: '/order', component:Order},

    {
      path: '/store',
      name:'HomeStore', // 这里的name是为了在router-link中使用，例如<router-link :to="{name:'HomeStore'}">仓库</router-link>，这样就可以跳转到'/store
      component:HomeStore,
      children:[
        // {path:  '/store/:id', name: 'Product',component:Product},
        // 编写/store/的时候，需要在store.vue中添加<router-view></router-view>，
        // 这样才能显示/store/下的子路由。同时添加了默认的重定向到index_store
        {path: '/', redirect: '/store/index_store'},
        {path:  'test/:id', name: 'ToTest',component:ToTest},
        {path:  'index_store', name: 'IndexStore',component:IndexStore},
      ]
    },


  ]
})
