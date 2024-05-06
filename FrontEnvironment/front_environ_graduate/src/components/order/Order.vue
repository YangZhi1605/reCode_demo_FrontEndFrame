<template>
  <div>
    <router-view></router-view>
    <service-bar></service-bar>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》 ';
import imgOrder1 from '../../assets/ImgResp/imgOrder.jpg'
import ServiceBar from "../component_repository/ServiceBar.vue";

export default {
  name: 'Order',
  // import 引入的组件需要注入到对象中才能使用
  components: {
    ServiceBar
  },
  props: {},
  data() {
    // 这里存放数据
    return {
        imgs:[imgOrder1],
    }
  },
  methods: {

  },
  // 生命周期 - 创建完成（可以访问当前this 实例）
  created() {
  },
}
</script>

<style scoped>

</style>
