<template>
  <div id="app">
    <router-view></router-view>

  </div>
</template>

<script>
//导入Footer组件
import PageFooter from "./components/utilpart/PageFooter.vue";
import LoginDialog from "./components/component_repository/LoginDialog.vue";
export default {
  name: 'App',
  //使用其他组件之前，一定要在Vue对象中注册
  components: {
    PageFooter,
    LoginDialog
  },
  data() {
    return {
    };
  },
  methods: {

  },
}
</script>

<style>
</style>
