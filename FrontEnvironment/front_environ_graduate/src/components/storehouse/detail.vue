<!--负责处理点击购买之后的页面-->
<template>
  <div class="detail">
    <product-param :title="product.name"></product-param>
    <div class="wrapper">
      <div class="container clearfix">
        <div class="swiper">
          <swiper :options="swiperOption">
            <swiper-slide>
              <img src="/imgs/detail/phone-1.jpg" alt />
            </swiper-slide>
            <swiper-slide>
              <img src="/imgs/detail/phone-2.jpg" alt />
            </swiper-slide>
            <swiper-slide>
              <img src="/imgs/detail/phone-3.jpg" alt />
            </swiper-slide>
            <swiper-slide>
              <img src="/imgs/detail/phone-4.jpg" alt />
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="content">
          <h2 class="item-title">{{product.name}}</h2>
          <p class="item-info">
            {{product.desc}}
          </p>
          <div class="delivery">自营</div>
          <div class="item-price">
            {{product.price}}
<!--            <span class="del">2999元</span>-->
          </div>
          <div class="line"></div>
          <div class="item-addr">
            <i class="icon-loc"></i>
            <div class="addr">{{ product.productCompany }}</div>
            <div class="stock">有现货</div>
          </div>
<!--          <div class="item-version clearfix">-->
<!--            <h2>选择版本</h2>-->
<!--            <div-->
<!--              class="phone fl"-->
<!--              :class="{'checked':version==1}"-->
<!--              @click="version=1"-->
<!--            >6GB+64GB 全网通</div>-->
<!--            <div class="phone fr " :class="{'checked':version==2}" @click="version=2">4GB+64GB 移动4G</div>-->
<!--          </div>-->
<!--          <div class="item-color">-->
<!--            <h2>选择颜色</h2>-->
<!--            <div class="phone checked">-->
<!--              <span class="color"></span>-->
<!--              深空灰-->
<!--            </div>-->
<!--          </div>-->

          <div class="item-number clearfix">
            <h2>选择数量</h2>
            <div class="number-selector">
              <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
              <input type="text" v-model.number="quantity" />
              <button @click="increaseQuantity">+</button>
            </div>
          </div>

          <div class="item-total">
            <div class="phone-total">总计：{{ totalPrice }}元</div>
          </div>

          <a href="javascript:;" class="btn btn-huge fl" @click="addCart">加入购物车</a>

<!--          <div class="item-total">-->
<!--            <div class="phone-info clearfix">-->
<!--              <div class="fl">{{product.name}} {{version==1?'6GB+64GB 全网通' :'4GB+64GB 移动4G'}} 深空灰</div>-->
<!--              <div class="fr">{{product.price}}元</div>-->
<!--            </div>-->
<!--            <div class="phone-total">总计：{{product.price}}元</div>-->
<!--          </div>-->
<!--          <div class="btn-group">-->
<!--            <a href="javascript:;" class="btn btn-huge fl" @click="addCart">加入购物车</a>-->
<!--          </div>-->

        </div>
      </div>
    </div>
    <div class="price-info">
      <div class="container">
        <h2>价格说明</h2>
        <div class="desc">
          <img src="/imgs/detail/item-price.jpeg" alt />
        </div>
      </div>
    </div>
    <service-bar></service-bar>
  </div>
</template>
<script>
import ServiceBar from "../component_repository/ServiceBar.vue";
import ProductParam from "../component_repository/ProductParam.vue";
export default {
  name: "detail",
  data() {
    return {
      id: this.$route.params.id, //获取商品ID
      version: 1, //商品版本
      quantity: 1, // 添加商品数量，默认为1
      product: {}, //商品信息
      swiperOption: {
        autoplay: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  components: {
    ProductParam,
    ServiceBar
  },
  mounted() {
    this.getProductInfo();
  },
  computed: {
    totalPrice() {
      // 计算选购商品的总价，结果保留两位小数
      return (this.product.price * this.quantity).toFixed(2);
    }
  },
  methods: {
    increaseQuantity() {
      // 增加商品数量
      this.quantity++;
    },
    decreaseQuantity() {
      // 减少商品数量
      if (this.quantity > 1) {
        this.quantity--;
      }
    },

    addCart() {
      // 添加到购物车
      this.$axios.post('http://127.0.0.1:5000/api/add_cart_info', {
        productId: this.id,
        price: this.product.price, // 添加价格字段
        name: this.product.name, // 添加商品名称字段
        quantity: this.quantity, // 添加数量 —— 这个不是商品信息数据表中的字段。是购物车表中的字段，此处写在vue代码中的
        total: this.product.price *  this.quantity, // 添加总价字段
        selected: 0 // 选中状态，默认为0
      }).then(response => {
        // 假设后端返回的response.data含有购物车数量cartTotalQuantity字段
        if (response.data.success) {
          // 添加购物车成功的消息提示
          this.$message({
            message: '添加到购物车成功',
            type: 'success'
          });
          this.$store.dispatch('saveCartCount', response.data.cartTotalQuantity);
          this.$router.push('/cart');
        } else {
          // 添加购物车失败的消息提示
          this.$message({
            message: '添加到购物车失败',
            type: 'error'
          });
        }
      }).catch(error => {
        console.error('加入购物车错误:', error);
        // 添加购物车出现错误的消息提示
        this.$message({
          message: '添加到购物车失败',
          type: 'error'
        });
      });
    },
    //这里是获取商品信息的方法
    getProductInfo() {
      // 获取路由参数中的商品ID
      // const productId = this.$route.params.id;
      let id = this.$route.params.id;
      //传入获得的id,向后端发送get请求
      this.$axios.get('http://127.0.0.1:5000/api/get_info_by_id', {
        params: {
          id: id
        }
      }).then(res => {
        console.log('获取的零件信息数据是',res.data.data);
        this.product = res.data.data;
      }).catch(error => {
        console.log(error);
      })
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/scss/config.scss";
@import "../../assets/scss/mixin.scss";
.detail {
  .wrapper {
    .swiper {
      float: left;
      width: 642px;
      height: 617px;
      margin-top: 5px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content {
      float: right;
      width: 584px;
      height: 870px;
      .item-title {
        font-size: 28px;
        padding-top: 30px;
        padding-bottom: 16px;
        height: 26px;
      }
      .item-info {
        font-size: 14px;
        height: 36px;
      }
      .delivery {
        font-size: 16px;
        color: #ff6700;
        margin-top: 26px;
        margin-bottom: 14px;
        height: 15px;
      }
      .item-price {
        font-size: 20px;
        color: #ff6700;
        height: 19px;
        .del {
          font-size: 16px;
          color: #999999;
          margin-left: 10px;
          text-decoration: line-through;
        }
      }
      .line {
        height: 0;
        margin-top: 25px;
        margin-bottom: 28px;
        border-top: 1px solid #e5e5e5;
      }
      .item-addr {
        height: 108px;
        background-color: #fafafa;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
        padding-top: 31px;
        padding-left: 64px;
        font-size: 14px;
        line-height: 14px;
        position: relative;
        .icon-loc {
          position: absolute;
          top: 27px;
          left: 34px;
          @include bgImg(20px, 20px, "../../assets/imgs/detail/icon-loc.png");
        }
        .addr {
          color: #666666;
        }
        .stock {
          margin-top: 15px;
          color: #ff6700;
        }
      }
      .item-version,
      .item-color {
        margin-top: 30px;
        h2 {
          font-size: 18px;
          margin-bottom: 20px;
        }
      }
      .item-version,
      .item-color {
        .phone {
          width: 287px;
          height: 50px;
          line-height: 50px;
          font-size: 16px;
          color: #333333;
          border: 1px solid #e5e5e5;
          box-sizing: border-box;
          text-align: center;
          cursor: pointer;
          span {
            color: #666666;
            margin-left: 15px;
          }
          .color {
            display: inline-block;
            width: 14px;
            height: 14px;
            background-color: #666666;
          }
          &.checked {
            border: 1px solid #ff6600;
            color: #ff6600;
          }
        }
      }
      .item-total {
        height: 108px;
        background: #fafafa;
        padding: 24px 33px 29px 30px;
        font-size: 14px;
        margin-top: 50px;
        margin-bottom: 30px;
        box-sizing: border-box;
        .phone-total {
          font-size: 24px;
          color: #ff6600;
          margin-top: 18px;
        }
      }
    }
  }
  .price-info {
    background-color: #f3f3f3;
    height: 340px;
    h2 {
      font-size: 24px;
      color: #333333;
      padding-top: 38px;
      margin-bottom: 30px;
    }
  }
}
</style>
