<template>
  <div>
    <h1>主页组件Home</h1>

    <div style="width: 300px;height: 300px;color: #5bc0de;align-content: center">
      吧啦吧啦，这里是页面主体啦啦啦~~

      <table border="1">
        <thead>
          <tr>
            <td>ID</td>
            <td>姓名</td>
            <td>年龄</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.age }}</td>
            <td>修改-删除</td>
          </tr>
        </tbody>
      </table>
    </div>
<!--    使用组件-->
    <Footer></Footer>
  </div>
</template>

<script>
//既然那个Footer是暴露出来的，那么可以直接导入了
import Footer from './Footer.vue'
export default {
  name:'Home',
  //就如我之前说的，自己也是组件，那么data,methods那些也是有的
  data(){
    return{
      users:[
        {id:1,name:"杨枝",age:13},
        {id:2,name:"甘露",age:14}
      ],
    }
  },
  methods:{},
  //把其他组件注册到自己的组件中
  components:{
    Footer,
  },

}
</script>

<style scoped>
h1 {
  font-size: 2em;
  margin: 0.5em;
}
</style>
