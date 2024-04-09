<template>
  <div>
    <h4>@Copyright By zw</h4>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》 ';

export default {
  name: 'PageFooter',
  // import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    // 这里存放数据
    return {}
  },
  methods: {},
  // 生命周期 - 创建完成（可以访问当前this 实例）
  created() {
  },
}
</script>

<style scoped>
  h4{
    text-align: center;
    color: #5bc0de;
  }
//  为了让底部组件固定在页面底部显示
  div{
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
