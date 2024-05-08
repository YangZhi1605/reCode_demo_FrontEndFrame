<template>
  <div>
<!--    标题-->
    <h2 class="my-head-style-edit">请上传您的数据</h2>
<!--    这里写一个表格组件，先展示假数据，当用户下载自己数据模板，将数据填进去，上传之后，再进行更新展示部分-->
    <el-row style="margin-top: 35px">
      <el-col :span="24">
        <el-table
          :data="getPagedTableData"
          border
          stripe
          style="width: 100%">
          <el-table-column
            fixed
            label="序号"
            prop="ID"
            width="150">
            <template slot-scope="scope">
              {{ getPageIndex(scope.$index) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="DeviceNodeID"
            label="DeviceNodeID"
            width="130">
          </el-table-column>
          <el-table-column
            prop="DeviceName"
            label="DeviceName"
            width="120">
          </el-table-column>
          <el-table-column
            prop="UserID"
            label="UserID"
            width="120">
          </el-table-column>
          <el-table-column
            prop="CollectTime"
            label="CollectTime"
            width="200">
          </el-table-column>
          <el-table-column
            prop="Voltage1"
            label="第①路输入"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage2"
            label="第①路输出"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage3"
            label="第②输入"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage4"
            label="第②路输出"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage5"
            label="第③路输入"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage6"
            label="第③路输出"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage7"
            label="第④路输入"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage8"
            label="第④路输出"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage9"
            label="第⑤路输入"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage10"
            label="第⑤路输出"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage11"
            label="第⑥路输入"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage12"
            label="第⑥路输出"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage13"
            label="第⑦路输出"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage14"
            label="第⑦路输出"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage15"
            label="第⑧路输入"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage16"
            label="第⑧路输出"
            width="120">
          </el-table-column>
          <!--为了将输入框和搜索按钮放在表格列的同一行，
          可以使用 Element UI 的布局组件el-form和el-form-item。
          通过在el-table-column的header插槽中创建一个表单，
          然后在表单内部使用el-form-item来放置输入框和按钮。-->
          <el-table-column
            fixed="right"
            label=""
            width="300">
            <template slot="header" slot-scope="scope">
              <el-form inline size="mini">
                <el-form-item>
                  <el-input
                    v-model="searchVal"
                    placeholder="输入设备名称或电压值搜索"
                    v-on:keyup.enter="handleSearchTable">
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    @click="handleSearchTable"
                    type="info"
                    size="mini"
                    plain>
                    搜索
                  </el-button>
                </el-form-item>
              </el-form>
            </template>
            <template slot-scope="scope">
              <el-button @click="editRow(scope.row)" type="warning " size="mini" plain>编辑</el-button>
              <el-button @click="deleteRow(scope.row)" type="danger" size="mini" plain>删除</el-button>
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
          :total="tableData.length">
        </el-pagination>

      </el-col>
    </el-row>
<!--这里写一个提供用户下载的excel模板文件。使用布局容器，左边12用于下载模板，右边12用于上传-->
<!--    当然，这个模板文件应该是由后台提供。-->
    <el-row style="margin-top: 50px">
<!--      申请下载-->
      <el-col :span="12">
        <el-button type="primary" icon="el-icon-download" size="medium" @click="downloadTemplate">下载模板</el-button>
      </el-col>

<!--      上传到后台-->
<!--      这个代码示例使用Element UI提供的el-upload组件实现文件的上传功能。
file-list属性用来维护一个包含所有待上传和已上传文件信息的数组。
list-type属性设置为text，使得上传文件的列表在组件的下方以文本形式呈现。
除了上传的文件名，还可以展示更多的信息，比如文件大小
同时，handleSuccess和handleError方法分别在文件上传成功或失败时被调用，
并显示相应的提示信息。还有一个removeFile方法用于从列表中移除文件。
在实际应用中，您可能还需要将此方法连接到后端接口以处理文件真实的删除操作
-->
      <el-col :span="12">
        <el-upload
          class="upload-demo"
          action="http://127.0.0.1:5000/api/uploadExcel"
          :on-success="handleSuccess"
          :on-error="handleError"
          :before-upload="beforeUpload"
          :file-list="fileList"
          list-type="text"
        >
          <el-button slot="trigger" size="medium" type="primary" icon="el-icon-upload">上传文件</el-button>
          <div slot="tip" class="el-upload__tip" >只能上传.xls或.xlsx文件</div>
        </el-upload>
      </el-col>
<!--对上传文件的展示，同时包含删除、整理等操作-->
      <el-col :span="24">
        <el-table :data="fileList" style="width: 100%; margin-top: 20px;" border>
          <el-table-column prop="name" label="文件名"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="removeFile(scope.row)" size="small" type="danger">删除</el-button>
              <el-button @click="organizeFile(scope.row)" size="small" type="primary">文件整理</el-button>
              <el-button @click="analysisFile" size="small" type="success ">分析健康状态</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-button v-show="isShow" @click="reloadData" icon="el-icon-refresh"></el-button>

  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》 ';
export default {
  name: 'TableCom',
  // import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      fileList: [], // 用于维护上传文件列表的数组
      logInfo:{}, //用于维护日志信息
      searchVal:'',//搜索框输入的内容
      isShowTable:false,//标记'上传文件'是否被上传过了
      isShow:true,
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示条数
      log_info_create:{},//存储日志信息
    }
  },
  /*
  * watch 选项中的 $route 函数会有两个参数 to 和 from，
  * 分别表示目标路由和当前路由。
  * 通过检查 to.path 和 to.query.isSubmit，
  * 你可以确定是否从 /wrben/wrben3 返回到了 /wrben/wrben1，
  * 并且 isSubmit 参数已经被传递。
  * to 表示目标路由，也就是跳转之后要到达的路由。
  * 在你的场景中，当从/wrben/wrben3路由通过 $router.push() 跳转回 /wrben/wrben1 路由时，
  * to代表的就是/wrben/wrben1 路由的对象。
  * path 是一个字符串，代表目标路由的路径。在这个例子中，它是 /wrben/wrben1
  * query 是一个对象，包含了 URL 中的查询参数。如果你通过 this.$router.push({path:'/wrben/wrben1',query:{isSubmit:this.isSubmit}}); 跳转，那么在 /wrben/wrben1 路由下，to.query 就会包含一个属性 isSubmit，其值为跳转时设置的 this.isSubmit 的值
  * */
  //watch监听执行不了
  watch: {
    '$route'(to, from) {
      console.log('进入了watch函数');
      // 当路由变化时执行的函数,将路由中的JSON转换回布尔值试试
      if(to.path === '/wrben/wrben1' && JSON.parse(to.query.isSubmit)) {
        // 路由匹配 '/wrben/wrben1' 且 isSubmit 参数存在
        this.isSubmit = JSON.parse(to.query.isSubmit);
        console.log('isSubmit被赋值了',this.isSubmit);
        //调用重新加载数据的函数
        this.reloadData();
      }
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
      return this.tableData.slice(start, end);
    },
    username() {
      // 从localStorage中读取用户信息
      const user = JSON.parse(localStorage.getItem('user'));
      // 如果用户已登录，返回用户名，否则返回null
      return user ? user.username : null;
    },

  },


  methods: {

    handleClick(row) {
      console.log(row);
    },

    //管理下载模板的代码
    downloadTemplate() {
      // 此处使用window.location.href方式触发文件下载, 假设Flask后端下载路由是'/api/downloadExcel'
      window.location.href = 'http://127.0.0.1:5000//api/downloadExcel';
    },

    //上传文件成功的提示
    handleSuccess(response, file, fileList) {
      this.$message.success('文件上传成功！');
      this.fileList = fileList; // 更新文件列表
      this.isShowTable = true;
      console.log('上传标记',this.isShowTable);
    },

    //上传失败的提示
    handleError(err, file, fileList) {
      this.$message.error('文件上传失败！');
      this.fileList = fileList; // 更新文件列表
    },

    //上传前的校验
    beforeUpload(file) {
      // 此处可以添加上传前的文件验证逻辑
      const isExcel = file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

      if (!isExcel) {
        this.$message.error('上传文件只能是 xls 或 xlsx 格式!');
        return false;
      }
      return true;
    },

    //删除后端中的文件的代码
    removeFile(file) {
      // 发送请求到后端以删除文件
      this.$axios
        .post('http://127.0.0.1:5000/api/deleteExcel', { filename: file.name })
        .then(response => {
          // 成功删除后
          this.$message.success('文件删除成功！');
          // 移除文件逻辑
          console.log('待删除文件：',file.name);
          const index = this.fileList.indexOf(file);
          if (index !== -1) {
            this.fileList.splice(index, 1);
          }
        })
        .catch(error => {
          // 删除失败
          this.$message.error('文件删除失败！');
          console.error('Error deleting file:', error);
        });

    },

    //整理文件的代码 ==> 有问题没有调试出来
    organizeFile(file) {
      // 确定是哪个文件需要整理，并通知后端进行相应的处理
      this.$axios
        .post('http://127.0.0.1:5000/api/organizeExcel', { filename: file.name })
        .then(response => {
          // 这里处理后端返回的结果
          this.$message.success('文件整理完成！');
          // 发起第二个请求,获得全部数据并展示
          return this.$axios.get('http://127.0.0.1:5000/api/getDB_data');
        })
        .then(response => {
          // 第二个请求也成功了
          this.$message.success('第二个请求成功！');
        //   控制台输出第二个请求响应体中的数据
          console.log('整理文件按钮中请求后端数据',response.data);
          //绑定为vue
          this.tableData = response.data;

        })
        .catch(error => {
          // 捕获第一个或第二个请求中的任何错误
          this.$message.error('请求失败！');
          console.error('Error:', error);
        });
    },

    //跳转到工作台2之前，想把日志信息拿到的函数，同样发送axios请求，拿到日志信息，存储到log_info_create对象中
    // get_log_info函数应该返回一个Promise
    get_log_info(){
      console.log('当前的用户信息为：',this.username);
      return new Promise((resolve, reject) => {
        this.$axios.get('http://127.0.0.1:5000/api/create_logInfo', { params: { username: this.username } })
          .then(response => {
            this.log_info_create = response.data;
            console.log('日志信息：', this.log_info_create);
            resolve();  // 当方得到你需要的数据后，调用resolve告诉函数它已经完成了
          })
          .catch(error => {
            console.error('Error:', error);
            reject(error);  // 如果有错误，调用reject将错误传递出去
          });
      });
    },

    //跳转到工作台2，准备实现可视化分析
    async analysisFile() {
      //调用get_log_info函数，获得本次日志信息
      // this.get_log_info();
      await this.get_log_info();
      //检查this.log_info_create确保其不是空对象
      console.log('准备发送给后端的日志信息：', this.log_info_create);
      if (Object.keys(this.log_info_create).length > 0) {
        this.$axios.post('http://127.0.0.1:5000/api/add_info', this.log_info_create)
          .then(response => {
            this.$message.success('日志信息已发送！');
          });
      } else {
        console.log('日志信息为空，无法发送！');
      }

      this.$router.push('/workbench/workbench2');
    },

    //传入ID，删除对应行
    deleteRow(row) {
      // 弹出确认删除的对话框
      this.$confirm('此操作将永久删除该行数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('即将删除行对象的ID',row.ID);
        console.log('即将删除的行对象',row);
        // 用户确认删除，这里发送 axios 请求到后端进行删除
        this.$axios.get(`http://127.0.0.1:5000/api/deleteData?id=${row.ID}`)
          .then(() => {
            // 请求成功，从 tableData 中移除该行
            const index = this.tableData.indexOf(row);
            if (index !== -1) {
              this.tableData.splice(index, 1);
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          })
          .catch(error => {
            this.$message.error('删除失败！' + error);
            console.error('Delete error:', error);
          });
      }).catch(() => {
        // 用户取消删除
        this.$message.info('已取消删除');
      });
    },

    //搜索框的搜索功能
    handleSearchTable() {
      // Exit the function if the search term is empty
      if(!this.searchVal.trim()) {
        alert('请输入搜索内容')
        return;
      }
      //函数 trim() 是 JavaScript 的字符串方法，它用来移除字符串两端的空白字符，包括空格、制表符、换行符等
      console.log(this.searchVal.trim());
      this.$axios
        .get(`http://127.0.0.1:5000/api/searchData`, { params: { query: this.searchVal.trim() } })
        .then(response => {
          // Handle your search result here
          console.log('搜索框检索出来的内容',response.data);
          //更新tableData的数据
          this.tableData=response.data
        })
        .catch(error => {
          //异常处理
          console.error('Search error:', error);
        });
      //清空输入框
      this.searchVal = '';
    },

    //跳转到工作台3，实现信息编辑
    editRow(row) {
      // 注意参数，一个是路径path，一个是需要传递过去的行数据参数
      //用 query 而不是 params：如果不是使用动态路由参数，那你可能需要用 query 代替 params 来传递参数
      this.$router.push({ name: 'EditPage', query: { editData: JSON.stringify(row) }});
    },

    //点击刷新按钮之后，重新加载数据库中更新的数据
    reloadData() {
      //重新发送请求，获取数据库中更新后的数据
      this.$axios.get('http://127.0.0.1:5000/api/getDB_data')
        .then(res => {
          //将更新后的数据库数据赋值给新的变量
          this.tableData = res.data;
          console.log('更新后的数据：',this.tableData);//数据是拿到了，控制台也输出了
          //成功后，弹出成功的消息提示——暂时放着
          // this.$message({
          //   message: '更新成功',//显示了
          //   type: 'success'
          // });
        })
        .catch(err => {
          //失败后，弹出失败的消息提示
          this.$message({
            message: '更新失败',
            type: 'error'
          });
          console.log(err);
        });

      //标记isShow为false,点击过了，就让它走吧
      this.isShow = false;
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

    /*
    * 如果您希望表格的序号是连续的，并且在删除行之后仍然保持连续（不依赖于数据库中的主键ID），
    * 您可以不使用数据库的ID字段作为序号，
    * 而是在表格组件中动态生成序号。这可以通过添加一个计算属性来完成，
    * 它会为当前页的每一行生成一个连续的序号。这个序号基于当前的页码和每页的大小。
    * 我们定义了getPageIndex方法，
    * 它接收$index（当前行在getPagedTableData返回的数组中的索引）
    * */
    //计算序号的事件函数
    getPageIndex(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1;
    },
  },

  // 生命周期 - 创建完成（可以访问当前this 实例）
  created() {

  },
}
</script>

<style scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.my-head-style-edit{
  font-size: 28px;
  margin: 0;
  line-height: 48px;
  color: #555;
}
</style>
