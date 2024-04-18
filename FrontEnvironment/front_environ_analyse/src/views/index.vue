<template>
    <div>
      这是我常规写的内容
      <el-button type="success" @click="toRouter" size="mini">点击我</el-button>
      <router-view></router-view>
    </div>
</template>

<script>

export default {
  name: 'Index',
  components: {},
  props: {},
  data() {
    return {}
  },
  methods: {
    toRouter() {
      this.$router.push('/index/indexChild1')
    },
  },
  created() {
  },

}
</script>
<style lang="scss" scoped>

</style>
