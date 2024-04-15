<template>
  <div>
    <h2 class="my-head-style-edit">检修日志-log</h2>
    <!-- 搜索筛选 -->
    <el-form :inline="true"  class="user-search" style="margin-top: 35px">
      <!--   定义表头的两种搜索方式   -->
      <el-form-item label="搜索：">
        <el-input size="medium" v-model="searchVal" placeholder="输入监测建议或处理状态"></el-input>
      </el-form-item>
      <!--      定义表头的搜索和添加按钮-->
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search_my">搜索</el-button>
      </el-form-item>
    </el-form>

    <!--列表-->
    <el-table
      :data="listData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      highlight-current-row>
      <el-table-column
        label="日期"
        width="260">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.MaintenanceDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="MaintenanceUser"
        label="处理者">
      </el-table-column>
      <el-table-column
        prop="MaintenanceRport"
        label="检测建议">
      </el-table-column>
      <el-table-column
        prop="MaintenanceTage"
        label="处理状态">
      </el-table-column>
      <el-table-column label="操作">
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
<!--    分页组件-->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>

<!--    显示编辑窗口-->
    <!-- 编辑界面 -->
    <el-dialog title="编辑" :visible.sync="editFormVisible" width="60%" @click="closeDialog">
      <el-form label-width="200px" :model="EditForm" :rules="rules_edit" ref="editForm">

        <el-form-item label="编辑时间" prop="">
          <el-date-picker
            v-model="EditForm.MaintenanceDate"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="处理者" prop="MaintenanceUser">
          <el-input size="small" v-model="EditForm.MaintenanceUser" auto-complete="off" placeholder="处理者"></el-input>
        </el-form-item>
        <el-form-item label="检测建议" prop="MaintenanceRport">
          <el-input size="small" v-model="EditForm.MaintenanceRport" auto-complete="off" placeholder="检测建议"></el-input>
        </el-form-item>
        <el-form-item label="处理状态" prop="MaintenanceTage">
          <el-input size="small" v-model="EditForm.MaintenanceTage" auto-complete="off" placeholder="处理状态"></el-input>
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
import Pagination from '../component_repository/Pagination.vue';
export default {
  name: 'Message',
  // import 引入的组件需要注入到对象中才能使用
  components: {
    Pagination
  },
  props: {},
  data() {
    // 这里存放数据
    return {
      loading:false,//显示是否加载
      tableData: [],//原始的数据加载列表
      listData:[],//分页展示的数据
      searchVal:'',//搜索框的值
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      },
      formInline: {
        page: 1,
        limit: 10,
        RuleName: '',
        EditUser: '',
        token: localStorage.getItem('logintoken')
      },
      editFormVisible:false,//控制编辑窗口的显示与隐藏
      EditForm:{
        DeviceNodeID:'',
        MaintenanceDate:'',
        MaintenanceUser:'',
        MaintenanceRport:'',
        MaintenanceTage:'',
      },//编辑表单信息
      rules_edit:{},//验证规则
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      //显示编辑窗口
      this.editFormVisible = true;
      // 在获取的数据中转换日期字符串为日期对象
      // this.EditForm.MaintenanceDate = new Date(this.EditForm.MaintenanceDate.replace(' ', 'T'));
      //将当前行的数据赋值给EditForm
      this.EditForm = {...row};
    },

    //删除维修信息的函数
    handleDelete(index, row) {
      console.log(index, row);
      //获取当前对象中的DeviceNodeID,通过axios发送get请求，实现通过id删除
      //弹窗询问是否确认删除，确认删除再发送axios请求
      this.$confirm('是否确认删除该行？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //发送axios请求，将当前行的ID回去给后端
        this.$axios.get('http://127.0.0.1:5000/api/delete_info',{
          params:{
            id:row.DeviceNodeID
          }
        }).then(response => {
            console.log('删除成功：',response.data);
            //重新获取所有数据
            this.getAllData();
            //提示信息
            this.$message({
              type: 'success',
              message: '删除成功！'
            });
          })
          .catch(error => {
            console.log('删除失败：',error);
            //提示信息
            this.$message({
              type: 'error',
              message: '删除失败！'
            });
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
      },

    //根据MaintenanceTage的值，设置行的样式
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage
      this.formInline.limit = parm.pageSize
      this.getAllData()
    },

    //搜索框的搜索函数
    search_my(){
      console.log('搜索框的值为：',this.searchVal);
      //发送axios请求，将搜索框的值传递给后端
      this.$axios.get('http://127.0.0.1:5000/api/search_info',{
        params:{
          searchVal:this.searchVal
        }
      }).then(response => {
          console.log('搜索成功：',response.data);
          //将搜索到的数据赋值给listData进行分页展示
          this.listData = response.data;
          //分页赋值
          this.pageparm.currentPage = this.formInline.page
          this.pageparm.pageSize = this.formInline.limit
          //总共的长度，调用length去计算
          this.pageparm.total = this.listData.length
          //重置搜索框
          this.searchVal = '';
        })
        .catch(error => {
          console.log('搜索失败：',error);
        });

    },
    //获取所有数据的函数
    getAllData(){
      console.log('获取所有数据的函数');
    //   想后端接口发送axios的get请求获取数据
      this.$axios.get('http://127.0.0.1:5000/api/get_all')
        .then(response => {
          console.log('获取到的数据为：',response.data);
          //将数据赋值给data中的listData进行分页展示
          this.listData = response.data;
          //分页赋值
          this.pageparm.currentPage = this.formInline.page
          this.pageparm.pageSize = this.formInline.limit
          //总共的长度，调用length去计算
          this.pageparm.total = this.listData.length
        })
        .catch(error => {
          console.log('请求失败：',error);
        });
    },

    // 关闭编辑、增加弹出框
    closeDialog() {
      this.editFormVisible = false;
      this.$refs.editForm.resetFields(); // 重置表单状态
    },

    // 提交编辑、增加表单
    submitForm_edit(){
      console.log('提交编辑、增加表单');
      //验证表单数据是否有效
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          //发送axios请求，将当前修改行的ID和修改后的内容对象回去给后端
          console.log('当前修改行的ID和修改后的内容对象为：',this.EditForm);
          console.log('当前修改行的ID为：',this.EditForm.DeviceNodeID);
          //发送axios请求,将当前修改行的ID和修改后的内容对象回去给后端
          this.$axios.post('http://127.0.0.1:5000/api/update_info',{
            id:this.EditForm.DeviceNodeID,
            new_data:{...this.EditForm},
          }).then(response => {
              console.log('提交成功：',response.data);
              //关闭编辑窗口
              this.editFormVisible = false;
              //重新获取所有数据
              this.getAllData();
              //提示信息
              this.$message({
                type: 'success',
                message: '提交成功！'
              });
            })
            .catch(error => {
              console.log('提交失败：',error);
              //提示信息
              this.$message({
                type: 'error',
                message: '提交失败！'
              });
            });
        } else {
          return false;
        }
      });
    },


  },
  // 生命周期 - 创建完成（可以访问当前this 实例）
  created() {
    // 调用获取所有数据的函数
    this.getAllData();
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
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
