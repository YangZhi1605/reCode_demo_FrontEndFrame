<template>
  <div>
    <h2>日志信息-log</h2>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="日期"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户姓名"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="advice"
        label="监测建议">
      </el-table-column>
      <el-table-column
        prop="info_input"
        label="用户处理tag">
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
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》 ';

export default {
  name: 'Message',
  // import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    // 这里存放数据
    return {
      tableData: [
        {
        date: '2023-11-11',
        name: '汪仔',
        address: '上海市普陀区金沙江路 1518 弄',
        advice:'整体数据处于基本健康状态，少量数据出现严重危险',
        info_input:'已检修',
      }, {
        date: '2023-11-21',
        name: '汪仔',
        address: '上海市普陀区金沙江路 1517 弄',
        advice:'电动机危险电压出现次数超过110次',
        info_input:'',
      }, {
        date: '2024-01-27',
        name: '汪仔',
        address: '上海市普陀区金沙江路 1519 弄',
        advice:'Terminal-1接线柱磨损严重，需更换',
        info_input:'已检修',
      }, {
        date: '2024-03-03',
        name: '汪仔',
        address: '上海市普陀区金沙江路 1516 弄',
        advice:'5号电路支路出现的警报频率较高，建议检修',
        info_input:'',
      },
      ]
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
