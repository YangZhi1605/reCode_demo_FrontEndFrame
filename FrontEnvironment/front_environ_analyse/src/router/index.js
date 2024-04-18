import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Index from '@/views/index'
import IndexChild1 from "../views/IndexChild1.vue";

Vue.use(Router)

Router.prototype.goBack = function (val) {
  store.commit('SET_DIRECTION', val);
  if(store.state.direction == 'tip'){
    window.history.go(-1);
  }else{
    setTimeout(()=>{window.history.go(-1)},50);
  }
}

const router =  new Router({
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [
        {
          path: 'indexChild1',
          name: 'IndexChild1',
          component: IndexChild1
        }
      ],
    }
  ]
})

router.afterEach((to, from) => {
  if(store.state.direction !== 'tip')
    store.commit('SET_DIRECTION', 'tip');
})

export default router;
