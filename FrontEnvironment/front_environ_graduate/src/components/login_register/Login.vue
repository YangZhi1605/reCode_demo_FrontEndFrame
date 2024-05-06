<template>
  <div class="login-wrapper">
    <el-form
      ref="loginForm"
      :rules="rules"
      label-position="top"
      class="login-form"
      :model="loginData"
      @submit.native.prevent="onLogin"
    >
      <h3 class="login-title">用户登录</h3>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="loginData.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginData.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item class="form-actions">
        <el-button type="primary" block @click="onLogin">登录</el-button>
      </el-form-item>
      <el-form-item class="form-register-link">
        <router-link to="/register">@没有账号？来注册账号吧~</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginData: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
          {
            pattern: /(?=.*[A-Za-z])(?=.*[\x21-\x2f\x3a-\x40]).+/,
            message: '密码必须包含英文字符和特殊字符',
            trigger: 'blur'
          }
        ],
      },
    };
  },
  methods: {
    onLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 表单验证通过，处理登录逻辑
          console.log('login success:', this.loginData);
          // 向后端发送axios的post请求，验证邮箱和密码是否正确
          this.$axios.post('http://127.0.0.1:5000/api/is_exist_front_user_login', {
            email: this.loginData.email,
            password: this.loginData.password
          }).then(res => {
            console.log('登录之后的响应为：',res.data);
            // 登录成功后，将用户信息保存到本地存储
            // localStorage.setItem('user', JSON.stringify(res.data));
            // 登录成功后，将用户信息保存到本地存储
            localStorage.setItem('user', JSON.stringify({
              userId: res.data.id, // 用户id —— 用于后续表的关联
              username: res.data.username,
              ...res.data // 其它用户信息
            }));

            // 提示用户登录成功
            this.$message.success('登录成功');
            // 清空表单数据
            this.loginData.email = '';
            this.loginData.password = '';
            // 跳转到首页
            this.$router.push('/index');
          }).catch(error => {
            // 处理登录失败的情况
            console.error('Login error:', error);
            // 提示用户登录失败，可以根据实际情况自定义消息内容
            this.$message.error('登录失败: 用户名或密码错误');
          });

        } else {
          // 表单验证失败
          console.log('login failed');
          this.$message.error('登录失败: 表单验证不通过');
          return false;
        }
      });
    },
  },
};
</script>


<style scoped>
.login-wrapper {
  max-width: 400px;
  margin: 50px auto;
  padding: 25px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.login-form {
  margin-top: 20px;
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  color: #303133;
  font-weight: bold;
}

.form-actions {
  margin-top: 20px;
}

.form-register-link {
  margin-top: 15px;
  text-align: center;
}

/* 可以根据需要进一步美化 */
</style>
