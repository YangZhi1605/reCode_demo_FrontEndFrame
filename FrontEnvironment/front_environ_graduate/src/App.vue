<template>
  <div id="app">
    <el-container>
      <el-header>
<!--        顶部容器中将导航栏放进去-->
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="/index">首页</el-menu-item>
          <el-submenu index="/wrben">
            <template slot="title">我的工作台</template>
            <el-menu-item index="/wrben/wrben1">选项1</el-menu-item>
            <el-menu-item index="/wrben/wrben2">选项2</el-menu-item>
            <el-menu-item index="/wrben/wrben3">选项3</el-menu-item>
            <el-menu-item index="/wrben/wrben4">选项4</el-menu-item>
          </el-submenu>
          <el-menu-item index="/msg">日志维护</el-menu-item>
          <el-menu-item index="/store">零件仓库</el-menu-item>
          <el-menu-item index="/order">订单管理</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
<!--        在主体中显示组件-->
        <router-view/>
      </el-main>
      <el-footer>
<!--        使用组件-->
        <PageFooter/>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
//导入Footer组件
import PageFooter from "./components/utilpart/PageFooter.vue";
export default {
  name: 'App',
  //使用其他组件之前，一定要在Vue对象中注册
  components: {PageFooter},
  data() {
    return {
      activeIndex: '/index',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      //切换路由的事
      this.$router.push(key);
    }
  },
}
</script>

<style>

</style>
