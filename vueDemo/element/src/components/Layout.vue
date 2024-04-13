<template>
  <div>
    <h1>布局组件</h1>
    <el-row>
      <el-col :span="8"><div style="border: 1px crimson solid">占有成8份</div></el-col>
      <el-col :span="8"><div style="border: 1px crimson solid">占有成8份</div></el-col>
      <el-col :span="8"><div style="border: 1px crimson solid">占有成8份</div></el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="3"><div style="border: 1px coral solid">占有3份</div></el-col>
      <el-col :span="4"><div style="border: 1px coral solid">占有4份</div></el-col>
      <el-col :span="8"><div style="border: 1px coral solid">占有8份</div></el-col>
      <el-col :span="9"><div style="border: 1px coral solid">占有9份</div></el-col>
    </el-row>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》 ';

export default {
  name: 'Layout',
  // import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    // 这里存放数据
    return {}
  },
  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {},
  // 生命周期 - 创建完成（可以访问当前this 实例）
  created() {
  },
  // 生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() {
  },
  beforeCreate() {
  },
  beforeMount() {
  }, // 生命周期 - 挂载之前
  beforeUpdate() {
  }, // 生命周期 - 更新之前
  updated() {
  }, // 生命周期 - 更新之后
  beforeDestroy() {
  }, // 生命周期 - 销毁之前
  destroyed() {
  }, // 生命周期 - 销毁完成
  activated() {
  } // 如果页面有 keep-alive 缓存功能,这个函数会触发
}
</script>

<style scoped>
</style>
