<template>
  <div>
    <h2>这是我的工作台2，用户已经上传自己的数据文件并且持久化，此处进行可视化展示和一个综合性的结果分析</h2>
<!--    上栅格系统-->
    <el-row>
      <el-col :span="12">
        <div id="graph_line" style="width:100%; height:500px;"></div>
        <div><span>机器学习建议：{{ graphLineAdvice }}</span></div>
      </el-col>
      <el-col :span="12">
        <div id="graph_bar" style="width:100%; height:500px;"></div>
        <div><span>机器学习建议：{{ graphBarAdvice }}</span></div>
      </el-col>
    </el-row>
<!--    下栅格系统-->
    <el-row>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》 ';
import * as echarts from 'echarts';
//导入JQuery的东西
import $ from 'jquery';

export default {
  name: 'Workbench2',
  // import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    // 这里存放数据
    return {
      graphLineAdvice: '后面机器学习的分析结果扔回来——折线图',
      graphBarAdvice: '后面机器学习的分析结果扔回来——柱状图',
    }
  },
  methods: {
    fetchDataAndCreateChartGraphLine: function() {
      var _this = this; // 保证在回调中this指向Vue实例
      // axios请求后台API
      _this.$axios.get('http://127.0.0.1:5000/api/graphLine')
        .then(function (response) {
          // response.data 是您从后台得到的数据
          var data = response.data;
          var option = {
            title: {
              text: 'Beijing AQI',
              left: '1%'
            },
            tooltip: {
              trigger: 'axis'
            },
            grid: {
              left: '5%',
              right: '15%',
              bottom: '10%'
            },
            xAxis: {
              data: data.map(function (item) {
                return item[0];
              })
            },
            yAxis: {},
            toolbox: {
              right: 10,
              feature: {
                dataZoom: {
                  yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
              }
            },
            dataZoom: [
              {
                startValue: '2014-06-01'
              },
              {
                type: 'inside'
              }
            ],
            visualMap: {
              top: 50,
              right: 10,
              pieces: [
                {
                  gt: 0,
                  lte: 50,
                  color: '#93CE07'
                },
                {
                  gt: 50,
                  lte: 100,
                  color: '#FBDB0F'
                },
                {
                  gt: 100,
                  lte: 150,
                  color: '#FC7D02'
                },
                {
                  gt: 150,
                  lte: 200,
                  color: '#FD0100'
                },
                {
                  gt: 200,
                  lte: 300,
                  color: '#AA069F'
                },
                {
                  gt: 300,
                  color: '#AC3B2A'
                }
              ],
              outOfRange: {
                color: '#999'
              }
            },
            series: {
              name: 'Beijing AQI',
              type: 'line',
              data: data.map(function (item) {
                return item[1];
              }),
              markLine: {
                silent: true,
                data: [
                  {
                    yAxis: 50
                  },
                  {
                    yAxis: 100
                  },
                  {
                    yAxis: 150
                  },
                  {
                    yAxis: 200
                  },
                  {
                    yAxis: 300
                  }
                ]
              }
            },

          };

          // 设置echarts图表配置
          _this.graph_line.setOption(option);
        })
        .catch(function (error) {
          // 处理请求错误
          console.log(error);
        });
    },
  },
  // 生命周期 - 创建完成（可以访问当前this 实例）
  created() {
  },
  //在mounted()函数中，初始化Echarts实例
  //mounted函数是在页面加载完毕后执行的函数
  mounted() {
    //模仿"北京 AQI 可视化"折线图
    var _this = this;
    var chartDom = document.getElementById('graph_line');
    //实例化
    _this.graph_line = echarts.init(chartDom);
    //配置
    var graph_line_option;

    //初始化请求数据，并创建图表
    _this.fetchDataAndCreateChartGraphLine();


    var myChart2 = echarts.init(document.getElementById('graph_bar'));
    var option2 = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data:['销量']
      },
      xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    };
    myChart2.setOption(option2);
  },
}
</script>

<style scoped>

</style>
