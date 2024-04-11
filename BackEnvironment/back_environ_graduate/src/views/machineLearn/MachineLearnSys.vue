<template>
  <div>

    <el-row>
      <el-col :span="24">
        <!--    表格用户维护模型信息-->
        <el-table
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%">
          <el-table-column
            label="模型上传时间"
            prop="date">
          </el-table-column>
          <el-table-column
            label="模型名称"
            prop="name">
          </el-table-column>
          <el-table-column
            align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
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
        <el-button size="medium " type="success" >模型训练</el-button>
        <div class="el-upload__tip">将会占据大量服务器资源~</div>
      </el-col>

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


  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》 ';

export default {
  name: 'MachineLearnSys',
  // import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    // 这里存放数据
    return {
      tableData: [{
        date: '2023-11-02',
        name: 'KNN_my.pkl',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2023-11-24',
        name: 'RF_RandomCV_0806_08763.pkl',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2024-01-21',
        name: 'LogisticRegression_0911_alldata_0873.pkl',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2024-02-03',
        name: 'RF_RandomCV_workingHour_0914_07419.pkl',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      search: ''
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  // 生命周期 - 创建完成（可以访问当前this 实例）
  created() {
  },
}
</script>

<style scoped>
</style>
