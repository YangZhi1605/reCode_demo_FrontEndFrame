<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>模型管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="24">
        <!--    表格用户维护模型信息,表头根据模型名称来搜索过滤-->
        <el-table
          :data="getPagedTableData.filter(data => !search || data.ModelName.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%">
          <el-table-column
            label="模型创建时间"
            prop="CreateTime">
            <template slot-scope="scope">
              <span>{{ formatDate(scope.row.CreateTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="模型名称"
            prop="ModelName">
          </el-table-column>
          <el-table-column
            label="模型创建者"
            prop="CreateUser">
          </el-table-column>
          <el-table-column
            label="模型精准度"
            prop="ModelScore">
          </el-table-column>
          <el-table-column
            label="是否启用"
            prop="IsUse">
            <template slot-scope="scope">
              <span v-if="scope.row.IsUse">启用</span>
              <span v-else>未启用</span>
            </template>
          </el-table-column>
          <el-table-column
            align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入模型名称搜索"/>
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10,20,30,40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listData.length">
        </el-pagination>
      </el-col>
    </el-row>

    <el-row style="margin-top: 30px">
      <!--        上传训练数据，可以是excel，可以是csv-->
      <el-col :span="6">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :onSuccess="handleSuccess"
          :on-error="handleError"
          :before-upload="beforeUpload">
          <el-button size="medium " type="primary" >点击上传训练数据</el-button>
          <div slot="tip" class="el-upload__tip">只能上传.xls或.xlsx文件</div>
        </el-upload>
      </el-col>

<!--      模型训练按钮-->
      <el-col :span="6">
        <el-button size="medium " type="success" @click="train_model">模型训练</el-button>
        <div class="el-upload__tip">将会占据大量服务器资源~</div>
      </el-col>

      <!--      模型预测测试按钮-->
<!--      <el-col :span="6">-->
<!--        <el-button size="medium " type="success" @click="train_test">模型测试</el-button>-->
<!--        <div class="el-upload__tip">将会占据大量服务器资源~</div>-->
<!--      </el-col>-->

      <!--    上传.pkl的模型文件-->
      <el-col :span="6">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :onSuccess="handleSuccess"
          :on-error="handleError"
          :before-upload="beforeUpload">
          <el-button size="medium" type="danger">系统模型更换</el-button>
          <div slot="tip" class="el-upload__tip">只能上传.pkl文件</div>
        </el-upload>
      </el-col>
    </el-row>


    <!-- 编辑界面 -->
    <el-dialog title="编辑" :visible.sync="editFormVisible" width="45%" @click="closeDialog">
      <el-form label-width="120px" :model="EditForm" :rules="rules_edit" ref="editForm">
        <el-form-item label="模型名称" prop="ModelName">
          <!--输入框中默认填充了当前行的数据，因为我下面给了赋值操作。这里和prop关系不大-->
          <el-input size="small" v-model="EditForm.ModelName" auto-complete="off" placeholder="请输入模型名称"></el-input>
        </el-form-item>
        <el-form-item label="模型创建者" prop="CreateUser">
          <el-input size="small" v-model="EditForm.CreateUser" auto-complete="off" placeholder="请输入模型创建者"></el-input>
        </el-form-item>
        <el-form-item label="模型相关时间" prop="">
          <el-date-picker
            v-model="EditForm.CreateTime"
            type="datetime"
            placeholder="选择时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="模型本地存储路径" prop="ModelPath">
          <el-input size="small" v-model="EditForm.ModelPath" auto-complete="off" placeholder="请输入模型本地存储路径"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="IsUse">
          <el-switch
            v-model="EditForm.IsUse"
            active-text="启用"
            inactive-text="未启用"
            active-value="1"
            inactive-value="0">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <!--        传入当前修改行的ID和修改后的内容对象回去给后端-->
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm_edit">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》 ';

import Pagination from "../../components/Pagination.vue";

export default {
  name: 'MachineLearnSys',
  // import 引入的组件需要注入到对象中才能使用
  components: {Pagination},
  props: {},
  data() {
    // 这里存放数据
    return {
      listData: [],
      search: '',
      name_val:'',
      editFormVisible: false,//编辑界面是否显示
      EditForm:{
        ID:'',
        CreateTime:'',
        ModelName:'',
        CreateUser:'',
        ModelPath:'',
        IsUse:'',
      },//编辑界面的数据
      rules_edit:{},
      loading:false,//是显示加载
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示条数

    }
  },
  computed: {
    // 计算当前页显示的数据
    /*
    * 这里的 getPagedTableData 是一个计算属性，
    * 它会根据当前页 currentPage 和每页大小 pageSize 来
    * 动态计算当前页所要显示的表格数据切片。
    * 当页码或每页条数发生变化时，el-pagination 组件将会
    * 触发 handleSizeChange 或 handleCurrentChange 方法，
    * 并且你可以在这些方法中处理页码变化*/
    getPagedTableData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.listData.slice(start, end);
    },

  },
  methods: {
    //测试模型的预测代码能否正常运行
    train_test(){
      console.log('开始测试模型');
      this.$axios.get('http://127.0.0.1:5000/api/load_model_KNN').then(res => {
        console.log(res.data);
        //重新获取数据
        this.fetchAllMachineInfo();
        // 提示训练成功
        this.$message({
          message: '测试成功',
          type: 'success'
        });
      }).catch(err => {
        console.log(err)
      })
    },

    //点击训练模型按钮后的操作,
    train_model(){
      console.log('开始训练模型');
      this.$axios.get('http://127.0.0.1:5000/api/train_model_SVM').then(res => {
        console.log(res.data);
        //重新获取数据
        this.fetchAllMachineInfo();
        // 提示训练成功
        this.$message({
          message: '训练成功',
          type: 'success'
        });
      }).catch(err => {
        console.log(err)
      })
    },
    //点击编辑后的操作
    handleEdit(index, row) {
      console.log(index, row);
      //显示编辑界面
      this.editFormVisible = true;
      //将当前行的数据赋值给编辑界面的数据
      this.EditForm = { ...row }
    },
    //点击删除后的操作
    handleDelete(index, row) {
      console.log(index, row);
      //向后端发送axios的get请求，根据id删除数据
      this.$axios.get('http://127.0.0.1:5000/api/delete_machine', {
        params: {
          id: row.ID
        }
      }).then(res => {
        console.log(res.data)
        this.fetchAllMachineInfo();//重新获取数据
        // 提示删除成功
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      }).catch(err => {
        console.log(err)
      })
    },

    //向后端发送axios的get请求获得所有数据的方法
    fetchAllMachineInfo(){
      this.loading = true;
      this.$axios.get('http://127.0.0.1:5000/api/get_all_machine').then(res => {
        console.log(res.data);
        //获取数据成功的消息提示
        this.$message({
          message: '获取数据成功',
          type: 'success'
        });
        this.listData = res.data;
        this.loading = false;
      }).catch(err => {
        console.log(err)
      })
    },
    //格式化时间，将时间戳转换为年月日时分秒
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      // 根据需要调整locale，这里使用'zh-CN'表示中国大陆地区
      const formattedDate = new Intl.DateTimeFormat('zh-CN', options).format(date).replace(/\//g, '-');
      // Replace the commas added by Intl in some locales such as 'en-US'
      return formattedDate.replace(',', '');
    },

    // 关闭编辑、增加弹出框
    closeDialog() {
      this.editFormVisible = false;
      this.$refs.editForm.resetFields(); // 重置表单状态
    },
    // 提交编辑、增加表单
    submitForm_edit(){
      console.log(this.EditForm);
      //验证表单是否有效
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          //发送axios请求
          this.$axios.post('http://127.0.0.1:5000/api/update_machine', {
            id: this.EditForm.ID, // 假设EditForm对象中包含ID
            new_data: {...this.EditForm} // 使用新对象包含EditForm的所有数据
          }).then(res => {
            console.log(res.data)
            this.editFormVisible = false;//关闭编辑界面
            this.fetchAllMachineInfo();//重新获取数据
            this.$refs.editForm.resetFields(); // 重置表单状态
            // 提示修改成功
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          }).catch(err => {
            console.log(err)
          })
        } else {
          return false;
          // 提示表单验证失败
          this.$message({
            message: '表单验证失败',
            type: 'error'
          });
        }
      });
    },

    //分页功能
    //挂载在size-change事件上，当pageSize改变时候，改变每一页显示条目个数
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.currentPage = 1; // 更改每页大小时重置当前页码到第一页
    },
    //挂载在current-change事件上，当currentPage改变时候，改变当前页码
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      // 当当前页码变化时，可能需要重新加载数据
    },


    // 上传前的操作
    beforeUpload(file) {
      console.log(file);
    },
    // 上传成功的操作
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList);
    },
    // 上传失败的操作
    handleError(err, file, fileList) {
      console.log(err, file, fileList);
    },
    // 预览的操作
    handlePreview(file) {
      console.log(file);
    },
    // 移除的操作
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
  },
  // 生命周期 - 创建完成（可以访问当前this 实例）
  created() {
    // 调用方法
    this.fetchAllMachineInfo();
  },
}
</script>

<style scoped>
</style>
