<template>
  <div>
    <h2 class="my-head-style-edit">数据Editor</h2>
    <el-row>
      <el-col :span="12">
        <!-- 在12的栅格中，编辑表单 -->
        <el-form @submit.prevent="submitForm">
          <!-- 表单字段，使用v-model绑定editData的属性 -->
<!--          第一行给序列号,让序列号是禁止修改-->

          <el-row>
            <el-col :span="4">
              <el-form-item label="序列号">
                <el-input v-model="editData.ID" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
<!--      第二行给Node ID  和Node Name，第三行给User ID  和 Collect time-->
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="Node ID">
                <el-input v-model="editData.DeviceNodeID"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Node Name">
                <el-input v-model="editData.DeviceName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="User ID">
                <el-input v-model="editData.UserID"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Collect Time">
                <el-input v-model="editData.CollectTime"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

<!--下面是电压信息,也是拿栅格来切割-->
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="第①路输入">
                <el-input v-model="editData.Voltage1"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="第①路输出">
                <el-input v-model="editData.Voltage2"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="第②路输入">
                <el-input v-model="editData.Voltage3"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="第②路输出">
                <el-input v-model="editData.Voltage4"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="第③路输入">
                <el-input v-model="editData.Voltage5"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="第③路输出">
                <el-input v-model="editData.Voltage6"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="第④路输入">
                <el-input v-model="editData.Voltage7"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="第④路输出">
                <el-input v-model="editData.Voltage8"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="第⑤路输入">
                <el-input v-model="editData.Voltage9"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="第⑤路输出">
                <el-input v-model="editData.Voltage10"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="第⑥路输入">
                <el-input v-model="editData.Voltage11"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="第⑥路输出">
                <el-input v-model="editData.Voltage12"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="第⑦路输入">
                <el-input v-model="editData.Voltage13"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="第⑦路输出">
                <el-input v-model="editData.Voltage14"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="第⑧路输入">
                <el-input v-model="editData.Voltage15"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="第⑧路输出">
                <el-input v-model="editData.Voltage16"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
<!--          将当前行信息的ID传入事件函数，通过axios请求，发送给后端-->
          <el-button type="success" @click="submitForm(editData.ID)">提交</el-button>
        </el-form>
      </el-col>
    </el-row>
<!--    回退和前进按钮-->
    <el-row style="margin-top: 50px">
      <el-button @click="toleftDataUpload" icon="el-icon-d-arrow-left" title="回到数据上传页面" circle></el-button>
      <el-button @click="rorightDataShow" icon="el-icon-d-arrow-right" title="去到数据可视化页面" circle></el-button>
    </el-row>

  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》 ';
export default {
  name: 'Workbench3',
  // import 引入的组件需要注入到对象中才能使用
  components: {
  },
  props: {},
  data() {
    return {
      //这里的 editData 在组件创建时从路由参数 (this.$route.params.editData) 获取
      editData: {},
      //标记是否提交过数据
      isSubmit: false,
      //回到数据上传页面，重新请求原本展示的数据,回到那个页面之后，需要重复赋值给tableData
      update_data:[],
    };
  },
  methods: {
    //提交表单
    submitForm(Row_id) {
      // 在这里调用后端接口更新数据
      // 例如：axios.post('/api/edit-device', this.editData) ...
      console.log(this.editData);
      console.log(Row_id);
      //向后端发送axios请求，根据指定的id，将数据传入，修改为指定的数据
      this.$axios.post('http://127.0.0.1:5000/api/edit_info', {
        Row_id: Row_id,
        editData: this.editData
      }).then(res => {
        console.log(res);
        //修改成功后，标记为已经提交过数据，待会要再次请求后端，拿到更新后的数据
        this.isSubmit = true;
        //成功后，弹出成功的消息提示
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      }).catch(err => {
        //失败后，弹出失败的消息提示
        this.$message({
          message: '修改失败',
          type: 'error'
        });
        console.log(err);
      });

    },
    //回到上传数据的页面
    toleftDataUpload(){
      //前往上一级页面'/wrben/wrben1'，且携带参数isSubmit
      this.$router.push({path:'/wrben/wrben1',query:{isSubmit:this.isSubmit}});
    },
    //去到数据展示的页面
    rorightDataShow(){
      //前往下一级页面——这里放置一个前进按钮
      this.$router.push('/wrben/wrben2');
    },
  },
  // 生命周期 - 创建完成（可以访问当前this 实例）
  created() {
    //在组件创建时候，如果是点击编辑带着数据过来的，就把数据拿到并初始化editData
    if (this.$route.query.editData) {
      // 把JSON字符串转换回对象
      this.editData = JSON.parse(this.$route.query.editData);
    }
  },
}
</script>

<style scoped>
.my-head-style-edit{
  font-size: 28px;
  margin: 0;
  line-height: 48px;
  color: #555;
}

</style>
