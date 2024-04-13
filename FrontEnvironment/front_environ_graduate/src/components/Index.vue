<template>
  <div>
<!--    放Container容器-->
    <el-container>
<!--      顶部容器-->
      <el-header>
        <h1 class="my_head_style">电动汽车健康管理专家</h1>
        <div class="my_head_text_style">电动汽车状态监测与可视化系统，一个为广大电动汽车用户而设计的、简易明了的汽车电路健康状态管理平台</div>
        <el-row class="button-row">
          <el-button @click="gotoWorkbench" type="danger" plain icon="el-icon-s-promotion">开始使用</el-button>
          <el-button @click="scrollToShowComponent" type="success" plain icon="el-icon-document-copy">查看说明</el-button>
        </el-row>
      </el-header>
<!--      主体-->
      <el-main>
        <!--    放一个栅格。用于展示轮播图-->
        <el-row style="margin-top: 70px">
          <el-col :span="24">
            <el-carousel :interval="4000" type="card" height="260px">
              <el-carousel-item v-for="item in imgs" :key="item">
                <el-image
                  :src="item"
                  fit="contain"></el-image>
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
        <div class="image-container">
          <el-image :src="IndexPic" ></el-image>
        </div>
      </el-main>
<!--      底部容器-->
      <el-footer>
        <h3 class="my-use-advice-title">使用指南</h3>
        <div class="my-use-advice-text">{{ typewriterText }}</div>

        <ChartShow ref="footShow"></ChartShow>
      </el-footer>
    </el-container>
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
import ELementUIIndexPic from '../assets/ImgResp/ELementUIIndexPic.jpg'
//导入ChartShow组件
import ChartShow from '../components/component_repository/ChartShow.vue';


export default {
  name: 'Index',
  // import 引入的组件需要注入到对象中才能使用,别忘记了
  components: {
    ChartShow,
  },
  props: {},
  data() {
    return {
      chart: null,
      imgs:[img1,img2,img3,img4,img5,img6,img7],
      text: '这是一个帮助用户判断电动汽车健康状态的系统。在本系统，用户通过上传自己电动汽车的电池电压数据，就能够得到诸多像动态折线图、雷达评分图、绚丽饼状图等等清晰明了的可视化结果，以及随机森林、线性回归等等机器学习和集成学习的分析建议吖~~',
      typewriterText: '',
      delay: 120, // 控制每个字符的输出速度
      typewriterStarted: false, // 添加一个控制打字机效果是否已开始的标记,点击一次就标记吧，多次标记影响观感。
      IndexPic:ELementUIIndexPic
    }
  },
  //mounted函数是在页面加载完毕后执行的函数
  mounted(){

  },
  // 生命周期 - 创建完成（可以访问当前this 实例）
  created() {
  },

  methods:{
    clickMe(){
      console.log('按钮被点击了');
    },
    //跳转到工作台，路由是/wrben/wrben1
    gotoWorkbench(){
      this.$router.push('/wrben/wrben1');
    },
    scrollToShowComponent() {
      this.$nextTick(() => {
        const component = this.$refs.footShow.$el;
        console.log(component); // 打印调试信息，查看DOM元素是否正确获取
        if (component) {
          const top = component.offsetTop;
          console.log(top); // 打印调试信息，查看计算的top值是否正确
          window.scrollTo({ top: top, behavior: 'smooth' });
          // 开始打字机效果
          if (!this.typewriterStarted) {
            this.runTypewriter();
            this.typewriterStarted = true; // 标记为已开始，以防止再次触发
          }
        } else {
          console.log('组件没有找到'); // 如果没有获取到组件，打印提示
        }
      });
    },
    //实现打字机效果
    runTypewriter() {
      let i = 0;
      const typing = () => {
        if (i < this.text.length) {
          this.typewriterText += this.text.charAt(i);
          i++;
          setTimeout(typing, this.delay);
        }
      };
      typing();
    },
  },

  //生命周期 - 销毁
  beforeDestroy() {
  },
}
</script>


<style scoped>
/*使用介绍的文字*/
.my-use-advice-text{
  font-size: 18px;
  color: #99a9bf;
  padding: 0 25px;
  line-height: 20px;
}
/*图片居中*/
.image-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  /* 如果需要使 el-image 元素完全居中在页面或某个特定元素内 */
  height: 100%; /* 父元素需要有确定的高度或相对于页面的百分比高度 */
}
/*使用介绍标题*/
.my-use-advice-title{
  font-size: 24px;
  margin: 0;
  line-height: 48px;
  color: #555;
  text-align: center;
  margin-top: 20px;
}

/*按钮居中*/
.button-row {
  display: flex;
  justify-content: center; /* 水平居中 */
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
.my_head_style{
  font-size: 34px;
  margin: 0;
  line-height: 48px;
  color: #555;
  text-align: center;
}
.my_head_text_style{
  font-size: 18px;
  line-height: 28px;
  color: #888;
  margin: 10px 0 5px;
  text-align: center;
}
</style>
