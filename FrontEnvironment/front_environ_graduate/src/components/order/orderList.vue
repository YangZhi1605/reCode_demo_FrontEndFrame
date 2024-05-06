<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="wrapper" >
      <div class="container">
        <div class="order-box">
          <loading v-if="loading"></loading>
          <div class="order" v-for="(order, index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                订单用户：{{order.user_name}}
                <span>|</span>
                收货地址：{{order.address.receiverProvince}} {{order.address.receiverCity}} {{order.address.receiverDistrict}} {{order.address.receiverAddress}}
                <span>|</span>
                收货人电话：{{order.address.receiverMobile}}
                <span>|</span>
                订单中的商品：{{order.product.name}}
                <span>|</span>
                商品价格：{{order.product.price}}
                <span>|</span><br>
                商品数量：{{order.product.quantity}}
                <span>|</span>
                总价：{{order.total_cost}}
              </div>
            </div>
          </div>
          <no-data v-if="!loading && list.length==0"></no-data>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json 文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》 ';
import OrderHeader from "../component_repository/OrderHeader.vue";
import Loading from "../component_repository/Loading.vue";
import NoData from "../component_repository/NoData.vue";
import infiniteScroll from "vue-infinite-scroll";
export default {
  name: 'orderList',
  // import 引入的组件需要注入到对象中才能使用
  components: {
    OrderHeader,
    Loading,
    NoData,
  },
  props: {},
  directives: {
    infiniteScroll
  },
  data() {
    return {
      loading: false,
      list: [],
      pageSize: 10,
      pageNum: 1,
      total: 0,
      showNextPage: true, //加载更多：是否显示按钮
      busy: false //滚动加载，是否触发
    };
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      this.loading = true;
      this.busy = true;
    //   向http://127.0.0.1:5000/api/get_order_info发送get请求
      this.$axios.get('http://127.0.0.1:5000/api/get_order_info').then(res => {
        this.list = res.data.data;
        console.log('获取到的订单信息：', res.data.data);
        this.loading = false;
        this.total = res.data.length;
        if (res.data.length < this.pageSize) {
          this.showNextPage = false;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    goPay(orderNo) {
      // 三种路由跳转方式
      // this.$router.push('/order/pay')
      /*this.$router.push({
          name:'order-pay',
          query:{
            orderNo
          }
        })*/
      this.$router.push({
        path: "/order/pay",
        query: {
          orderNo
        }
      });
    },

    // 第一种方法：分页器
    handleChange(pageNum) {
      this.pageNum = pageNum;
      this.getOrderList();
    },
    // 第二种方法：加载更多按钮
    loadMore() {
      this.pageNum++;
      this.getOrderList();
    },
    // 第三种方法：滚动加载，通过npm插件实现
    scrollMore() {
      this.busy = true;
      setTimeout(() => {
        this.pageNum++;
        this.getList();
      }, 500);
    },
    // 专门给scrollMore使用
    getList() {
      // this.loading = true;
      // this.axios
      //   .get("/orders", {
      //     params: {
      //       pageSize: 10,
      //       pageNum: this.pageNum
      //     }
      //   })
      //   .then(res => {
      //     this.list = this.list.concat(res.list);
      //     this.loading = false;
      //     if (res.hasNextPage) {
      //       this.busy = false;
      //     } else {
      //       this.busy = true;
      //     }
      //   });
    }
  },
  // 生命周期 - 创建完成（可以访问当前this 实例）
  created() {
  },
}
</script>

<style lang="scss">
@import "../../assets/scss/config.scss";
@import "../../assets/scss/mixin.scss";
.order-list {
  .wrapper {
    background-color: $colorJ;
    padding-top: 33px;
    padding-bottom: 110px;
    margin-top: 35px;
    .order-box {
      .order {
        height: 200px;
        @include border();
        background-color: $colorG;
        margin-bottom: 31px;
        &:last-child {
          margin-bottom: 0;
        }
        .order-title {
          @include height(74px);
          background-color: $colorK;
          padding: 0 43px;
          font-size: 16px;
          color: $colorC;
          .item-info {
            span {
              margin: 0 9px;
            }
          }
          .money {
            font-size: 26px;
            color: $colorB;
          }
        }
        .order-content {
          padding: 0 43px;
          .good-box {
            width: 88%;
            .good-list {
              display: flex;
              align-items: center;
              height: 145px;
              .good-img {
                width: 112px;
                img {
                  width: 100%;
                }
              }
              .good-name {
                font-size: 20px;
                color: $colorB;
              }
            }
          }
          .good-state {
            @include height(145px);
            font-size: 20px;
            color: $colorA;
            a {
              color: $colorA;
            }
          }
        }
      }
      .pagination {
        text-align: right;
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #ff6600;
      }
      .el-button--primary {
        background-color: #ff6600;
        border-color: #ff6600;
      }
      .load-more,
      .scroll-more {
        text-align: center;
      }
    }
  }
}
</style>
