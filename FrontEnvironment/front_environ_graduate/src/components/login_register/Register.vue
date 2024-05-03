<template>
  <div>
    <!-- 注册表单 -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="register-form">
      <h3 class="register-title">用户注册</h3>
      <el-form-item label="用户名" prop="username" class="el-form-item">
        <el-input v-model="ruleForm.username" autocomplete="off" class="el-input"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone" class="el-form-item">
        <el-input v-model="ruleForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex" class="el-form-item">
        <el-radio-group v-model="ruleForm.sex" class="el-radio-group">
          <el-radio label="男" class="el-radio">男</el-radio>
          <el-radio label="女" class="el-radio">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" class="el-form-item">
        <el-input v-model="ruleForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" class="el-form-item">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword" class="el-form-item">
        <el-input type="password" v-model="ruleForm.confirmPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="汽车名称" prop="carName" class="el-form-item">
        <el-input v-model="ruleForm.carName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="button-group">
        <el-button type="primary" size="medium" @click="submitForm('ruleForm')" class="el-button">注册</el-button>
        <el-button type="warning" size="medium" @click="resetForm('ruleForm')" class="el-button">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      ruleForm: {
        username: '',
        phone: '',
        sex: '',
        email: '',
        password: '',
        confirmPassword: '',
        carName: ''
      },
      rules: {
        // 增加用户名、电话、性别、邮箱、汽车名称的验证规则
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入电话号码', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码不能少于6位', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { min: 6, message: '密码不能少于6位', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.ruleForm.password) {
                callback(new Error('两次输入的密码不一致'));
              } else {
                callback();
              }
            }, trigger: 'blur'
          }
        ],
        // 可以根据需要添加汽车名称的规则
        carName: [{ required: true, message: '请输入汽车名称', trigger: 'blur' }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //向后端发送axios的post请求，将用户注册信息传递给后端
          console.log('表单验证成功');
          console.log('当前注册的内容',this.ruleForm);
         this.$axios.post('http://127.0.0.1:5000/api/register_front_user', this.ruleForm).then(res => {
            console.log(res);
           this.$message({
             message: '注册成功',
             type: 'success'
           });
           //跳转到登录页面
           this.onRegisterSuccess();
          }).catch(err => {
            console.error(err);
            this.$message.error('注册失败');
          });
        } else {
          console.log('表单验证失败');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onRegisterSuccess() {
      // 注册成功后的处理逻辑，例如调用API等
      // 成功后重定向到登录页面
      this.$router.replace('/login');
    }
  },
};
</script>

<style scoped>
.register-title {
  text-align: center;
  margin-bottom: 30px;
  color: #303133;
  font-weight: bold;
}

/* 添加样式美化表单 */
.register-form {
  max-width: 500px;
  margin: 50px auto;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
}

.el-form-item {
  margin-bottom: 24px;
}

.el-input {
  border-radius: 4px;
}

.el-radio-group {
  line-height: 40px;
}

.el-radio {
  margin-right: 20px;
}

.button-group {
  //按钮组居中
  text-align: center;
  display: flex;
  justify-content: space-between; /* 或者使用 'flex-start' 来使按钮左对齐 */
}

.el-button {
  margin: 0;
  flex-grow: 1; /* 使按钮能够填充容器 */
}

/* 调整左边按钮的右边距，使按钮之间有间隙 */
.el-button:first-child {
  margin-right: 40px; /* 您可以根据需要调整这个值 */
}

</style>
