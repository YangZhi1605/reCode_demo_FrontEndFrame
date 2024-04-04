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

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/index'},
    {path: '/index', component:Index},
    // 这里用于下拉列表中的路由，应该是一个嵌套路由
    {
      path:'/wrben',component:Workbench,
      children:[
        {path: '/', redirect: '/wrben/wrben1'},
        {path: 'wrben1', component:Workbench1},
        {path: 'wrben2', component:Workbench2},
        {path: 'wrben3', component:Workbench3},
        {path: 'wrben4', component:Workbench4},
      ],
    },
    {path: '/msg', component:Message},
    {path: '/order', component:Order},

  ]
})
