<template>
  <div>
<!--    展示仓库首页的组件-->
<!--    <h2 class="my-head-style-edit">这是仓库首页</h2>-->

<!--    处理其下的路由请求的展示。好的。处理成功。-->
    <router-view/>
    <button @click="goToTest">跳转</button>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》 ';
import IndexStore from "./IndexStore.vue";
export default {
  name: 'HomeStore',
  // import 引入的组件需要注入到对象中才能使用
  components: {IndexStore},
  props: {},
  data() {
    // 这里存放数据
    return {}
  },
  methods: {
    goToTest() {
      this.$router.push('/store/test'+this.$route.params.id);
    },
  },
  // 生命周期 - 创建完成（可以访问当前this 实例）
  created() {
  },
}
</script>

<style scoped>
.my-head-style-edit{
  font-size: 28px;
  margin: 0;
  line-height: 48px;
  color: #555;
}

</style>
