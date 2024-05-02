<template>
  <div id="app">
<!--    <el-container>-->
<!--      &lt;!&ndash;        顶部容器中将导航栏放进去&ndash;&gt;-->
<!--      <el-header>-->
<!--        <div class="header-menu-container">-->
<!--          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">-->
<!--            <el-menu-item index="/index">首页</el-menu-item>-->
<!--            <el-submenu index="/wrben">-->
<!--              <template slot="title">我的工作台</template>-->
<!--              <el-menu-item index="/wrben/wrben1">信息loading</el-menu-item>-->
<!--              <el-menu-item index="/wrben/wrben2">数据showing</el-menu-item>-->
<!--              <el-menu-item index="/wrben/wrben3">修改editing</el-menu-item>-->
<!--              <el-menu-item index="/wrben/wrben4">选项4</el-menu-item>-->
<!--            </el-submenu>-->
<!--            <el-menu-item index="/msg">日志维护</el-menu-item>-->
<!--            <el-menu-item index="/store">零件仓库</el-menu-item>-->
<!--            <el-menu-item index="/order">订单管理</el-menu-item>-->
<!--          </el-menu>-->
<!--          &lt;!&ndash; 用户信息显示区域，放在最右侧 &ndash;&gt;-->
<!--          <el-menu :default-active="activeIndex" class="user-info" mode="horizontal" @select="handleSelect">-->
<!--            <el-menu-item index="/login_register_home" @click.native="handleUserClick">-->
<!--              <i class="el-icon-user"></i>-->
<!--              <span>{{ userStatus }}</span>-->
<!--            </el-menu-item>-->
<!--          </el-menu>-->
<!--        </div>-->
<!--      </el-header>-->

<!--      <el-main>-->
<!--&lt;!&ndash;        在主体中显示组件&ndash;&gt;-->
<!--        <router-view/>-->
<!--      </el-main>-->

<!--    </el-container>-->
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
      activeIndex: '/index',
      userStatus: '未登录', // 默认显示文本
      userLoggedIn: false,  // 用户是否登录的标志
      showLoginModal: false // 控制登录框显示的标志
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      //切换路由的事
      this.$router.push(key);
    },
    handleUserClick() {
      // 这里可以根据实际的用户认证逻辑来决定弹出登录框或者跳转到登录页面
      if(this.userLoggedIn) {
        // 已登录状态下的逻辑，比如展示用户菜单或者个人中心
      } else {
        // 未登录状态下的逻辑，弹出登录框或者跳转
        // this.showLoginModal = true;
        // 或者跳转到登录页面
        this.$router.push('/login_register_home/login');
      }
    }
  },
}
</script>

<style>
.header-menu-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-menu-container .el-menu-demo {
  flex: 1;
}

.header-menu-container .user-info {
  margin-left: 20px; /* 或者根据实际需求调整 */
}

</style>
