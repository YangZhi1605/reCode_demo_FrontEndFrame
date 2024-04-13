<template>
  <div id="app">
    <a href="#/home">主页</a>
    <a href="#/user">用户页面</a>
    <a href="#/student">学生页面</a>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
