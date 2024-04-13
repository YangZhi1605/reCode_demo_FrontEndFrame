<template>
  <div>
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in imgs" :key="item">
        <el-image
          style="width: 500px; height: 300px"
          :src="item"
          fit="contain"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》 ';
//导入图片
import homeImg1 from '../assets/IndexImgs/1.jpg';
import homeImg2 from '../assets/IndexImgs/2.jpg';
import homeImg3 from '../assets/IndexImgs/3.jpg';
import homeImg4 from '../assets/IndexImgs/4.jpg';
import homeImg5 from '../assets/IndexImgs/5.jpg';
import Logo from '../assets/logo.png'

export default {
  name: 'Index',
  // import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data(){
      return {
        imgs:[homeImg1,homeImg2,homeImg3,homeImg4,homeImg5,Logo]
      }
  },
}
</script>

<style scoped>
</style>
