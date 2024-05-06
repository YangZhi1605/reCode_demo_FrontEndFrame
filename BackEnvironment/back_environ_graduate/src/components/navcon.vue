/**
* 头部菜单
*/
<template>
  <el-menu class="el-menu-demo" mode="horizontal" background-color="#334157" text-color="#fff" active-text-color="#fff">
    <el-button class="buttonimg">
      <img class="showimg" :src="collapsed?imgsq:imgshow" @click="toggle(collapsed)">
    </el-button>
    <el-submenu index="2" class="submenu">
      <!-- <template slot="title">{{user.userRealName}}</template> -->
      <template slot="title">超级管理员</template>
<!--      <template slot="title">{{ username }}</template>-->
      <el-menu-item index="2-1">设置</el-menu-item>
      <el-menu-item @click="content()" index="2-2">个人中心</el-menu-item>
      <el-menu-item @click="exit()" index="2-3">退出</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
import { loginout } from '../api/userMG'
import { setCookie, getCookie, delCookie } from '../utils/util'
export default {
  name: 'navcon',
  data() {
    return {
      collapsed: true,
      imgshow: require('../assets/img/show.png'),
      imgsq: require('../assets/img/sq.png'),
      user: {},
      // username:'',
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
    this.user = JSON.parse(localStorage.getItem('userdata'))
  },
  computed:{
    // ...mapState(['username'])
    username() {
      // 从localStorage中读取用户信息
      // const user = JSON.parse(localStorage.getItem('token'));
      // 如果用户已登录，返回用户名，否则返回null
      // return user ? user.username : null;
    },
  },
  methods: {
    // 退出登录
    exit() {
      this.$confirm('退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          setTimeout(() => {
            // this.$store.commit('logout', 'false')
            // // 调用utils.js中的delCookie方法删除cookie
            // // this.$utils.delCookie('token')
            // this.$router.push({ path: '/login' })
            // this.$message({
            //   type: 'success',
            //   message: '已退出登录!'
            // })
            localStorage.removeItem("token"); // 清除token
            localStorage.removeItem("userdata"); // 如果需要也清除userdata
            this.$store.commit('logout', 'false'); // 更新store状态
            this.$message({
              type: 'success',
              message: '已退出登录!'
            });
            this.$router.push({ path: '/login' }); // 跳转到登录页
          }, 1000)
          // loginout()
          //   .then(res => {
          //     if (res.success) {
          //       //如果请求成功就让他2秒跳转路由
          //       setTimeout(() => {
          //         this.$store.commit('logout', 'false')
          //         this.$router.push({ path: '/login' })
          //         this.$message({
          //           type: 'success',
          //           message: '已退出登录!'
          //         })
          //       }, 1000)
          //     } else {
          //       this.$message.error(res.msg)
          //       this.logining = false
          //       return false
          //     }
          //   })
          //   .catch(err => {
          //     // 获取图形验证码
          //     this.getcode()
          //     this.logining = false
          //     this.$message.error('退出失败，请稍后再试！')
          //   })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    // 切换显示
    toggle(showtype) {
      this.collapsed = !showtype
      this.$root.Bus.$emit('toggle', this.collapsed)
    },

    // 个人中心
    content() {
      // this.$router.push({ path: '/content' })
      console.log('个人中心');
    },

  }
}
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
}
.submenu {
  float: right;
}
.buttonimg {
  height: 60px;
  background-color: transparent;
  border: none;
}
.showimg {
  width: 26px;
  height: 26px;
  position: absolute;
  top: 17px;
  left: 17px;
}
.showimg:active {
  border: none;
}
</style>
