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
import ToTest from "../components/storehouse/ToTest.vue";
import HomeStore from "../components/storehouse/HomeStore.vue";
import Login from "../components/login_register/Login.vue";
import Register from "../components/login_register/Register.vue";
import Login_Register_Home from "../components/login_register/Login_Register_Home.vue";
import Home from "../components/Home.vue";
import Cart from "../components/Cart.vue";
import OrderList from "../components/order/orderList.vue";
import OrderConfirm from "../components/order/orderConfirm.vue";
import OrderPay from "../components/order/orderPay.vue";
import Alipay from "../components/order/alipay.vue";
Vue.use(Router)

export default new Router({
  // routes: [
  //   // 确认首先的根路由是/login，然后在login.vue中进行判断，如果已经登录，则跳转到/index
  //   {path: '/', redirect: '/index'},
  //   {
  //     path:'/login_register_home',component:Login_Register_Home,
  //     children:[
  //       {path: 'login', component: Login},
  //       {path: 'register', component: Register},
  //     ]
  //   },
  //   {path: '/index', component:Index},
  //   // 这里用于下拉列表中的路由，应该是一个嵌套路由
  //   {
  //     path:'/wrben',component:Workbench,
  //     children:[
  //       {path: '/', redirect: '/wrben/wrben1'},
  //       {path: 'wrben1', component:Workbench1},
  //       {path: 'wrben2', component:Workbench2},
  //       {path: 'wrben3', name:'EditPage', component:Workbench3},
  //       {path: 'wrben4', component:Workbench4},
  //     ],
  //   },
  //   {path: '/msg', component:Message},
  //   {path: '/order', component:Order},
  //
  //   {
  //     path: '/store',
  //     name:'HomeStore', // 这里的name是为了在router-link中使用，例如<router-link :to="{name:'HomeStore'}">仓库</router-link>，这样就可以跳转到'/store
  //     component:HomeStore,
  //     children:[
  //       // {path:  '/store/:id', name: 'Product',component:Product},
  //       // 编写/store/的时候，需要在store.vue中添加<router-view></router-view>，
  //       // 这样才能显示/store/下的子路由。同时添加了默认的重定向到index_store
  //       {path: '/', redirect: '/store/index_store'},
  //       {path:  'test/:id', name: 'ToTest',component:ToTest},
  //       {path:  'index_store', name: 'IndexStore',component:IndexStore},
  //     ]
  //   },
  //
  //
  // ]
  routes:[
    //进来的默认路由画面，以及这个路由中的子路由
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/index',
      meta: { requireAuth: true },
      children: [
        {
          path: '/index',
          name: 'index',
          component: Index,
          meta: { requireAuth: true },
        },
        {
          path: '/workbench',
          name: 'workbench',
          component: Workbench,
          meta: { requireAuth: true },
          children:[
            {path: '/', redirect: '/workbench/workbench1'},
            {path: 'workbench1', component: Workbench1,meta: { requireAuth: true },},
            {path: 'workbench2', component: Workbench2,meta: { requireAuth: true },},
            {path: 'workbench3', name:'EditPage', component: Workbench3,meta: { requireAuth: true },},
            {path: 'workbench4', component: Workbench4, meta: { requireAuth: true },},
          ]
        },
        {
          path: '/msg',
          name: 'msg',
          component: Message,
          meta: { requireAuth: true }
        },
        {
          path: '/store',
          name: 'store',
          component: HomeStore,
          meta: { requireAuth: true },
          children:[
            {path: '/', redirect: '/store/index_store',meta: { requireAuth: true }},
            {path: 'test/:id', name: 'ToTest', component: ToTest,meta: { requireAuth: true }},
            {path: 'index_store', name: 'IndexStore', component: IndexStore,meta: { requireAuth: true }},
          ]
        },
      ]
    },
    //管理订单的路由
    {
      path: '/order',
      name: 'order',
      component: Order,
      meta: { requireAuth: true },
      children: [
        {
          path: 'list',
          name: 'order-list',
          component: OrderList,
          meta: { requireAuth: true },
        },
        {
          path: 'confirm',
          name: 'order-confirm',
          component: OrderConfirm,
          meta: { requireAuth: true },
        },
        {
          path: 'pay',
          name: 'order-pay',
          component: OrderPay,
          meta: { requireAuth: true },
        },
        {
          path: 'alipay',
          name: 'alipay',
          component: Alipay,
          meta: { requireAuth: true },
        }
      ]
    },
    //登录的路由
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    //注册的路由
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    //购物车路由
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },



]
})
