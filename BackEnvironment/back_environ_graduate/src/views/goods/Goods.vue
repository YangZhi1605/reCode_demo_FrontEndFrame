/**
 * 基础菜单 商品管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="searchVal" placeholder="输入零件或者公司名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="getPagedTableData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column align="center" type="index" label="序号" width="50">
      </el-table-column>
      <el-table-column sortable prop="name" label="零件名称" width="150">
      </el-table-column>
      <el-table-column sortable prop="price" label="零件价格" width="150">
        <template slot-scope="scope">
          <div>{{scope.row.price}}￥</div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="desc" label="零件描述" width="300">
      </el-table-column>
      <el-table-column sortable prop="img" label="零件图片路径" width="300">
      </el-table-column>
      <el-table-column sortable prop="number" label="零件库存" width="90">
      </el-table-column>
      <el-table-column sortable prop="productCompany" label="零件购买公司" width="300">
      </el-table-column>
      <el-table-column sortable prop="editTime" label="编辑时间" width="300">
        <template slot-scope="scope">
          <div>{{scope.row.editTime|timestampToTime}}</div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="editUser" label="修改人" width="80">
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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


    <!-- 编辑以及添加界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="50%" @click="closeDialog">
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="零件名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入零件名称"></el-input>
        </el-form-item>
        <el-form-item label="零件价格" prop="price">
          <el-input size="small" v-model="editForm.price" auto-complete="off" placeholder="请输入零件价格"></el-input>
        </el-form-item>
        <el-form-item label="零件描述" prop="desc">
          <el-input size="small" v-model="editForm.desc" auto-complete="off" placeholder="请输入零件描述"></el-input>
        </el-form-item>
        <el-form-item label="零件图片路径" prop="img">
          <el-input size="small" v-model="editForm.img" auto-complete="off" placeholder="请输入零件图片路径"></el-input>
        </el-form-item>
        <el-form-item label="零件库存" prop="number">
          <el-input size="small" v-model="editForm.number" auto-complete="off" placeholder="请输入零件库存"></el-input>
        </el-form-item>
        <el-form-item label="零件购买公司" prop="productCompany">
          <el-input size="small" v-model="editForm.productCompany" auto-complete="off" placeholder="请输入零件购买公司"></el-input>
        </el-form-item>
        <el-form-item label="编辑时间" prop="editTime">
          <el-date-picker
            v-model="editForm.editTime"
            type="datetime"
            placeholder="选择时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="处理者" prop="editUser">
          <el-input size="small" v-model="editForm.editUser" auto-complete="off" placeholder="请输入修改者"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deptList, deptSave, deptDelete } from '../../api/userMG'
import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      searchVal:'',
      title: '添加',
      editForm: {
        id:'',
        name: '',
        desc: '',
        price: '',
        img:'',
        number:'',
        productCompany:'',
        editTime:'',
        editUser:''
      },
      // rules表单验证
      rules: {
        name: [
          { required: true, message: '请输入零件名称', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入零件描述', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入零件价格', trigger: 'blur' }
        ],
        img: [
          { required: true, message: '请输入零件图片路径', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入零件库存', trigger: 'blur' }
        ],
        productCompany: [
          { required: true, message: '请输入零件购买公司', trigger: 'blur' }
        ],
        editTime: [
          { required: true, message: '请输入编辑时间', trigger: 'blur' }
        ],
        editUser: [
          { required: true, message: '请输入处理者姓名', trigger: 'blur' }
        ]

      },
      formInline: {
        page: 1,
        limit: 10,
        varLable: '',
        varName: '',
        token: localStorage.getItem('logintoken')
      },
      userparm: [], //搜索权限
      listData: [], //汽车零件数据
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      },
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示条数
    }
  },
  // 注册组件
  components: {
    Pagination
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

  /**
   * 创建完毕
   */
  created() {
    // this.getdata(this.formInline)
    this.fetchAllDetailInfo();
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {

    //处理删除
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 向后端发送请求，删除数据
        this.$axios.get('http://127.0.0.1:5000/api/delete_node_store', {
          params: {
            id: row.id
          }
        }).then(res => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.fetchAllDetailInfo();
          } else {
            this.$message({
              type: 'info',
              message: res.data.message
            });
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
      },
    //通过axios向后端发送get请求，获取数据，填充到表格中
    fetchAllDetailInfo(){
      this.$axios.get('http://127.0.0.1:5000/api/get_all_node_store').then(res => {
        this.listData = res.data;
        console.log('当前获取的数据是',res.data);
      }).catch(err => {
        console.log(err)
      })
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

    // 搜索事件
    search() {
      console.log('搜索内容是', this.searchVal);
      //向后端发送你post请求，获取数据
      this.$axios.post('http://127.0.0.1:5000/api/search_node_store', {
        params: {
          searchVal: this.searchVal
        }
      }).then(res => {
        this.listData = res.data;
        console.log('当前获取的数据是',res.data);
        //置空搜索框
        this.searchVal = '';
      }).catch(err => {
        console.log(err)
      })
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true
      if (row != undefined && row != 'undefined') {
        this.title = '修改'
        this.editForm.id = row.id
        this.editForm.name = row.name
        this.editForm.price = row.price
        this.editForm.desc = row.desc
        this.editForm.img = row.img
        this.editForm.number = row.number
        this.editForm.productCompany = row.productCompany
        this.editForm.editTime = row.editTime
        this.editForm.editUser = row.editUser

      } else {
        this.title = '添加'
        this.editForm.name = ''
        this.editForm.price = ''
        this.editForm.desc = ''
        this.editForm.img = ''
        this.editForm.number = ''
        this.editForm.productCompany = ''
        this.editForm.editTime = ''
        this.editForm.editUser = ''

      }
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          console.log('editForm:', this.editForm);

          // 定义URL
          let url = '';
          if (this.title === '添加') {
            url = 'http://127.0.0.1:5000/api/add_node_store';
          } else if (this.title === '修改') {
            url = 'http://127.0.0.1:5000/api/update_node_store'; // 修改为你的修改接口
          }

          //向后端发送post请求，保存数据
          this.$axios.post(url, this.editForm).then(res => {
            console.log('获取的结果是', res);
            if (res.data.success) {
              this.$message({
                type: 'success',
                message: '保存成功!'
              });
              this.editFormVisible = false;
              this.fetchAllDetailInfo();
            } else {
              this.$message({
                type: 'info',
                message: res.data.message
              });
            }
          }).catch(err => {
            this.loading = false;
            // this.$message.error('保存失败，请稍后再试！');
          });
        } else {
          return false;
        }
      });
    },
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.editFormVisible = false
    }
  }
}
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>


