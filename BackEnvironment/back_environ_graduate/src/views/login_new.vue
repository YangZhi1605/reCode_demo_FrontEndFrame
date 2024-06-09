<template xmlns="http://www.w3.org/1999/html">
  <div class="login-container_me">
    <div class="slider">
      <!--    建立两个表单-->
<!--      第一个表单-->
<!--      <div class="form">-->
      <div :class="active === 1?'form':'form hidden'" >
        <div class="title">欢迎 <b>回来</b></div>
        <div class="subtitle">登录你的账户</div>
        <div class="inputf" v-if="!validUsername">
          <input type="text"  v-model="loginFormData.username" placeholder="用户名"/>
          <span class="label">用户名</span>
        </div>
        <div class="inputf" v-if="!validPassword">
          <input type="password" v-model="loginFormData.password" placeholder="密码"/>
          <span class="label">密码</span>
        </div>
        <button @click="login">登录</button>
      </div>
<!--第二个表单得先被遮挡-->
<!--      <div class="form hidden">-->
      <div :class="active === 2?'form':'form hidden'">
        <div class="title">开始</div>
        <div class="subtitle">创建你的账户</div>
        <div class="inputf">
          <input type="text" v-model="registerFormData.username" placeholder="用户名"/>
          <span class="label">用户名</span>
        </div>
        <div class="inputf">
          <input type="text" v-model="registerFormData.email" placeholder="邮箱"/>
          <span class="label">邮箱</span>
        </div>
        <div class="inputf">
          <input type="text" v-model="registerFormData.contact" placeholder="联系方式"/>
          <span class="label">联系方式</span>
        </div>
        <div class="inputf">
          <input type="text" v-model="registerFormData.password" placeholder="密码"/>
          <span class="label">密码</span>
        </div>
        <button @click="register">注册</button>
      </div>
      <!--    写中间展示的卡片-->
<!--      <div class="card active">-->
      <div :class="active === 1?'card':'card active'">
        <div class="head">
          <div class="name">
            机器<span>学习系统</span>
          </div>
        </div>
        <div class="desc">开启系统管理之路~</div>
        <div class="btn">
          {{ active===1?'新用户？':'已有账户？' }}
          <button @click="active=(active===1)?2:1"> {{ active===1?'去注册':'去登录' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》 ';
// import {ref} from 'vue'
// const active = ref(1)


export default {
  name: 'login_new',
  // import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    // 这里存放数据
    return {
      loading: false,
      active:1,
      validUsername: false,
      validPassword: false,
      loginFormData: {
        username: '',
        password: '',
      },
      registerFormData: {
        username: '',
        email: '',
        contact: '',
        password: '',
      },
    }
  },

  methods: {
    async login() {
      console.log('登录表单数据：', this.loginFormData);
      this.logining = true; // 开始登录，显示登录状态指示器

      try {
        const response = await this.$axios.post('http://127.0.0.1:5000/api/is_exist', this.loginFormData);
        if (response.data.success) {
          console.log('登录成功！');
          this.$message.success('登录成功！'); // 使用消息提示组件显示成功信息
          localStorage.setItem('token', response.data.token); // 保存Token到本地存储
          //存储用户信息
          // localStorage.setItem('user', JSON.stringify(response.data.user));

          setTimeout(() => { // 延迟跳转
            this.$router.push('/goods/Goods');
          }, 1000); // 假设延迟1秒后跳转
        } else {
          console.log('登录失败：', response.data.message);
          this.$message.error(response.data.message); // 使用消息提示组件显示错误信息
        }
        this.logining = false; // 登录结束，隐藏登录状态指示器
      } catch (error) {
        console.error('登录请求发送失败', error);
        this.$message.error('登录请求发送失败'); // 显示请求失败消息
        this.logining = false;
      }
    },
    async register() {
      // 这里是你注册的逻辑，例如使用 axios 发送请求到后端
      console.log('注册表单数据：', this.registerFormData);

      //向后端发送注册的post请求
      const response = await this.$axios.post('http://127.0.0.1:5000/api/add_user_info', this.registerFormData);
      console.log('注册请求返回：', response.data);
      //注册成功
      if (response.data.success) {
        this.$message.success('注册成功！'); // 使用消息提示组件显示成功信息
        //注册成功后跳转到登录页面
        this.active = 1;
      } else {
        this.$message.error(response.data.message); // 使用消息提示组件显示错误信息
      }
      //置空注册表单
      this.registerFormData = {
        username: '',
        email: '',
        contact: '',
        password: '',
      };

    },
  },
  // 生命周期 - 创建完成（可以访问当前this 实例）
  created() {
  },
}
</script>

<style lang="scss">
.login-container_me {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/img/background_picture.jpg") no-repeat center center;
  background-size: cover;
  .slider{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .form{
      width: 300px;
      height: 400px;
      background: rgba(17,25,40,0.75);
      backdrop-filter: blur(16px) saturate(0);
      border-radius: 10px;
      padding: 40px 60px;
      box-shadow: rgba(50,50,93,0.25) 50px 50px 100px -20px,
      rgba(0,0,93,0.5) 30px 30px 60px -30px,
      rgba(212,217,222,0.35) 2px -2px 6px 0px inset;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: flex-start;
      margin: 0 10px;
      z-index: 3;
      transition: 0.3s ease-out;

      //写动画效果，先把这个隐藏
      &.hidden{
        height: 325px;
        box-shadow: none;
        z-index: 1;
      }

      //标题样式
      .title{
        font-size: 18px;
        color: rgb(246,240,255);
        letter-spacing: 1px;
        font-weight: 300;

      }
      //副标题样式
      .subtitle{
        font-size: 11px;
        color: rgb(246,240,255);
        letter-spacing: 1px;
        margin-bottom: 35px;
      }
      //输入框这个整体结构的样式
      .inputf{
        width: 100%;
        position: relative;
        margin-bottom: 35px;
        input{
          width: 100%;
          height: 35px;
          border: none;
          outline: 1.5px solid rgb(200,200,220);
          background: transparent;
          border-radius: 8px;
          font-size: 12px;
          padding: 0 15px;
          color: rgb(246,249,255);
          &::placeholder{
            color: rgb(175,180,190);
          }
          //写鼠标聚焦效果
          &:focus{
            outline: 1.5px solid rgb(224,229,240);
            &::placeholder{
              opacity: 0;
            }
            & + .label{
              opacity: 1;
              top: -20px;
            }
          }
          //让上面的鼠标聚焦后，在输入文本到输入框之后，那个聚焦仍然在。
          &:not(:placeholder-shown)+.label{
            opacity: 1;
            top: -20px;
          }
        }
        .label{
          position: absolute;
          top: 0;
          left: 0;
          color: rgb(246,249,255);
          font-size: 11px;
          font-width: bold;
          transition: 0.25s ease-out;
          opacity: 0;
        }
      }
      button{
        width: 100%;
        height: 35px;
        background: rgb(36,217,127);
        color: #ffffff;
        border: none;
        outline: none;
        border-radius: 5px;
        font-weight: bold;
        font-size: 12px;
        cursor: pointer;
      }
    }
    .card{
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(0,-50%);
      width: 370px;
      height: 330px;
      background: url("../assets/img/tmp1.jpg") white;
      background-size: contain;
      padding: 40px;
      border-radius: 0 10px 10px 0;
      transition: 0.5s ease-out;
      z-index: 2;

      &.active{
        right: calc(100% - 430px);
        border-radius: 10px 0 0 10px;
      }

      .head{
        font-size:34px;
        margin-bottom: 35px;
        .name{
          font-weight: 300;
          span{
            color: rgb(36,217,127);
            font-weight: bold;
          }
        }
      }
      .desc{
        font-size: 14px;
        text-align: justify;
        margin-bottom: 35px;
      }
      .btn{
        font-size:14px;
        button{
          background:rgb(36,217,127);
          font-size: 14px;
          padding: 5px 15px;
          border: none;
          outline: none;
          border-radius: 5px;
          cursor: pointer;
          margin-left: 10px;
        }
      }

    }
  }

}
</style>
