import Vue from 'vue'
import Router from 'vue-router'
import Button from "../components/Button.vue";
import Layout from "../components/Layout.vue";
import Container from "../components/Container.vue";
import ContainerExample from "../components/ContainerExample.vue";
import RadioCom from "../components/RadioCom.vue";

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/button',component: Button},
    {path: '/layout',component: Layout},
    {path: '/container',component: Container},
    {path: '/containerexa',component: ContainerExample},
    {path: '/radio',component: RadioCom},
  ]
})
