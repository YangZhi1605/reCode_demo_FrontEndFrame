<template>
  <div style="margin-top: 80px">
    <!--    展示图表-->
    <el-row style="margin-top: 30px">
      <el-col :span="4">
        <div id="graph2" style="width:100%; height:400px;"></div>
      </el-col>
      <el-col :span="16">
        <div id="graph1" style="width:100%; height:400px;"></div>
      </el-col>
      <el-col :span="4">
        <div id="graph3" style="width:100%; height:400px;"></div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div id="graph4" style="width:100%; height:400px;"></div>
      </el-col>
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
  name: 'ChartShow',
  // import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    // 这里存放数据
    return {}
  },
  //在mounted()函数中，初始化Echarts实例
  //mounted函数是在页面加载完毕后执行的函数
  mounted() {
    // this.chart1 = echarts.init(document.getElementById('graph1'));
    this.chart2 = echarts.init(document.getElementById('graph2'));
    this.chart3 = echarts.init(document.getElementById('graph3'));
    this.chart4 = echarts.init(document.getElementById('graph4'));

    var _this = this; // 将Vue实例的this赋值给_this变量，以便在函数回调中使用。
    var chartDom = document.getElementById('graph1'); // 根据ID获取DOM元素，该元素是要初始化图表的容器。
    _this.chart1 = echarts.init(chartDom); // 初始化echarts实例，将它赋值给Vue实例的chart1属性。
    var option; // 声明一个变量option，后面会用来存储echarts的配置项。

    // 初始请求数据并且创建图表
    _this.fetchDataAndUpdateChart();

    /****************************************************************************************/
    // 下面可以调用相应的函数，为这图表设置数据和参数
    //另一个图表的设置
    this.chart2.setOption({
      title: {
        text: '使用占比'
      },
      tooltip: {},
      legend: {
        data:['']
      },
      xAxis: {
        data: ["特斯拉","宝马","比亚迪","上汽","福特","蔚蓝"]
      },
      yAxis: {},
      series: [{
        name: '电动汽车厂家',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
        itemStyle: {  // 添加itemStyle来设置柱状图的样式
          color: '#840228'  // 设置柱状图的颜色为#aa2116
        },
      }]
    });
    //放置一个雷达图
    this.chart3.setOption({
      title: {
        text: ''
      },
      legend: {
        data: ['Allocated Budget', 'Actual Spending']
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: 'Sales', max: 6500 },
          { name: 'Administration', max: 16000 },
          { name: 'Information Technology', max: 30000 },
          { name: 'Customer Support', max: 38000 },
          { name: 'Development', max: 52000 },
          { name: 'Marketing', max: 25000 }
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: 'Allocated Budget'
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: 'Actual Spending'
            }
          ]
        }
      ]
    });
    //放置一个饼图
    this.chart4.setOption({
      title: {
        text: '',
        subtext: ''
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data:[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:1548, name:'搜索引擎'}
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    });
  },

  // 生命周期 - 创建完成（可以访问当前this 实例）
  created() {
  },

  methods: {
    //编写获取动态折线图数据和图表更新的方法
    fetchDataAndUpdateChart() {
      $.get('http://127.0.0.1:5000//api/lineData', (rawData) => {
        this.myRun(this.chart1, rawData);
      });
    },
    //编写其调用的run方法
    run(chart, rawData) {
      //这里吧啦吧啦的写自己需要定义的数据
      //写自己需要跑的数据
      const countries = [
        'Finland',
        'France',
        'Germany',
        'Iceland',
        'Norway',
        'Poland',
        'Russia',
        'United Kingdom'
      ];

      const datasetWithFilters = [];
      //存放系列列表配置
      const seriesList = [];

      echarts.util.each(countries,function (country) {
        var datasetId = 'dataset_' + country;
        datasetWithFilters.push({
          id: datasetId,
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [
                { dimension: 'Year', gte: 1950 },
                { dimension: 'Country', '=': country }
              ]
            }
          }
        });

        seriesList.push({
          type: 'line',
          datasetId: datasetId,
          showSymbol: false,
          name: country,
          endLabel: {
            show: true,
            formatter: function (params) {
              return params.value[3] + ': ' + params.value[0];
            }
          },
          labelLayout: {
            moveOverlap: 'shiftY'
          },
          emphasis: {
            focus: 'series'
          },
          encode: {
            x: 'Year',
            y: 'Income',
            label: ['Country', 'Income'],
            itemName: 'Year',
            tooltip: ['Income']
          }
        });
      });

      //option配置
      const option = {
        animationDuration: 10000,
        dataset: [
          {
            id: 'dataset_raw',
            source: rawData
          },
          ...datasetWithFilters
        ],
        title: {
          text: '电路信息实时播报'
        },
        tooltip: {
          order: 'valueDesc',
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          nameLocation: 'middle'
        },
        yAxis: {
          name: '电压'
        },
        grid: {
          right: 140
        },
        series: seriesList
      };

      chart.setOption(option);
    },

    //编写我自己的获取动态数据的run方法
    myRun(chart, rawData) {
      // 指定需要展示的电路
      const circuitNames = [
        'circuit1',
        'circuit2',
        'circuit3',
        'circuit4',
        'circuit5',
        'circuit6',
        'circuit7',
        'circuit8'
      ];

      const datasetWithFilters = [];
      const seriesList = [];

      echarts.util.each(circuitNames, function (circuitName) {
        var datasetId = 'dataset_' + circuitName;
        datasetWithFilters.push({
          id: datasetId,
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [
                { dimension: 'num', gte: 480 }, // 假设num最小为1
                { dimension: 'VoltageName', '=': circuitName }
              ]
            }
          }
        });

        seriesList.push({
          type: 'line',
          datasetId: datasetId,
          showSymbol: false,
          name: circuitName,
          endLabel: {
            show: true,
            formatter: function (params) {
              return params.value[2] + ': ' + params.value[0]; // #1为VoltageName, #0为VoltageVal, #2为num
            }
          },
          labelLayout: {
            moveOverlap: 'shiftY'
          },
          emphasis: {
            focus: 'series'
          },
          encode: {
            x: 'num',
            y: 'VoltageVal',
            label: ['VoltageName', 'VoltageVal'],
            itemName: 'num',
            tooltip: ['VoltageVal']
          }
        });
      });

      // option配置
      const option = {
        animationDuration: 100000,
        dataset: [
          {
            id: 'dataset_raw',
            source: rawData
          },
          ...datasetWithFilters
        ],
        title: {
          text: '电路电压实时变化信息'
        },
        tooltip: {
          order: 'valueDesc',
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          name: '',
          nameLocation: 'middle'
        },
        yAxis: {
          name: '电压 (V)'
        },
        grid: {
          right: 140
        },
        series: seriesList
      };

      chart.setOption(option);
    },
  },

}
</script>


<style scoped>
</style>
