<template>
  <div>
<!--    放一个栅格。用于展示轮播图-->
    <el-row>
      <el-col :span="24">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in imgs" :key="item">
            <el-image

              :src="item"
              fit="contain"></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
<!--    展示图表-->
    <el-row>
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
      <el-col :span="20">
        <div id="graph4" style="width:100%; height:400px;"></div>
      </el-col>
    </el-row>

<!--    这里的布局用于展示一个综合性的分析结果。反馈机器学习的评价标准，目前写死为一句话，后续从后端拿反馈-->
    <el-row>
      <el-col :span="24">
        <div class="typing-container">
          <h2 class="typing-title">{{ headMsg }}</h2>
          <p class="typing-content">
            {{machineMsg}}
          </p>
        </div>
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
//导入ImgResp中的图片
import img1 from '../assets/ImgResp/img1.jpg';
import img2 from '../assets/ImgResp/img2.jpg';
import img3 from '../assets/ImgResp/img3.jpg';
import img4 from '../assets/ImgResp/img4.jpg';
import img5 from '../assets/ImgResp/img5.jpg';
import img6 from '../assets/ImgResp/img6.jpg';
import img7 from '../assets/ImgResp/img7.jpg';


export default {
  name: 'Index',
  // import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    return {
      chart: null,
      machineMsg:'这里是一个综合性的分析结果，反馈机器学习的评价标准，目前写死为一句话，后续从后端拿反馈吖吖',
      headMsg:'综合性分析',
      imgs:[img1,img2,img3,img4,img5,img6,img7],
    }
  },
  methods: {

  },
  // 生命周期 - 创建完成（可以访问当前this 实例）
  created() {
  },
  //在mounted()函数中，初始化Echarts实例
  mounted() {
    // this.chart1 = echarts.init(document.getElementById('graph1'));
    this.chart2 = echarts.init(document.getElementById('graph2'));
    this.chart3 = echarts.init(document.getElementById('graph3'));
    this.chart4 = echarts.init(document.getElementById('graph4'));

    var _this = this; // 将Vue实例的this赋值给_this变量，以便在函数回调中使用。
    var chartDom = document.getElementById('graph1'); // 根据ID获取DOM元素，该元素是要初始化图表的容器。
    _this.chart1 = echarts.init(chartDom); // 初始化echarts实例，将它赋值给Vue实例的chart1属性。
    var option; // 声明一个变量option，后面会用来存储echarts的配置项。

    // 使用jQuery的ajax方法，向后端请求数据。
    // 使用jQuery的get方法
    $.get(
      // 请求的网址
      'http://127.0.0.1:5000/lineRace',
      // 回调函数
      function (_rawData) {
        // 请求成功后将调用的函数，传入返回的数据作为参数
        //根据浏览器反馈，调用这个run函数时候出现了`chart is undefined`,原因是自己没有指定好vue对象
        run(_this.chart1, _rawData);
      }
    );
    // 定义一个函数run，用来处理请求成功后的数据
    function run(chart,_rawData){
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
      option = {
        animationDuration: 10000,
        dataset: [
          {
            id: 'dataset_raw',
            source: _rawData
          },
          ...datasetWithFilters
        ],
        title: {
          text: 'Income of Germany and France since 1950'
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
          name: 'Income'
        },
        grid: {
          right: 140
        },
        series: seriesList
      };

      chart.setOption(option);
    };



/****************************************************************************************/
    // 下面可以调用相应的函数，为这图表设置数据和参数
    //使用Echarts提供的setOption()函数设置图表的各项参数，包括类型、数据等
    // this.chart1.setOption({
    //   title: {
    //     text: '示例图表1'
    //   },
    //   tooltip: {},
    //   legend: {
    //     data:['销量']
    //   },
    //   xAxis: {
    //     data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    //   },
    //   yAxis: {},
    //   series: [{
    //     name: '销量',
    //     type: 'bar',
    //     data: [5, 20, 36, 10, 10, 20]
    //   }]
    // });
    //另一个图表的设置
    this.chart2.setOption({
      title: {
        text: ''
      },
      tooltip: {},
      legend: {
        data:['产量']
      },
      xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [{
        name: '产量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    });
    //放置一个折线图
    this.chart3.setOption({
      title: {
        text: ''
      },
      tooltip: {},
      legend: {
        data:['折线图']
      },
      xAxis: {
        data: ["A","B","C","D","E"]
      },
      yAxis: {},
      series: [
        {
          name: '折线图',
          data: [10, 22, 28, 23, 19],
          type: 'line',
          lineStyle: {
            normal: {
              color: 'green',
              width: 4,
              type: 'dashed'
            }
          }
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
  }
}
</script>


<style scoped>
/* 打字机效果的基本样式 */
.typing-container {
  max-width:720px;
  margin: auto;
  overflow: hidden; /* 防止在打字前内容显示 */
  white-space: nowrap; /* 保持文本在同一行 */
}

/* 打字机动画 */
.typing-title,
.typing-content {
  border-right: 3px solid; /* 光标效果 */
  animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite; /* 两个动画效果，打字和闪烁 */
}

/* 打字机动态效果 */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* 光标闪烁效果 */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: black }
}

/* 标题和内容的特定动画时长 */
.typing-title {
  animation-duration: 2s; /* 动画总时间 */
}

.typing-content {
  animation-duration: 8s; /* 动画总时间 */
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
