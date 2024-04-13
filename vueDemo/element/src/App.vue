<template>
  <div id="app">
    <a href="#/button">显示button组件</a>
    <a href="#/layout">显示布局组件</a>
    <a href="#/container">显示容器组件</a>
    <a href="#/containerexa">显示容器组件的实例</a>
    <a href="#/radio">显示单选按钮组件</a>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
