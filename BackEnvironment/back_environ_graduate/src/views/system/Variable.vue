/**
 * 系统管理  系统环境变量
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统环境_电路权重管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true"  class="user-search">
<!--   定义表头的两种搜索方式   -->
      <el-form-item label="搜索：">
        <el-input size="medium" v-model="searchVal" placeholder="输入权限规则或者修改者名称"></el-input>
      </el-form-item>
<!--      定义表头的搜索和添加按钮-->
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search_my">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleAdd">添加</el-button>
      </el-form-item>
    </el-form>

    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
<!--      通过prop绑定的值-->
      <el-table-column sortable prop="RuleName" label="规则名称" width="200">
      </el-table-column>
<!--      在Element UI的表单验证规则中，
          当你指定字段的类型为number时，表单验证器期望该字段的值为数字类型。
          然而，当你使用v-model和el-input时，
          即使你在输入框中输入数字，实际上绑定到数据模型的值仍然是字符串。-->
      <el-table-column sortable prop="Circuit1" label="电路1权重" width="100">
      </el-table-column>
      <el-table-column sortable prop="Circuit2" label="电路2权重" width="100">
      </el-table-column>
      <el-table-column sortable prop="Circuit3" label="电路3权重" width="100">
      </el-table-column>
      <el-table-column sortable prop="Circuit4" label="电路4权重" width="100">
      </el-table-column>
      <el-table-column sortable prop="Circuit5" label="电路5权重" width="100">
      </el-table-column>
      <el-table-column sortable prop="Circuit6" label="电路6权重" width="100">
      </el-table-column>
      <el-table-column sortable prop="Circuit7" label="电路7权重" width="100">
      </el-table-column>
      <el-table-column sortable prop="Circuit1" label="电路8权重" width="100">
      </el-table-column>

      <el-table-column sortable prop="EditTime" label="修改时间" width="200">
      </el-table-column>

      <el-table-column sortable prop="EditUser" label="修改者" width="200">
      </el-table-column>
      <el-table-column sortable prop="IsSet" label="启用标记" width="80">
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteInfo(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
<!--    写一个刷新按钮，绑定事件，去请求后端数据-->
    <el-button size="mini" type="" icon="el-icon-refresh" @click="getdata(formInline)"></el-button>



    <!-- 编辑界面 -->
    <el-dialog title="修改" :visible.sync="editFormVisible" width="30%" @click="closeDialog">
      <el-form label-width="120px" :model="EditForm" :rules="rules_edit" ref="editForm">
        <el-form-item label="名称" prop="">
<!--输入框中默认填充了当前行的数据，因为我下面给了赋值操作。这里和prop关系不大-->
          <el-input size="small" v-model="EditForm.RuleName" auto-complete="off" placeholder="规则名称"></el-input>
        </el-form-item>
        <el-form-item label="1路权重" prop="Circuit1">
          <el-input-number size="small" v-model="EditForm.Circuit1" auto-complete="off" placeholder="1路权重"></el-input-number>
        </el-form-item>
        <el-form-item label="2路权重" prop="Circuit2">
          <el-input-number size="small" v-model="EditForm.Circuit2" auto-complete="off" placeholder="2路权重"></el-input-number>
        </el-form-item>
        <el-form-item label="3路权重" prop="Circuit3">
          <el-input-number size="small" v-model="EditForm.Circuit3" auto-complete="off" placeholder="3路权重"></el-input-number>
        </el-form-item>
        <el-form-item label="4路权重" prop="Circuit4">
          <el-input-number size="small" v-model="EditForm.Circuit4" auto-complete="off" placeholder="4路权重"></el-input-number>
        </el-form-item>
        <el-form-item label="6路权重" prop="Circuit5">
          <el-input-number size="small" v-model="EditForm.Circuit5" auto-complete="off" placeholder="5路权重"></el-input-number>
        </el-form-item>
        <el-form-item label="6路权重" prop="Circuit6">
          <el-input-number size="small" v-model="EditForm.Circuit6" auto-complete="off" placeholder="6路权重"></el-input-number>
        </el-form-item>
        <el-form-item label="7路权重" prop="Circuit7">
          <el-input-number size="small" v-model="EditForm.Circuit7" auto-complete="off" placeholder="7路权重"></el-input-number>
        </el-form-item>
        <el-form-item label="8路权重" prop="Circuit8">
          <el-input-number size="small" v-model="EditForm.Circuit8" auto-complete="off" placeholder="8路权重"></el-input-number>
        </el-form-item>
        <el-form-item label="是否启用" prop="IsSet">
          <el-switch
            v-model="EditForm.IsSet"
            active-text="启用"
            inactive-text="禁用"
            active-value="1"
            inactive-value="0">
          </el-switch>
        </el-form-item>
        <el-form-item label="修改者" prop="EditTime">
          <el-input size="small" v-model="EditForm.EditUser" auto-complete="off" placeholder="修改者"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
<!--        传入当前修改行的ID和修改后的内容对象回去给后端-->
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm_edit">保存</el-button>
      </div>
    </el-dialog>

<!--    添加界面，模仿编辑界面，但是不会默认读取数值-->
    <el-dialog title="添加"  :visible.sync="addFormVisible" width="40%"  @click="closeDialog">
      <el-form label-width="120px" :model="AddForm" :rules="rules_add" ref="editForm">
        <el-form-item label="名称" prop="">
          <!--输入框中默认填充了当前行的数据，因为我下面给了赋值操作。这里和prop关系不大-->
          <el-input size="small" v-model="AddForm.RuleName" auto-complete="off" placeholder="请输入规则名称"></el-input>
        </el-form-item>
        <el-form-item label="1路权重" prop="">
<!--          注意v-model绑定的是字符串，后面获取之后，要转成数字-->
          <el-input size="small" v-model="AddForm.Circuit1" auto-complete="off" placeholder="请输入1路权重"></el-input>
        </el-form-item>
        <el-form-item label="2路权重" prop="">
          <el-input size="small" v-model="AddForm.Circuit2" auto-complete="off" placeholder="请输入2路权重"></el-input>
        </el-form-item>
        <el-form-item label="3路权重" prop="">
          <el-input size="small" v-model="AddForm.Circuit3" auto-complete="off" placeholder="请输入3路权重"></el-input>
        </el-form-item>
        <el-form-item label="4路权重" prop="">
          <el-input size="small" v-model="AddForm.Circuit4" auto-complete="off" placeholder="请输入4路权重"></el-input>
        </el-form-item>
        <el-form-item label="5路权重" prop="">
          <el-input size="small" v-model="AddForm.Circuit5" auto-complete="off" placeholder="请输入5路权重"></el-input>
        </el-form-item>
        <el-form-item label="6路权重" prop="">
          <el-input size="small" v-model="AddForm.Circuit6" auto-complete="off" placeholder="请输入6路权重"></el-input>
        </el-form-item>
        <el-form-item label="7路权重" prop="">
          <el-input size="small" v-model="AddForm.Circuit7" auto-complete="off" placeholder="请输入7路权重"></el-input>
        </el-form-item>
        <el-form-item label="8路权重" prop="">
          <el-input size="small" v-model="AddForm.Circuit8" auto-complete="off" placeholder="请输入8路权重"></el-input>
        </el-form-item>
        <el-form-item label="添加者" prop="">
          <el-input size="small" v-model="AddForm.EditUser" auto-complete="off" placeholder="请输入添加者姓名"></el-input>
        </el-form-item>
<!--        可以输入时间的表单项-->
        <el-form-item label="添加时间" prop="">
          <el-date-picker
            v-model="AddForm.EditTime"
            type="datetime"
            placeholder="选择时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
<!--        直接将这个对象传递给后端，进行添加-->
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm_add">添加</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import { variableList, variableSave, variableDelete } from '../../api/userMG'
import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      addFormVisible: false, //控制添加页面显示与隐藏
      title: '添加',
      EditForm:{
        DataID:'',
        RuleName:'',
        Circuit1:'',
        Circuit2:'',
        Circuit3:'',
        Circuit4:'',
        Circuit5:'',
        Circuit6:'',
        Circuit7:'',
        Circuit8:'',
        IsSet:'',
        EditTime:'',
        EditUser:'',
      },
      // IsSet字段不参与编辑，默认不启动。
      AddForm:{
        RuleName:'',
        Circuit1:'',
        Circuit2:'',
        Circuit3:'',
        Circuit4:'',
        Circuit5:'',
        Circuit6:'',
        Circuit7:'',
        Circuit8:'',
        EditTime:'',
        EditUser:'',
      },
      editForm: {
        varId: '',
        varLable: '',
        varName: '',
        varValue: '',
        token: localStorage.getItem('logintoken')
      },
      // rules表单验证
      rules_edit: {
        RuleName: [
          { required: true, message: '请输入规则名称', trigger: 'blur' }
        ],
        Circuit1: [
          { required: true, message: '请输入1路权重', trigger: 'blur' },
          { type: 'number', message: '1路权重必须为数字值', trigger: 'blur' }
        ],
        Circuit2: [
          { required: true, message: '请输入2路权重', trigger: 'blur' },
          { type: 'number', message: '2路权重必须为数字值', trigger: 'blur' }
        ],
        Circuit3: [
          { required: true, message: '请输入3路权重', trigger: 'blur' },
          { type: 'number', message: '3路权重必须为数字值', trigger: 'blur' }
        ],
        Circuit4: [
          { required: true, message: '请输入4路权重', trigger: 'blur' },
          { type: 'number', message: '4路权重必须为数字值', trigger: 'blur' }
        ],
        Circuit5: [
          { required: true, message: '请输入5路权重', trigger: 'blur' },
          { type: 'number', message: '5路权重必须为数字值', trigger: 'blur' }
        ],
        Circuit6: [
          { required: true, message: '请输入6路权重', trigger: 'blur' },
          { type: 'number', message: '6路权重必须为数字值', trigger: 'blur' }
        ],
        Circuit7: [
          { required: true, message: '请输入7路权重', trigger: 'blur' },
          { type: 'number', message: '7路权重必须为数字值', trigger: 'blur' }
        ],
        Circuit8: [
          { required: true, message: '请输入8路权重', trigger: 'blur' },
          { type: 'number', message: '8路权重必须为数字值', trigger: 'blur' }
        ],
        IsSet: [
          { required: true, message: '请选择是否启用', trigger: 'change' }
        ],
        EditUser: [
          { required: true, message: '请输入修改者名称', trigger: 'blur' }
        ]
      },
      rules_add:{},
      formInline: {
        page: 1,
        limit: 10,
        RuleName: '',
        EditUser: '',
        token: localStorage.getItem('logintoken')
      },
      // 删除
      seletedata: {
        ids: '',
        token: localStorage.getItem('logintoken')
      },
      userparm: [], //搜索权限
      listData: [], //用户数据
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      },
      //输入框的信息
      searchVal:'',
    }
  },
  // 注册组件
  components: {
    Pagination
  },
  /**
   * 数据发生改变
   */

  watch: {},

  /**
   * 创建完毕
   */

  created() {
    this.getdata(this.formInline)
  },

  /**
   * 里面的方法只有被调用才会执行
   */

  methods: {
    // 获取数据方法
    getdata(parameter) {
      this.loading = true
      // 模拟数据的思想可以搞。以后我的项目也把模拟数据和请求数据都放上
      // let res = {
      //   code: 0,
      //   msg: null,
      //   count: 2,
      //   data: [
      //     {
      //       RuleName:'规则1',
      //       Circuit1:0.8,
      //       Circuit2:0.2,
      //       Circuit3:0.3,
      //       Circuit4:0.4,
      //       Circuit5:0.5,
      //       Circuit6:0.6,
      //       Circuit7:0.7,
      //       Circuit8:0.8,
      //       editUser: 'root',
      //       editTime: 1520619747000,
      //       IsSet:1,
      //     },
      //     {
      //       RuleName:'规则2',
      //       Circuit1:0.8,
      //       Circuit2:0.2,
      //       Circuit3:0.3,
      //       Circuit4:0.4,
      //       Circuit5:0.5,
      //       Circuit6:0.6,
      //       Circuit7:0.7,
      //       Circuit8:0.8,
      //       EditUser: '杨枝',
      //       EditTime: 1820619747000,
      //       IsSet:0,
      //     },
      //   ]
      // }
      // this.loading = false
      // this.listData = res.data
      // 分页赋值
      // this.pageparm.currentPage = this.formInline.page
      // this.pageparm.pageSize = this.formInline.limit
      // this.pageparm.total = res.count
      // 模拟数据结束

      //通过axios向后端http://127.0.0.1:5000/api/get_all_circuit_weight发送请求获取数据
      this.$axios.get('http://127.0.0.1:5000/api/get_all_circuit_weight').then(res => {
        console.log(res);
        this.loading = false
        if (res.success == false) {
          this.$message({
            type: 'info',
            message: '获取数据失败'
          })
        } else {
          //获取数据成功后的分页展示
          this.listData = res.data
          // 分页赋值
          this.pageparm.currentPage = this.formInline.page
          this.pageparm.pageSize = this.formInline.limit
          //总共的长度,调用length去计算
          this.pageparm.total = this.listData.length
        }
      }).catch(err => {
        this.loading = false
        this.$message.error('菜单加载失败，请稍后再试！')
      });


      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */
      // variableList(parameter)
      //   .then(res => {
      //     console.log(JSON.stringify(res))
      //     this.loading = false
      //     if (res.success == false) {
      //       this.$message({
      //         type: 'info',
      //         message: res.msg
      //       })
      //     } else {
      //       this.listData = res.data
      //       // 分页赋值
      //       this.pageparm.currentPage = this.formInline.page
      //       this.pageparm.pageSize = this.formInline.limit
      //       this.pageparm.total = res.count
      //     }
      //   })
      //   .catch(err => {
      //     this.loading = false
      //     this.$message.error('菜单加载失败，请稍后再试！')
      //   })
    },

    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage
      this.formInline.limit = parm.pageSize
      this.getdata(this.formInline)
    },

    //点击编辑后，显示编辑界面（且只是负责编辑）
    handleEdit: function(index, row) {
      this.editFormVisible = true
      if (row != undefined && row != 'undefined') {
        this.title = '编辑修改'
        // 可以直接使用对象扩展语法（...），以减少重复代码，并确保所有的表单字段都被复制过来。这样，如果将来表单字段有变动，您只需在EditForm数据对象中进行更改，而不需要更新此编辑方法
        //使用扩展运算符...复制对象意味着您正在进行浅拷贝，如果行数据包含嵌套对象，那么这些嵌套对象将通过引用而不是通过值来复制
        this.EditForm = { ...row }
        // this.EditForm.RuleName = row.RuleName
        // this.EditForm.Circuit1 = row.Circuit1
        // this.EditForm.Circuit2 = row.Circuit2
        // this.EditForm.Circuit3 = row.Circuit3
        // this.EditForm.Circuit4 = row.Circuit4
        // this.EditForm.Circuit5 = row.Circuit5
        // this.EditForm.Circuit6 = row.Circuit6
        // this.EditForm.Circuit7 = row.Circuit7
        // this.EditForm.Circuit8 = row.Circuit8
        // this.EditForm.IsSet = row.IsSet
        // this.EditForm.EditTime = row.EditTime
        // this.EditForm.EditUser = row.EditUser
        // this.EditForm.DataID = row.DataID
      }
    },

    //点击添加后，显示添加界面
    handleAdd: function() {
      this.addFormVisible = true
    },

    // 我的编辑页面保存方法
    submitForm_edit() {
      // 检查表单数据是否有效
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          // 表单验证成功，开始发送请求
          this.loading = true; // 启用加载状态
          this.$axios.post('http://127.0.0.1:5000/api/update_circuit_weight', {
            id: this.EditForm.DataID, // 假设EditForm对象中包含ID
            new_data: { ...this.EditForm } // 使用新对象包含EditForm的所有数据
          }).then(response => {
            // 请求成功的处理
            this.loading = false; // 禁用加载状态
            this.editFormVisible = false; // 关闭对话框

            // 可以根据需要进行其他操作，例如更新视图或显示成功消息
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
          }).catch(error => {
            // 请求失败的处理
            this.loading = false; // 禁用加载状态

            // 错误处理，可能会显示错误消息，或在控制台输出错误
            this.$message.error('修改失败：' + error.message);
            console.error('Edit error:', error);
          });
        } else {
          // 表单验证失败
          this.$message.error('表单数据有误，请检查后再提交！');
          return false;
        }
      });
    },

    // 我的添加页面的保存方法
    submitForm_add() {
      // 检查表单数据是否有效
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          // 表单验证成功，开始发送请求
          this.loading = true; // 启用加载状态
          this.$axios.post('http://127.0.0.1:5000//api/add_circuit_weight', {
            new_data: { ...this.AddForm } // 使用新对象包含AddForm的所有数据
          }).then(response => {
            // 请求成功的处理
            this.loading = false; // 禁用加载状态
            this.addFormVisible = false; // 关闭对话框

            // 可以根据需要进行其他操作，例如更新视图或显示成功消息
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
          }).catch(error => {
            // 请求失败的处理
            this.loading = false; // 禁用加载状态

            // 错误处理，可能会显示错误消息，或在控制台输出错误
            this.$message.error('添加失败：' + error.message);
            console.error('Add error:', error);
          });
        } else {
          // 表单验证失败
          this.$message.error('表单数据有误，请检查后再提交！');
          return false;
        }
      });
    },

    // 表头的模糊查询-我的
    search_my() {
      this.$axios.get('http://127.0.0.1:5000/api/search_circuit_weight', {
        params: {
          searchVal: this.searchVal
        }
      }).then(response => {
        //更新listData中的数据
        this.listData = response.data;
      }).catch(error => {
        console.error('Search error:', error);
      });
    },

    submitForm1(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          variableSave(this.editForm)
            .then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.success) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '系统环境变量保存成功！'
                })
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.editFormVisible = false
              this.loading = false
              this.$message.error('系统环境变量保存失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },

    //获取当前点击行的索引和对象信息，将对象信息中的DataID通过axios发送post请求，传递给后端实现根据ID删除
    deleteInfo(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios.post('http://127.0.0.1:5000/api/delete_circuit_weight', {
            id: row.DataID
          }).then(response => {
            //删除成功后，重新请求数据
            this.getdata(this.formInline)
            this.$message({
              type: 'success',
              message: '删除成功！'
            });
          }).catch(error => {
            console.error('Delete error:', error);
            this.$message.error('删除失败：' + error.message);
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },


    // 删除权限
    deleteUser(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          variableDelete(row.varId)
            .then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '配置信息已删除'
                })
                this.getdata(this.formInline)
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('系统环境变量删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.editFormVisible = false;
      this.$refs.editForm.resetFields(); // 重置表单状态
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

