<template>
  <div>
<!--    这里写一个表格组件，先展示假数据，当用户下载自己数据模板，将数据填进去，上传之后，再进行更新展示部分-->
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="Id"
            label="ID"
            width="150">
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
            prop="UserId"
            label="UserID"
            width="120">
          </el-table-column>
          <el-table-column
            prop="CollectTime"
            label="CollectTime"
            width="200">
          </el-table-column>
          <el-table-column
            prop="Voltage1_in"
            label="第①路输入"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage1_out"
            label="第①路输出"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage2_in"
            label="第②输入"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage2_out"
            label="第②路输出"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage3_in"
            label="第③路输入"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage3_out"
            label="第③路输出"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage4_in"
            label="第④路输入"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage4_out"
            label="第④路输出"
            width="300">
          </el-table-column>
          <el-table-column
            prop="Voltage5_in"
            label="第⑤路输入"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage5_in"
            label="第⑤路输入"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage5_in"
            label="第⑤路输入"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage5_in"
            label="第⑤路输入"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage5_out"
            label="第⑤路输出"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage6_in"
            label="第⑥路输入"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage6_out"
            label="第⑥路输入"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage7_in"
            label="第⑦路输入"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage7_out"
            label="第⑦路输出"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage8_in"
            label="第⑧路输入"
            width="120">
          </el-table-column>
          <el-table-column
            prop="Voltage8_out"
            label="第⑧路输出"
            width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
<!--这里写一个提供用户下载的excel模板文件。使用布局容器，左边12用于下载模板，右边12用于上传-->
<!--    当然，这个模板文件应该是由后台提供。-->
    <el-row>
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

      <el-col :span="24">
        <el-table :data="fileList" style="width: 100%; margin-top: 20px;" border>
          <el-table-column prop="name" label="文件名"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="removeFile(scope.row)" size="small" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

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
  methods: {
    handleClick(row) {
      console.log(row);
    },

    downloadTemplate() {
      // 此处使用window.location.href方式触发文件下载, 假设Flask后端下载路由是'/api/downloadExcel'
      window.location.href = 'http://127.0.0.1:5000//api/downloadExcel';
    },
    handleSuccess(response, file, fileList) {
      this.$message.success('文件上传成功！');
      this.fileList = fileList; // 更新文件列表
    },
    handleError(err, file, fileList) {
      this.$message.error('文件上传失败！');
      this.fileList = fileList; // 更新文件列表
    },
    beforeUpload(file) {
      // 此处可以添加上传前的文件验证逻辑
      const isExcel = file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

      if (!isExcel) {
        this.$message.error('上传文件只能是 xls 或 xlsx 格式!');
        return false;
      }
      return true;
    },
    removeFile(file) {
      // // 移除文件逻辑
      // const index = this.fileList.indexOf(file);
      // if (index !== -1) {
      //   this.fileList.splice(index, 1);
      // }
      // 发送请求到后端以删除文件
      this.$axios
        .post('http://127.0.0.1:5000/api/deleteExcel', { filename: file.name })
        .then(response => {
          // 成功删除后
          this.$message.success('文件删除成功！');
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

  },

  data() {
    return {
      tableData: [{
        Id: '1',
        DeviceNodeID: 'node1',
        DeviceName: '发动机',
        UserId: '1001',
        CollectTime: '2023-09-09 12:00:00',
        Voltage1_in: 200333,
        Voltage1_out: 200333,
        Voltage2_in: 200333,
        Voltage2_out: 200333,
        Voltage3_in: 200333,
        Voltage3_out: 200333,
        Voltage4_in: 200333,
        Voltage4_out: 200333,
        Voltage5_in: 200333,
        Voltage5_out: 200333,
        Voltage6_in: 200333,
        Voltage6_out: 200333,
        Voltage7_in: 200333,
        Voltage7_out: 200333,
        Voltage8_in: 200333,
        Voltage8_out: 200333,
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }],
      fileList: [] // 用于维护上传文件列表的数组
    }
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
</style>
