<!--具体的商品页面-->
<template>
  <div class="product">
    <product-param>
      <template v-slot:buy>
        <el-button type="warning" @click="buy">立即购买</el-button>
<!--        <button class="btn" @click="buy">立即购买</button>-->
      </template>
    </product-param>
    <div class="content">
      <div class="item-bg"  :style="{backgroundImage: 'url(' + backgroundImage + ')'}">
        <h2>{{product.name}}</h2>
        <p>
          <span>|</span>
            {{product.desc}}
          <span>|</span>

        </p>
        <div class="price">
          <span>
            ￥
            <em>{{product.price}}</em>
          </span>
        </div>
      </div>

<!--swiper的轮播图-->
      <div class="item-swiper">
        <swiper :options="swiperOption">
          <swiper-slide>
            <img src="/imgs/product/gallery-2.png" alt />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-3.png" alt />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-4.png" alt />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-5.jpg" alt />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-6.jpg" alt />
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>

<!--      页面中展示视频的页面-->
<!--      <div class="item-video">-->
<!--        <h2>-->
<!--          60帧超慢动作摄影-->
<!--          <br />慢慢回味每一瞬间的精彩-->
<!--        </h2>-->
<!--        <p>-->
<!--          后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！-->
<!--          <br />更能AI 精准分析视频内容，15个场景智能匹配背景音效。-->
<!--        </p>-->
<!--        <div class="video-bg" @click="showSlide='slideDown'"></div>-->
<!--        <div class="video-box" v-show="showSlide">-->
<!--          <div class="overlay"></div>-->
<!--          <div class="video" v-bind:class="showSlide">-->
<!--            <span class="icon-close" @click="closeVideo"></span>-->
<!--            <video src="/imgs/product/video.mp4" muted autoplay controls="controls"></video>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import ProductParam from "../component_repository/ProductParam.vue";
export default {
  name: "product",
  components: {
    ProductParam
  },
  data() {
    return {
      showSlide: "", //控制动画效果
      product: {}, //商品信息
      backgroundImage:'',//后端返回的商品图片
      swiperOption: {
        autoplay: true,
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  mounted() {
    //在页面加载时调用获取商品信息的方法
      this.getProductInfo();
  },
  methods: {
    closeVideo() {
      this.showSlide = "slideUp";
      setTimeout(() => {
        this.showSlide = "";
      }, 600);
    },
    //向后端发送get请求，按照指定的id获取商品信息
    getProductInfo() {
      // 获取路由参数中的商品ID
      let id = this.$route.params.id;

      //传入获得的id,向后端发送get请求
      this.$axios.get('http://127.0.0.1:5000/api/get_info_by_id', {
        params: {
          id: id
        }
      }).then(res => {
        console.log('根据id获取的数据是',res.data);
        if(res.data.success) { // 先判断请求是否成功
          this.product = res.data.data; // 正确取值字段为 `data`
          this.backgroundImage = this.product.img; // 获取商品图片
        } else {
          console.log(res.data.message); //请求失败，打印失败信息
        }

        console.log('当前的product是',this.product);
      }).catch(error => {
        console.log(error);
      })
    },

    buy() {
      let id = this.$route.params.id;
      console.log('当前的id是',id);
      this.$router.push(`/detail/${id}`);
    },

  },
};
</script>

<style lang="scss">
@import "../../../src/assets/scss/mixin.scss";
.product {
  .content {
    .item-bg {
      //background: url("../../../src/assets/imgs/product/product-bg-1.png") no-repeat center;
      height: 718px;
      text-align: center;
      background-size: cover;
      background-position: center;
      h2 {
        font-size: 34px;
        padding-top: 55px;
        line-height: 48px;
        color: #555;
      }
      h3 {
        font-size: 24px;
        letter-spacing: 10px;
      }
      p {
        margin-top: 21px;
        margin-bottom: 40px;
        a {
          font-size: 16px;
          color: #333333;
        }
        span {
          margin: 0 15px;
        }
      }
      .price {
        font-size: 30px;
        color: #333333;
        em {
          font-style: normal;
          font-size: 38px;
        }
      }
    }
    .item-bg-2 {
      background: url(../../assets/imgs/product/product-bg-2.png) no-repeat center;
      height: 480px;
      background-size: 1226px 397px;
    }
    .item-bg-3 {
      background: url(../../assets/imgs/product/product-bg-3.png) no-repeat center;
      height: 638px;
      background-size: cover;
    }
    .item-swiper {
      margin: 36px auto 52px;
      .desc {
        font-size: 18px;
        color: #333333;
        text-align: center;
      }
      img {
        width: 100%;
      }
    }
    .item-video {
      height: 1044px;
      background-color: #070708;
      margin-bottom: 76px;
      color: #ffffff;
      text-align: center;
      h2 {
        font-size: 60px;
        padding-top: 82px;
        margin-bottom: 47px;
      }
      p {
        font-size: 24px;
        margin-bottom: 58px;
      }
      .video-bg {
        background: url("../../assets/imgs/product/gallery-1.png") no-repeat center;
        background-size: cover;
        width: 1226px;
        height: 540px;
        margin: 0 auto 120px;
        cursor: pointer;
      }
      .video-box {
        .overlay {
          @include position(fixed);
          background-color: #333333;
          opacity: 0.4;
          z-index: 10;
        }
        @keyframes slideDown {
          from {
            top: -50%;
            opacity: 0;
          }
          to {
            top: 50%;
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            top: 50%;
            opacity: 1;
          }
          to {
            top: -50%;
            opacity: 0;
          }
        }
        .video {
          position: fixed;
          top: -50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          width: 1000px;
          height: 536px;
          opacity: 1;
          &.slideDown {
            animation: slideDown 0.6s linear;
            top: 50%;
          }
          &.slideUp {
            animation: slideUp 0.6s linear;
          }
          .icon-close {
            position: absolute;
            top: 20px;
            right: 20px;
            @include bgImg(20px, 20px, "/imgs/icon-close.png");
            cursor: pointer;
            z-index: 11;
          }
          video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            outline: none;
          }
        }
      }
    }
  }
  button {
    margin-left: 10px;
  }
}
</style>
