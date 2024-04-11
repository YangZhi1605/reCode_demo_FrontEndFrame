<template>
  <div>
    <h3>欢迎来到，零件仓库</h3>
<!--    先直接上轮播图-->
    <el-row>
      <el-col :span="18" :offset="3">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in imgs" :key="item">
            <el-image
              :src="item"
              fit="contain"></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <h3>热门零件</h3>
    <ul>
      <li v-for="item in 6" :key="item">
        <router-link :to="{ path: '/storehouse/detail', query: {product_id: item} }">
          <img src="https://www.17sucai.com/preview/1/2017-02-22/Carousel-figure/img/1.jpg" alt="">
          <h3>{{ detailName[item] }}</h3>
          <p>
            <span>价格</span>
            <span
              v-show="item.product_price != item.product_selling_price"
              class="del"
            >原价</span>
          </p>
        </router-link>
      </li>
      <li v-show="isMore && list.length>=1" id="more">
        <router-link :to="{ path: '/storehouse', query: {categoryID:categoryID} }">
          浏览更多
          <i class="el-icon-d-arrow-right"></i>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》 ';
import imgStore1 from '../../assets/ImgResp/imgStore1.jpg'
import imgStore2 from '../../assets/ImgResp/imgStore2.jpg'
import imgStore3 from '../../assets/ImgResp/imgStore3.jpg'
import imgStore4 from '../../assets/ImgResp/imgStore4.jpg'
export default {
  name: 'IndexStore',
  // import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    // 这里存放数据
    return {
      imgs:[imgStore1,imgStore2,imgStore3,imgStore4],
      detailName:['压缩机','气缸体','活塞','活塞环','活塞销','活塞杆'],
    }
  },
  methods: {},
  // 生命周期 - 创建完成（可以访问当前this 实例）
  created() {
  },
}
</script>

<style scoped>
</style>
