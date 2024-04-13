<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="/index">主页</el-menu-item>
          <el-menu-item index="/users">用户中心</el-menu-item>
          <el-menu-item index="/msgs">消息管理</el-menu-item>
          <el-menu-item index="/orders">订单管理</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <!--        主体容器中应该显示路由组件-->
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
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
